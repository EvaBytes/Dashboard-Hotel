import React, { useState, useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch, LuPhone } from "react-icons/lu";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GenericTable } from "../../components/common/GenericTable";
import { TabsContainer, Tab, SearchContainer, SearchInput, SearchIconWrapper, AddButton } from "../../styles/TabsStyles";
import { TableData, EmployeeContainer, EmployeeImage, EmployeeInfo, DescriptionText, ContactText, StatusText, DotsContainer, ActionMenu, ActionMenuItem } from "../../styles/UsersStyles";
import { setActiveTab, setSearchText, setError } from "../../redux/slices/usersSlice";
import { fetchAllUsers, deleteUser } from "../../redux/thunks/usersThunks";
import { parseISO, format, isValid } from "date-fns";
import Swal from "sweetalert2";
import { User } from "../../interfaces/users/UsersState";
import { AppDispatch, RootState } from "../../redux/store";

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const { filteredUsers, activeTab, searchText, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (filteredUsers.length === 0) {
      dispatch(fetchAllUsers());
    }
  }, [dispatch, filteredUsers]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      }).then(() => {
        dispatch(setError(null));
      });
    }
  }, [error, dispatch]);

  const handleTabChange = (tab: string) => {
    dispatch(setActiveTab(tab));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchText(event.target.value));
  };

  const handleDelete = (employeeId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0e4636",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(employeeId)).then(() => {
          Swal.fire("Deleted!", "The user has been deleted.", "success");
        });
      }
    });
  };

  const handleCreateUser = () => {
    navigate("/new-user");
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Contact", key: "contact" },
    { label: "Status", key: "status" },
    { label: "Actions", key: null },
  ];

  const renderRow = (employee: User) => {
    const fecha = employee.startDate ? parseISO(String(employee.startDate)) : null;
    const formattedStartDate = fecha && isValid(fecha)
      ? format(fecha, "dd.MM.yyyy") 
      : "N/A";

    return (
      <>
        <TableData>
          <EmployeeContainer>
            <EmployeeImage src={employee.photo || "default-image.png"} alt={employee.name} />
            <EmployeeInfo>
              <h3>{employee.name}</h3>
              <h5>ID: {employee.employeeId}</h5>
              <p>{employee.email}</p>
              <p>Started: {formattedStartDate}</p>
            </EmployeeInfo>
          </EmployeeContainer>
        </TableData>
        <TableData>
          <DescriptionText>{employee.description}</DescriptionText>
        </TableData>
        <TableData>
          <ContactText>
            <LuPhone size={16} style={{ marginRight: "0.5rem" }} />
            {employee.contact}
          </ContactText>
        </TableData>
        <TableData>
          <StatusText $status={employee.status}>{employee.status}</StatusText>
        </TableData>
        <TableData>
          <DotsContainer>
            <HiOutlineDotsVertical
              size={16}
              color="#6E6E6E"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(menuOpen === employee.employeeId ? null : employee.employeeId);
              }}
              style={{ cursor: "pointer" }}
            />
            {menuOpen === employee.employeeId && (
              <ActionMenu>
                <ActionMenuItem onClick={() => navigate(`/user-details/${employee.employeeId}`)}>
                  <FaPencilAlt style={{ marginRight: "0.5rem" }} /> Details
                </ActionMenuItem>
                <ActionMenuItem onClick={() => handleDelete(employee.employeeId)}>
                  <FaTrashAlt style={{ marginRight: "0.5rem" }} /> Delete
                </ActionMenuItem>
              </ActionMenu>
            )}
          </DotsContainer>
        </TableData>
      </>
    );
  };

  if (loading) return <p>Loading employees...</p>;
  if (!loading && filteredUsers.length === 0) return <p>No employees found.</p>;

  return (
    <div>
      <TabsContainer>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div>
            <Tab $isActive={activeTab === "allEmployees"} onClick={() => handleTabChange("allEmployees")}>
              All Employees
            </Tab>
            <Tab $isActive={activeTab === "activeEmployees"} onClick={() => handleTabChange("activeEmployees")}>
              Active Employees
            </Tab>
            <Tab $isActive={activeTab === "inactiveEmployees"} onClick={() => handleTabChange("inactiveEmployees")}>
              Inactive Employees
            </Tab>
          </div>
          <SearchContainer>
            <SearchIconWrapper>
              <LuUserRoundSearch size={20} color="#6E6E6E" />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="Search by name"
              value={searchText}
              onChange={handleSearchChange}
            />
          </SearchContainer>
        </div>
      </TabsContainer>

      <div style={{ margin: "1rem 0", textAlign: "right" }}>
        <AddButton onClick={handleCreateUser}>+ New User</AddButton>
      </div>

      <GenericTable headers={headers} data={filteredUsers} renderRow={renderRow} itemsPerPage={5} />
    </div>
  );
};
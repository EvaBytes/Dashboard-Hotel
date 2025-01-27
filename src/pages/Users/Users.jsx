import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import employeesData from "../../data/Workers.json";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch, LuPhone } from "react-icons/lu";
import { FaPencilAlt, FaTrashAlt, FaUser} from "react-icons/fa";
import { GenericTable } from "../../components/common/GenericTable.jsx";
import {TabsContainer,Tab,SearchContainer,SearchInput,SearchIconWrapper,ActionButton} from "../../styles/TabsStyles.js";
import {TableData,EmployeeContainer,EmployeeImage,EmployeeInfo,DescriptionText,ContactText,StatusText,DotsContainer,ActionMenu,ActionMenuItem} from "../../styles/UsersStyles.js";
import {setActiveTab,setSearchText,setError} from "../../redux/slices/usersSlice.js";
import { fetchAllUsers,fetchUserById,deleteUser} from "../../redux/thunks/usersThunk.js";
import Swal from "sweetalert2";

export const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(null);

  const {
    filteredUsers: filteredEmployees,
    activeTab,
    searchText,
    loading,
    error,
    currentUser,
  } = useSelector((state) => state.users);

  
  useEffect(() => {
    if (filteredEmployees.length === 0) {
      dispatch(fetchAllUsers(employeesData)); 
      console.log("Data loaded:", filteredEmployees);
    }
  }, [dispatch, filteredEmployees]);

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

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchText(event.target.value));
  };

  const handleEdit = (employee) => {
    navigate(`/edit-user/${employee.employeeId}`, { state: { employeeData: employee } });
  };

  const handleDelete = (employeeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
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

  const handleFetchUserById = (employeeId) => {
    dispatch(fetchUserById(employeeId)).then(() => {
      if (currentUser) {
        navigate(`/user-details/${employeeId}`);
      }
    });
  };

  const headers = [
    { label: "Name", key: null },
    { label: "Description", key: null },
    { label: "Contact", key: null },
    { label: "Status", key: null },
    { label: "Actions", key: null },
  ];

  const renderRow = (employee) => (
    <>
      <TableData>
        <EmployeeContainer>
          <EmployeeImage src={employee.photo} alt={employee.name} />
          <EmployeeInfo>
            <h4>{employee.name}</h4>
            <p>ID: {employee.employeeId}</p>
            <p>{employee.email}</p>
            <p>Started: {employee.startDate}</p>
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
              <button
                onClick={() => {
                  handleEdit(employee);
                  setMenuOpen(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.5rem",
                }}
              >
                <FaPencilAlt style={{ marginRight: "0.5rem" }} /> Edit
              </button>
              <ActionMenuItem onClick={() => handleDelete(employee.employeeId)}>
                <FaTrashAlt style={{ marginRight: "0.5rem" }} /> Delete
              </ActionMenuItem>
              <ActionMenuItem onClick={() => handleFetchUserById(employee.employeeId)}>
                <FaUser style={{ marginRight: "0.5rem" }} /> View Details
              </ActionMenuItem>
            </ActionMenu>
          )}
        </DotsContainer>
      </TableData>
    </>
  );

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <TabsContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>
            <Tab
              $isActive={activeTab === "allEmployees"}
              onClick={() => handleTabChange("allEmployees")}
            >
              All Employees
            </Tab>
            <Tab
              $isActive={activeTab === "activeEmployees"}
              onClick={() => handleTabChange("activeEmployees")}
            >
              Active Employees
            </Tab>
            <Tab
              $isActive={activeTab === "inactiveEmployees"}
              onClick={() => handleTabChange("inactiveEmployees")}
            >
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
        <ActionButton onClick={handleCreateUser}>+ New User</ActionButton>
      </div>

      <GenericTable headers={headers}data={filteredEmployees}renderRow={renderRow}itemsPerPage={5}
      />
    </div>
  );
};
import React, { useState } from "react";
import employeesData from "../data/Workers.json";
import { GenericTable } from "../components/common/GenericTable.jsx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch, LuPhone } from "react-icons/lu";
import {TabsContainer,Tab, SearchContainer, SearchInput,SearchIconWrapper,ActionButton} from "../styles/TabsStyles.js";
import {TableData,EmployeeContainer,EmployeeImage,EmployeeInfo,DescriptionText,ContactText,StatusText,DotsContainer} from "../styles/UsersStyles.js";

export const Users = () => {
  const [activeTab, setActiveTab] = useState("allEmployees");
  const [searchText, setSearchText] = useState("");
  const [isNewEmployeeOpen, setIsNewEmployeeOpen] = useState(false);

  const handleTabChange = (tab) => setActiveTab(tab);
  const handleSearchChange = (event) =>
    setSearchText(event.target.value.toLowerCase());

  const filteredEmployees = employeesData
    .filter((employee) => {
      if (activeTab === "activeEmployees") return employee.status === "Active";
      if (activeTab === "inactiveEmployees")
        return employee.status === "Inactive";
      return true;
    })
    .filter((employee) =>
      employee.name.toLowerCase().includes(searchText)
    );

  const headers = ["Name", "Description", "Contact", "Status"];

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
        <StatusText status={employee.status}>{employee.status}</StatusText>
        <DotsContainer>
          <HiOutlineDotsVertical size={18} color="#6E6E6E" />
        </DotsContainer>
      </TableData>
    </>
  );

  const handleNewEmployee = (newEmployee) => {
    employeesData.push(newEmployee);
    setIsNewEmployeeOpen(false);
  };

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
              isActive={activeTab === "allEmployees"}
              onClick={() => handleTabChange("allEmployees")}
            >
              All Employees
            </Tab>
            <Tab
              isActive={activeTab === "activeEmployees"}
              onClick={() => handleTabChange("activeEmployees")}
            >
              Active Employees
            </Tab>
            <Tab
              isActive={activeTab === "inactiveEmployees"}
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
        <ActionButton onClick={() => setIsNewEmployeeOpen(true)}>
          + New Employee
        </ActionButton>
      </div>

      <GenericTable
        headers={headers}
        data={filteredEmployees}
        renderRow={renderRow}
        itemsPerPage={5}
      />

      {isNewEmployeeOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Add New Employee</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newEmployee = {
                  name: formData.get("name"),
                  employeeId: formData.get("id"),
                  email: formData.get("email"),
                  startDate: formData.get("startDate"),
                  status: formData.get("status"),
                  description: formData.get("description"),
                  contact: formData.get("contact"),
                  photo: "https://via.placeholder.com/150",
                };
                handleNewEmployee(newEmployee);
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>
                  Contact:
                  <input
                    type="text"
                    name="contact"
                    required
                    style={{ width: "100%", padding: "0.5rem" }}
                  />
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <ActionButton
                  type="button"
                  onClick={() => setIsNewEmployeeOpen(false)}
                >
                  Cancel
                </ActionButton>
                <ActionButton type="submit">Submit</ActionButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

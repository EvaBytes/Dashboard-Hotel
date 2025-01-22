import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import employeesData from "../../data/Workers.json";
import { GenericTable } from "../../components/common/GenericTable.jsx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuUserRoundSearch, LuPhone } from "react-icons/lu";
import {TabsContainer, Tab, SearchContainer, SearchInput, SearchIconWrapper, ActionButton} from "../../styles/TabsStyles.js";
import {TableData,EmployeeContainer,EmployeeImage,EmployeeInfo, DescriptionText,ContactText,StatusText, DotsContainer} from "../../styles/UsersStyles.js";

export const Users = () => {
  const [activeTab, setActiveTab] = useState("allEmployees");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); 

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

  const headers = [
    { label: "Name", key: null },
    { label: "Description", key: null },
    { label: "Contact", key: null },
    { label: "Status", key: null },
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
        <DotsContainer>
          <HiOutlineDotsVertical size={18} color="#6E6E6E" />
        </DotsContainer>
      </TableData>
    </>
  );

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
        <ActionButton onClick={() => navigate("/new-user")}>
          + New User
        </ActionButton>
      </div>

      <GenericTable
        headers={headers}
        data={filteredEmployees}
        renderRow={renderRow}
        itemsPerPage={5}
      />
    </div>
  );
};

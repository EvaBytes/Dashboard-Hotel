import React from "react";
import employeesData from "../data/Workers.json"; 
import { GenericTable } from "../components/common/GenericTable.jsx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {TableData,EmployeeContainer,EmployeeImage,EmployeeInfo,StatusText} from "../styles/UsersStyles.js";

export const Users = () => {
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
      <TableData>{employee.description}</TableData>
      <TableData>{employee.contact}</TableData>
      <TableData>
        <StatusText status={employee.status}>{employee.status}</StatusText>
        <HiOutlineDotsVertical
          size={18}
          color="#6E6E6E"
          style={{ cursor: "pointer" }}
        />
      </TableData>
    </>
  );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={employeesData}
        renderRow={renderRow}
        itemsPerPage={5}
      />
    </div>
  );
};

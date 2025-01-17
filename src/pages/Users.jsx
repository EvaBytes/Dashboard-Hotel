import React from "react";
import employeesData from "../data/Workers.json"; 
import { GenericTable } from "../components/common/GenericTable.jsx";
import {TableData,EmployeeContainer,EmployeeImage,EmployeeInfo,StatusText} from "../assets/UsersStyles.js";

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

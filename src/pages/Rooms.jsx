import React from "react";
import roomsData from "../data/Rooms.json"; 
import { GenericTable } from "../components/common/GenericTable.jsx";
import {TableData,GuestContainer,GuestImage,StatusBadge} from "../assets/TableStyles.js";

export const Rooms = () => {
  const headers = [
    "Photo",
    "Room Number",
    "Room ID",
    "Bed Type",
    "Facilities",
    "Rate",
    "Offer Price",
    "Status",
  ];

  const renderRow = (room) => (
    <>
      <TableData>
        <GuestContainer>
          <GuestImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
        </GuestContainer>
      </TableData>
      <TableData>{room.roomNumber}</TableData>
      <TableData>{room.roomId}</TableData>
      <TableData>{room.bedType}</TableData>
      <TableData>{room.facilities}</TableData>
      <TableData>{room.rate}</TableData>
      <TableData>{room.offerPrice}</TableData>
      <TableData>
        <StatusBadge status={room.status}>
          {room.status === "Available" ? "Available" : "Booked"}
        </StatusBadge>
      </TableData>
    </>
  );

  return (
    <div>
      <GenericTable
        headers={headers}
        data={roomsData}
        renderRow={renderRow}
        itemsPerPage={10} 
      />
    </div>
  );
};

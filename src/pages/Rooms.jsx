import React from "react";
import roomsData from "../data/Rooms.json"; 
import { GenericTable } from "../components/common/GenericTable.jsx";
import {TableData,GuestContainer,RoomImage} from "../assets/TableStyles.js";
import {GenericButton} from "../components/common/GenericButton.jsx";

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
          <RoomImage src={room.roomPhoto} alt={`Room ${room.roomNumber}`} />
        </GuestContainer>
      </TableData>
      <TableData>{room.roomNumber}</TableData>
      <TableData>{room.roomId}</TableData>
      <TableData>{room.bedType}</TableData>
      <TableData>{room.facilities}</TableData>
      <TableData>{room.rate}</TableData>
      <TableData>{room.offerPrice}</TableData>
      <TableData>
        <GenericButton variant={room.status.toLowerCase()}>
          {room.status === "Available" ? "Available" : "Booked"}
        </GenericButton>
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
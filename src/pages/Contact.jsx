import React from "react";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {ContactPageContainer,SectionContainer,Title} from "../assets/ContactStyles.js"; 
import {GuestImage,GuestInfo,GuestName,StatusBadge} from "../assets/GuestDetailsStyles.js"; 
import messagesData from "../data/Messages.json";

const Contact = () => {
  const tableData = messagesData.map((message) => ({
    orderId: message.messageId,
    date: message.date,
    customer: message.fullName,
    comment: message.comment,
    status: message.status,
    photo: message.photo,
  }));

  const tableHeaders = ["Photo", "Order ID", "Date", "Customer", "Comment", "Status", "Action"];

  const renderRow = (item) => (
    <tr>
      <td>
        <GuestImage src={item.photo} alt={item.customer} />
      </td>
      <td>{item.orderId}</td>
      <td>{item.date}</td>
      <td>
        <GuestName>{item.customer}</GuestName>
      </td>
      <td>
        <GuestInfo>{item.comment}</GuestInfo>
      </td>
      <td>
        <StatusBadge status={item.status === "read" ? "Check-In" : "Check-Out"}>
          {item.status === "read" ? "Read" : "Unread"}
        </StatusBadge>
      </td>
      <td>
        <button style={{ marginRight: "0.5rem" }}>Publish</button>
        <button>Archive</button>
      </td>
    </tr>
  );

  return (
    <ContactPageContainer>
      <SectionContainer>
        <Title>Latest Messages</Title>
        <LatestMessages messages={messagesData} />
      </SectionContainer>

      <SectionContainer>
        <Title>Customer Reviews</Title>
      </SectionContainer>
    </ContactPageContainer>
  );
};

export { Contact };

import React from "react";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import { GenericTable } from "../components/common/GenericTable.jsx";
import {ContactPageContainer,SectionContainer,Title} from "../assets/ContactStyles.js"; 
import messagesData from "../data/Messages.json"; 

const Contact = () => {
  const tableData = messagesData.map((message) => ({
    orderId: message.messageId,
    date: message.date,
    customer: message.fullName,
    comment: message.comment,
  }));

  const tableHeaders = ["Order ID", "Date", "Customer", "Comment", "Action"];

  const renderRow = (item) => (
    <>
      <td>{item.orderId}</td>
      <td>{item.date}</td>
      <td>{item.customer}</td>
      <td>{item.comment}</td>
      <td>
        <button>Publish</button>
        <button>Archive</button>
      </td>
    </>
  );

  return (
    <ContactPageContainer>
      <SectionContainer>
        <Title>Latest Messages</Title>
        <LatestMessages messages={messagesData} />
      </SectionContainer>
      <SectionContainer>
        <Title>Customer Reviews</Title>
        <GenericTable
          headers={tableHeaders}
          data={tableData}
          renderRow={renderRow}
          itemsPerPage={5}
        />
      </SectionContainer>
    </ContactPageContainer>
  );
};

export {Contact};

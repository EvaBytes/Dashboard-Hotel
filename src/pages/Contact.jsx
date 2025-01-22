import React, { useState } from "react";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import {Table,TableHeader,TableRow,TableData,PaginationContainer,PageButton} from "../styles/TableStyles.js";
import {ContactPageContainer,SectionContainer,Title,TabsContainer,TabButton} from "../styles/ContactStyles.js";
import messagesData from "../data/Messages.json";

const Contact = () => {
  const [activeTab, setActiveTab] = useState("All Contacts");
  const [archivedMessages, setArchivedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState(messagesData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const maxVisiblePages = 3; 

  const handleArchive = (messageId) => {
    const messageToArchive = allMessages.find((msg) => msg.messageId === messageId);
    setAllMessages(allMessages.filter((msg) => msg.messageId !== messageId));
    setArchivedMessages([...archivedMessages, messageToArchive]);
  };

  const handleUnarchive = (messageId) => {
    const messageToUnarchive = archivedMessages.find((msg) => msg.messageId === messageId);
    setArchivedMessages(archivedMessages.filter((msg) => msg.messageId !== messageId));
    setAllMessages([...allMessages, messageToUnarchive]);
  };

  const tableHeaders = [
    { label: "Date", key: "date" },
    { label: "Customer", key: "fullName" },
    { label: "Subject", key: "subject" },
    { label: "Action", key: null },
  ];

  const renderRow = (item, isArchived) => (
    <TableRow key={item.messageId}>
      <TableData>
        <div>{item.date}</div>
        <div>{`#${item.messageId}`}</div>
      </TableData>
      <TableData>
        <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{item.fullName}</div>
        <div style={{ fontSize: "0.9rem"}}>{item.email}</div>
        <div style={{ fontSize: "0.85rem", color: "#888" }}>{item.phone}</div>
      </TableData>
      <TableData>
        <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{item.subject}</div>
        <div style={{ fontSize: "0.9rem", color: "#555" }}>{item.comment}</div>
      </TableData>
      <TableData>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: isArchived ? "#ffefef" : "#eef9f1",
            color: isArchived ? "#d9534f" : "#5cb85c",
            border: `1px solid ${isArchived ? "#d9534f" : "#5cb85c"}`,
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() =>
            isArchived ? handleUnarchive(item.messageId) : handleArchive(item.messageId)
          }
        >
          {isArchived ? "Unarchive" : "Archive"}
        </button>
      </TableData>
    </TableRow>
  );

  const currentData = activeTab === "All Contacts" ? allMessages : archivedMessages;

  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
  const adjustedEndPage = Math.min(totalPages, adjustedStartPage + maxVisiblePages - 1);
  const pageNumbers = Array.from(
    { length: adjustedEndPage - adjustedStartPage + 1 },
    (_, index) => adjustedStartPage + index
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <ContactPageContainer>
      <SectionContainer>
        <Title>Latest Messages</Title>
        <LatestMessages messages={messagesData} />
      </SectionContainer>

      <SectionContainer>
        <Title>Contact Messages</Title>
        <TabsContainer>
          <TabButton
            active={activeTab === "All Contacts"}
            onClick={() => {
              setActiveTab("All Contacts");
              setCurrentPage(1); 
            }}
          >
            All Contacts
          </TabButton>
          <TabButton
            active={activeTab === "Archived"}
            onClick={() => {
              setActiveTab("Archived");
              setCurrentPage(1); 
            }}
          >
            Archived
          </TabButton>
        </TabsContainer>

        <Table>
          <thead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHeader key={index}>{header.label}</TableHeader>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {paginatedData.map((item) =>
              renderRow(item, activeTab === "Archived")
            )}
          </tbody>
        </Table>

        <PaginationContainer>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </PageButton>
          {pageNumbers.map((page) => (
            <PageButton
              key={page}
              $active={currentPage === page}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </PaginationContainer>
      </SectionContainer>
    </ContactPageContainer>
  );
};

export { Contact };
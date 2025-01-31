import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { archiveMessage, unarchiveMessage, setActiveTab, setCurrentPage } from "../redux/slices/contactSlice.js";
import { fetchMessages } from "../redux/thunks/contactThunks.js";
import { LatestMessages } from "../components/common/LatestMessages.jsx";
import { Table, TableHeader, TableRow, TableData, PaginationContainer, PageButton } from "../styles/TableStyles.js";
import { ContactPageContainer, TabsContainer, TabButton, CustomerName, CustomerEmail, CustomerPhone, Subject, Comment, ArchiveButton } from "../styles/ContactStyles.js";

const Contact = () => {
  const dispatch = useDispatch();
  const { allMessages, archivedMessages, activeTab, currentPage, itemsPerPage, loading, error } = useSelector(
    (state) => state.contact
  );

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const uniqueAllMessages = allMessages.map((message, index) => ({
    ...message,
    messageId: `${message.messageId || "msg"}-${index}`,
  }));

  const tableHeaders = [
    { label: "Date", key: "date" },
    { label: "Customer", key: "fullName" },
    { label: "Subject", key: "subject" },
    { label: "Action", key: null },
  ];

  const handleArchive = (messageId) => {
    dispatch(archiveMessage(messageId));
  };

  const handleUnarchive = (messageId) => {
    dispatch(unarchiveMessage(messageId));
  };

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const currentData = activeTab === "All Contacts" ? allMessages : archivedMessages;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = currentData.slice(startIndex, endIndex);

  const maxVisiblePages = 3;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);
  const adjustedEndPage = Math.min(totalPages, adjustedStartPage + maxVisiblePages - 1);
  const pageNumbers = Array.from(
    { length: adjustedEndPage - adjustedStartPage + 1 },
    (_, index) => adjustedStartPage + index
  );


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ContactPageContainer>
      {uniqueAllMessages.length > 0 ? (
        <div style={{ marginBottom: "20px" }}>
          <LatestMessages mode="slides" messages={uniqueAllMessages} hideContainer />
        </div>
      ) : (
        <div>No messages to display</div>
      )}

      <div>
        <TabsContainer>
          <TabButton $active={activeTab === "All Contacts"} onClick={() => handleTabChange("All Contacts")}>
            All Contacts
          </TabButton>
          <TabButton $active={activeTab === "Archived"} onClick={() => handleTabChange("Archived")}>
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
            {paginatedData.map((item) => (
              <TableRow key={item.messageId}>
                <TableData>
                  <div>{item.date}</div>
                  <div>{`#${item.messageId}`}</div>
                </TableData>
                <TableData>
                  <CustomerName>{item.fullName}</CustomerName>
                  <CustomerEmail>{item.email}</CustomerEmail>
                  <CustomerPhone>{item.phone}</CustomerPhone>
                </TableData>
                <TableData>
                  <Subject>{item.subject}</Subject>
                  <Comment>{item.comment}</Comment>
                </TableData>
                <TableData>
                  <ArchiveButton
                    $isArchived={activeTab === "Archived"}
                    onClick={() =>
                      activeTab === "Archived" ? handleUnarchive(item.messageId) : handleArchive(item.messageId)
                    }
                  >
                    {activeTab === "Archived" ? "Unarchive" : "Archive"}
                  </ArchiveButton>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>

        <PaginationContainer>
          <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Prev
          </PageButton>
          {pageNumbers.map((page) => (
            <PageButton key={page} $active={currentPage === page} onClick={() => handlePageChange(page)}>
              {page}
            </PageButton>
          ))}
          <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </PageButton>
        </PaginationContainer>
      </div>
    </ContactPageContainer>
  );
};

export { Contact };

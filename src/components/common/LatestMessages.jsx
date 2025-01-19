import React, { useState } from "react";
import { Overlay, Popup, CloseButton } from "../../styles/PopupStyles.js";
import { LatestMessagesContainer, MessageCard, NavigationButton } from "../../styles/LatestMessagesStyles.js";
import { GiCancel } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";

const LatestMessages = ({ messages }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 0 ? totalPages - 1 : prevPage - 1));
  };

  const paginatedMessages = messages.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const openPopup = (message) => {
    setSelectedMessage(message);
  };

  const closePopup = () => {
    setSelectedMessage(null);
  };

  return (
    <>
      <LatestMessagesContainer>
        <NavigationButton onClick={prevPage}>&lt;</NavigationButton>
        {paginatedMessages.map((message, index) => (
          <MessageCard key={index} onClick={() => openPopup(message)}>
            <h4>{message.subject}</h4>
            <p className="message-content">{message.comment}</p>
            <p>Email: {message.email}</p>
            <p>Phone: {message.phone}</p>
            <div className="message-footer">
              <img src={message.photo || "/placeholder-image.jpg"} alt={message.fullName} />
              <span>{message.fullName}</span>
            </div>
            <div className="status-icons">
                {message.status === "unread" ? (
                  <GiCancel className="unread" />
                ) : (
                  <FaRegCheckCircle className="read" />
                )}
            </div>

          </MessageCard>
        ))}
        <NavigationButton onClick={nextPage}>&gt;</NavigationButton>
      </LatestMessagesContainer>
  
      {selectedMessage && (
        <Overlay>
          <Popup>
            <h3>{selectedMessage.subject}</h3>
            <p>{selectedMessage.comment}</p>
            <p>Email: {selectedMessage.email}</p>
            <p>Phone: {selectedMessage.phone}</p>
            <CloseButton onClick={closePopup}>Cerrar</CloseButton>
          </Popup>
        </Overlay>
      )}
    </>
  );
  
};

export { LatestMessages };

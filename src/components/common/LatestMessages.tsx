import React, { useState } from "react";
import { Overlay, Popup, CloseButton } from "../../styles/PopupStyles.ts";
import { LatestMessagesContainer, MessageCard, NavigationButton, NavigationPlaceholder, MessageDetail } from "../../styles/LatestMessagesStyles.ts";
import { GiCancel } from "react-icons/gi";
import { FaRegCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

const LatestMessages = ({ messages, mode = "pagination", hideContainer = false }) => {
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

  const openPopup = (message) => {
    setSelectedMessage(message);
  };

  const closePopup = () => {
    setSelectedMessage(null);
  };

  const paginatedMessages = messages.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      {!hideContainer && mode === "pagination" && (
        <LatestMessagesContainer>
          {currentPage > 0 ? <NavigationButton onClick={prevPage}>&lt;</NavigationButton> : <NavigationPlaceholder />}
          {paginatedMessages.map((message, index) => (
            <MessageCard key={message.messageId || index} onClick={() => openPopup(message)}>
              <h4>{message.subject}</h4>
              <h5>{message.comment}</h5>
              <MessageDetail>Email: {message.email}</MessageDetail>
              <MessageDetail>Phone: {message.phone}</MessageDetail>
              <div className="message-footer">
                <img src={message.photo || "/placeholder-image.jpg"} alt={message.fullName} />
                <span>{message.fullName}</span>
              </div>
              <div className="status-icons">
                {message.status === "unread" ? <GiCancel className="unread" /> : <FaRegCheckCircle className="read" />}
              </div>
            </MessageCard>
          ))}
          {currentPage < totalPages - 1 && <NavigationButton onClick={nextPage}>&gt;</NavigationButton>}
        </LatestMessagesContainer>
      )}

      {mode === "slides" && (
        <Swiper modules={[Navigation]} navigation={!hideContainer} spaceBetween={20} slidesPerView={4} loop={true}>
          {messages.map((message) => (
            <SwiperSlide key={message.messageId}>
              <MessageCard onClick={() => openPopup(message)}>
                <h4>{message.subject}</h4>
                <h5>{message.comment}</h5>
                <MessageDetail>Email: {message.email}</MessageDetail>
                <MessageDetail>Phone: {message.phone}</MessageDetail>
                <div className="message-footer">
                  <img src={message.photo || "/placeholder-image.jpg"} alt={message.fullName} />
                  <span>{message.fullName}</span>
                </div>
                <div className="status-icons">
                  {message.status === "unread" ? <GiCancel className="unread" /> : <FaRegCheckCircle className="read" />}
                </div>
              </MessageCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {mode === "scroll" && (
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode={true}
          mousewheel={true}
          spaceBetween={20}
          slidesPerView="auto"
          loop={true}
          style={{ paddingBottom: "10px" }}
        >
          {messages.map((message) => (
            <SwiperSlide key={message.messageId} style={{ width: "300px" }}>
              <MessageCard onClick={() => openPopup(message)}>
                <h4>{message.subject}</h4>
                <h5>{message.comment}</h5>
                <MessageDetail>Email: {message.email}</MessageDetail>
                <MessageDetail>Phone: {message.phone}</MessageDetail>
                <div className="message-footer">
                  <img src={message.photo || "/placeholder-image.jpg"} alt={message.fullName} />
                  <span>{message.fullName}</span>
                </div>
                <div className="status-icons">
                  {message.status === "unread" ? <GiCancel className="unread" /> : <FaRegCheckCircle className="read" />}
                </div>
              </MessageCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {selectedMessage && (
        <Overlay>
          <Popup>
            <h3>{selectedMessage.subject}</h3>
            <h4>{selectedMessage.comment}</h4>
            <MessageDetail>Email: {selectedMessage.email}</MessageDetail>
            <MessageDetail>Phone: {selectedMessage.phone}</MessageDetail>
            <CloseButton onClick={closePopup}>Cerrar</CloseButton>
          </Popup>
        </Overlay>
      )}
    </>
  );
};

export { LatestMessages };

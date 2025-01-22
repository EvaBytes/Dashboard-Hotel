import styled from "styled-components";

export const ContactPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.4rem;
  margin-top: 3rem;
`;

export const SectionContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #135846;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

export const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: ${(props) => (props.active ? "#135846" : "#777")};
  border-bottom: ${(props) => (props.active ? "2px solid #135846" : "none")};
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    color: #135846;
  }
`;

export const ActionButton = styled.button`
  padding: 0.3rem 0.6rem;
  background-color: ${(props) => (props.isArchived ? "#ffefef" : "#eef9f1")};
  color: ${(props) => (props.isArchived ? "#d9534f" : "#5cb85c")};
  border: 1px solid ${(props) => (props.isArchived ? "#d9534f" : "#5cb85c")};
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.isArchived ? "#f8d7da" : "#d4edda")};
  }
`;

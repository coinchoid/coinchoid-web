import React from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";

export const Dialog = Modal.styled`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  min-width: 70%;
`;

export const DialogTitle = styled.div`
  background-color: rgb(205, 220, 57);
  padding: 10px;
`;

import React from "react";
import Modal from "styled-react-modal";
import styled from "styled-components";

export const InfoModal = ({ isOpen, onClose, score }) => {
  const help = getHelp(score);
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      <Title>Pour faire chuter</Title>
      <Text>Sans Atout: {help.chuSansAtout}</Text>
      <Text>Tout Atout: {help.chuToutAtout}</Text>
      <Title>Pour gagner</Title>
      <Text>Sans Atout: {help.reussiSansAtout}</Text>
      <Text>Tout Atout: {help.reussiToutAtout}</Text>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  min-width: 70%;
`;

const Title = styled.div`
  background-color: rgb(205, 220, 57);
  padding: 10px;
`;

const Text = styled.div`
  margin: 8px;
  font-size: 16px;
`;

const getHelp = score => {
  if (score > 160) {
    return {
      chuSansAtout: 0,
      chuToutAtout: 0,
      reussiSansAtout: 0,
      reussiToutAtout: 0
    };
  }

  return {
    chuSansAtout: Math.ceil(((162 - score) * 130) / 162),
    chuToutAtout: Math.ceil(((162 - score) * 258) / 162),
    reussiSansAtout: Math.ceil((score * 130) / 162),
    reussiToutAtout: Math.ceil((score * 258) / 162)
  };
};

import React from "react";
import styled from "styled-components";
import { DialogTitle, Dialog } from "../Dialog";

export const InfoModal = ({ isOpen, onClose, score }) => {
  const help = getHelp(score);
  return (
    <Dialog
      isOpen={isOpen}
      onBackgroundClick={onClose}
      onEscapeKeydown={onClose}
    >
      <DialogTitle>Pour faire chuter</DialogTitle>
      <Text>Sans Atout: {help.chuSansAtout}</Text>
      <Text>Tout Atout: {help.chuToutAtout}</Text>
      <DialogTitle>Pour gagner</DialogTitle>
      <Text>Sans Atout: {help.reussiSansAtout}</Text>
      <Text>Tout Atout: {help.reussiToutAtout}</Text>
    </Dialog>
  );
};

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

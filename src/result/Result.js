import React from "react";
import styled from "styled-components";

export const Result = ({ onItemClick }) => {
  return (
    <Wrapper>
      <LooseItem onClick={() => onItemClick("THEM")}>On la perd !</LooseItem>
      <WinItem onClick={() => onItemClick("US")}>On la fait !</WinItem>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  height: 80px;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 16px;
  font-weight: bold;
`;

const LooseItem = styled(Item)`
  background-color: #b0bec5;
`;

const WinItem = styled(Item)`
  background-color: rgb(205, 220, 57);
`;

import React from "react";
import styled from "styled-components";

export const TeamScore = ({ team, score }) => {
  return (
    <Wrapper>
      <Team>{team}</Team>
      <Score>{score}</Score>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Team = styled.div`
  font-size: 16px;
`;

const Score = styled.div`
  font-size: 45px;
`;

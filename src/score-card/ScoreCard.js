import React from "react";
import styled from "styled-components";
import { TeamScore } from "./TeamScore";

export const ScoreCard = ({ theirScore, ourScore }) => {
  return (
    <Card>
      <TeamScore team="Nous" score={ourScore} />
      <TeamScore team="Eux" score={theirScore} />
    </Card>
  );
};

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  padding: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

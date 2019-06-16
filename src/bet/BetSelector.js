import React from "react";
import styled from "styled-components";

const bets = [
  {
    label: 80,
    value: 80
  },
  {
    label: 90,
    value: 90
  },
  {
    label: 100,
    value: 100
  },
  {
    label: 110,
    value: 110
  },
  {
    label: 120,
    value: 120
  },
  {
    label: 130,
    value: 130
  },
  {
    label: 140,
    value: 140
  },
  {
    label: 150,
    value: 150
  },
  {
    label: 160,
    value: 160
  },
  {
    label: 170,
    value: 170
  },
  {
    label: 180,
    value: 180
  },
  {
    label: "Capot",
    value: 250
  }
];
export const BetSelector = ({ selectedScore, onItemClick }) => {
  return (
    <Wrapper>
      {bets.map(({ label, value }) => (
        <Item
          key={value}
          onClick={() => onItemClick(value)}
          selected={selectedScore === value}
        >
          {label}
        </Item>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const Item = styled.div`
  flex-grow: 0;
  flex-basis: 1;
  width: calc(25% - 2px);
  height: 50px;
  background-color: ${props =>
    props.selected ? "rgb(205, 220, 57)" : "#b0bec5"};
  margin: 1px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

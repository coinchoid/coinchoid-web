import React from "react";
import styled, { css } from "styled-components";

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
export const BetSelector = ({
  selectedScore,
  onItemClick,
  onItemTouchStart,
  onItemTouchEnd,
  multiplicationFactor,
  setMultiplicationFactor
}) => {
  return (
    <Wrapper>
      {bets.map(({ label, value }) => (
        <Item
          key={value}
          onClick={() => {
            if (selectedScore === value && multiplicationFactor === 1) {
              return setMultiplicationFactor(2);
            }
            if (selectedScore === value && multiplicationFactor === 2) {
              return setMultiplicationFactor(4);
            }
            onItemClick(value);
            setMultiplicationFactor(1);
          }}
          selected={selectedScore === value}
          onTouchStart={() => onItemTouchStart(value)}
          onTouchEnd={onItemTouchEnd}
        >
          {label}
          {selectedScore === value && (
            <CoinchedStatus multiplicationFactor={multiplicationFactor} />
          )}
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
  flex-grow: 1;
`;

const Item = styled.div`
  flex-grow: 0;
  flex-basis: 1;
  width: calc(25% - 2px);
  min-height: 50px;
  background-color: ${props =>
    props.selected ? "rgb(205, 220, 57)" : "#b0bec5"};
  margin: 1px;
  cursor: pointer;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
`;

const CoinchedStatus = ({ multiplicationFactor }) => {
  return (
    <CoinchedStatusWrapper>
      <Clac highlight={multiplicationFactor >= 2}>
        <span role="img" aria-label="coinched">
          🤛
        </span>
      </Clac>
      <Clac highlight={multiplicationFactor === 4}>
        <span role="img" aria-label="coinched">
          🤛
        </span>
      </Clac>
    </CoinchedStatusWrapper>
  );
};

const outlinedCss = css`
  color: transparent;
  text-shadow: 0 0 0 grey;
  position: relative;
`;

const Clac = styled.span`
  ${props => !props.highlight && outlinedCss}
`;

const CoinchedStatusWrapper = styled.div`
  position: absolute;
  right: 0%;
  bottom: 0%;
  font-size: 12px;
`;

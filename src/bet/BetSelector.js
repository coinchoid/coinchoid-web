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
export const BetSelector = ({
  selectedScore,
  onItemClick,
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
      <CoinchIcon color={multiplicationFactor >= 2 ? "#ff5722" : "grey"} />
      <CoinchIcon color={multiplicationFactor === 4 ? "#ff5722" : "grey"} />
    </CoinchedStatusWrapper>
  );
};

const CoinchIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={10}
    height={10}
    style={{ padding: 1 }}
  >
    <path
      fill={color}
      d="M464.8 80c-26.9-.4-48.8 21.2-48.8 48h-8V96.8c0-26.3-20.9-48.3-47.2-48.8-26.9-.4-48.8 21.2-48.8 48v32h-8V80.8c0-26.3-20.9-48.3-47.2-48.8-26.9-.4-48.8 21.2-48.8 48v48h-8V96.8c0-26.3-20.9-48.3-47.2-48.8-26.9-.4-48.8 21.2-48.8 48v136l-8-7.1v-48.1c0-26.3-20.9-48.3-47.2-48.8C21.9 127.6 0 149.2 0 176v66.4c0 27.4 11.7 53.5 32.2 71.8l111.7 99.3c10.2 9.1 16.1 22.2 16.1 35.9v6.7c0 13.3 10.7 24 24 24h240c13.3 0 24-10.7 24-24v-2.9c0-12.8 2.6-25.5 7.5-37.3l49-116.3c5-11.8 7.5-24.5 7.5-37.3V128.8c0-26.3-20.9-48.4-47.2-48.8z"
    />
  </svg>
);

const CoinchedStatusWrapper = styled.div`
  position: absolute;
  right: 0%;
  bottom: 0%;
  font-size: 12px;
`;

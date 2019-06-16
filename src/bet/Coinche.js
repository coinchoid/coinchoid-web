import React from "react";
import styled from "styled-components";

export const Coinche = ({ value, onItemClick }) => {
  return (
    <Wrapper>
      <Item
        selected={value === 2}
        onClick={() => onItemClick(value === 2 ? 1 : 2)}
      >
        <span role="img" aria-label="">
          ✊
        </span>
        Coinché !
      </Item>
      <Item
        selected={value === 4}
        onClick={() => onItemClick(value === 4 ? 1 : 4)}
      >
        <span role="img" aria-label="">
          ✊✊
        </span>{" "}
        Surcoinché !!
      </Item>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
`;

const Item = styled.div`
  min-width: 40%;
  height: 80px;
  background-color: ${props =>
    props.selected ? "rgb(205, 220, 57)" : "#b0bec5"};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
`;

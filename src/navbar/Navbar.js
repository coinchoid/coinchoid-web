import React from "react";
import styled from "styled-components";

export const Navbar = ({ reset, showInfo }) => {
  return (
    <Wrapper>
      <Title>Coinchoid</Title>
      <Actions>
        <IconWrapper onClick={showInfo}>
          <Info />
        </IconWrapper>
        <IconWrapper onClick={reset}>
          <Reset />
        </IconWrapper>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 56px;
  background-color: rgb(205, 220, 57);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
`;

const Actions = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: normal;
  margin: 0;
`;

const IconWrapper = styled.div`
  padding: 8px;
  cursor: pointer;
`;

const Reset = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={20}
      height={20}
    >
      <path
        fill="#000"
        d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
      />
    </svg>
  );
};

const Info = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={20}
      height={20}
    >
      <path
        fill="#000"
        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
      />
    </svg>
  );
};

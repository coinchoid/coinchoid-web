import React from "react";
import styled from "styled-components";

const GrowingBorder = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left top;
  border-bottom: 2px solid rgb(246, 114, 88);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
`;

const FocusBorder = styled(GrowingBorder)`
  border-bottom-color: rgb(205, 220, 57);
  z-index: 1;
`;

const StyledInput = styled.input`
  margin: 0;
  border: 0;
  padding: 0;
  display: block;
  text-align: left;
  font-size: 18px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: none;

  outline: none;
  color: rgb(51, 69, 91);
  border-bottom: 1px solid rgb(224, 224, 224);

  &:focus ~ ${FocusBorder} {
    transform: scaleX(1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  margin: 5px 10px;
`;

export const Input = props => {
  return (
    <Wrapper>
      <StyledInput {...props} />
      <FocusBorder />
    </Wrapper>
  );
};

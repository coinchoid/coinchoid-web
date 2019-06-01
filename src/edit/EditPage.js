import React from "react";
import styled from "styled-components";
import { Input } from "./Input";

export const EditPage = ({ scores, back, setScores }) => {
  return (
    <>
      <Wrapper>
        {scores.map((score, index) => (
          <Row key={index}>
            <Input
              value={score.THEM}
              type="number"
              onChange={event =>
                setScores(
                  scores.map((_score, _index) => {
                    if (_index !== index) {
                      return _score;
                    }

                    return {
                      ..._score,
                      THEM: Number(event.target.value)
                    };
                  })
                )
              }
            />
            <Input
              value={score.US}
              type="number"
              onChange={event =>
                setScores(
                  scores.map((_score, _index) => {
                    if (_index !== index) {
                      return _score;
                    }

                    return {
                      ..._score,
                      US: Number(event.target.value)
                    };
                  })
                )
              }
            />
          </Row>
        ))}
      </Wrapper>
      <BackButton onClick={back}>
        <ArrowLeft />
      </BackButton>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Row = styled.div`
  display: flex;
  padding: 8px;
`;

const BackButton = styled.div`
  height: 100px;
  width: 100%;
  background-color: #b0bec5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width={50}
      height={50}
    >
      <path
        fill="#000"
        d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
      />
    </svg>
  );
};

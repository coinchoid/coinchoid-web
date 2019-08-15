import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import styled, { createGlobalStyle } from "styled-components";
import { Navbar } from "./navbar/Navbar";
import { ScoreCard } from "./score-card/ScoreCard";
import { BetSelector } from "./bet/BetSelector";
import { Result } from "./result/Result";
import { useLocalStorageState } from "./useLocalStorageState";
import { EditPage } from "./edit/EditPage";
import { InfoModal } from "./edit/InfoModal";

function App() {
  const [selectedScore, setSelectedScore] = useState(80);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [scores, setScores] = useLocalStorageState(
    "scores",
    [],
    JSON.parse,
    JSON.stringify
  );

  return (
    <ModalProvider>
      <Wrapper>
        <BodyStyle />
        <Navbar
          reset={() => setScores([])}
          showInfo={() => setShowInfo(true)}
        />
        {showEdit ? (
          <EditPage
            scores={scores}
            back={() => setShowEdit(false)}
            setScores={setScores}
          />
        ) : (
          <Content>
            <ScoreCard
              onClick={() => setShowEdit(true)}
              theirScore={computeScore(scores, "THEM")}
              ourScore={computeScore(scores, "US")}
            />
            <BetSelector
              selectedScore={selectedScore}
              onItemClick={value => setSelectedScore(value)}
              multiplicationFactor={multiplicationFactor}
              setMultiplicationFactor={setMultiplicationFactor}
            />
            <Result
              onItemClick={winnerTeam => {
                const score = selectedScore * multiplicationFactor;

                setScores([
                  ...scores,
                  {
                    THEM: winnerTeam === "THEM" ? score : 0,
                    US: winnerTeam === "US" ? score : 0
                  }
                ]);
                setSelectedScore(80);
                setMultiplicationFactor(1);
              }}
            />
          </Content>
        )}
      </Wrapper>
      <InfoModal
        score={selectedScore}
        onClose={() => setShowInfo(false)}
        isOpen={showInfo}
      />
    </ModalProvider>
  );
}

const computeScore = (scores, team) => {
  return scores.reduce((teamScore, score) => {
    return teamScore + score[team];
  }, 0);
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  width: 100%;
`;

const BodyStyle = createGlobalStyle`
 body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  background-color: #FAFAFA;
 }
 #root {
   height: 100%;
 }
 * {
  user-select: none;
 }
`;

export default App;

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
import { useLongPress } from "./useLongPress";

function App() {
  const [selectedScore, setSelectedScore] = useState(80);
  const [infoScore, setInfoScore] = useState(80);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [scores, setScores] = useLocalStorageState(
    "scores",
    [],
    JSON.parse,
    JSON.stringify
  );
  const [playerOffset, setPlayerOffset] = useState(0);
  const itemLongClick = useLongPress(itemScore => {
    setInfoScore(itemScore);
    setShowInfo(true);
  });

  return (
    <ModalProvider>
      <Wrapper>
        <BodyStyle />
        <Navbar
          reset={() => setScores([])}
          showInfo={() => setShowInfo(true)}
          playerOffset={playerOffset}
          incrementPlayerOffset={() => setPlayerOffset(playerOffset + 1)}
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
              onItemClick={value => {
                setInfoScore(value);
                setSelectedScore(value);
              }}
              onItemTouchStart={itemLongClick.onTouchStart}
              onItemTouchEnd={itemLongClick.onTouchEnd}
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
                setPlayerOffset(playerOffset + 1);
              }}
            />
          </Content>
        )}
      </Wrapper>
      <InfoModal
        score={infoScore}
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

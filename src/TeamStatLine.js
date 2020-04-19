import React, { useEffect } from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  flex: 1;
  
`;

const InningWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
`;



const TeamName = styled.div`
  flex: 0 0 155px;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
  min-width 200px;
  
`;

const Name = styled.h1`
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  horizontal-align: center;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
  font-width: 5px;
`;

const BoxScoreValue = styled.h1`
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
`;

const InningBox = styled.div`
  flex: 1;
  background: linear-gradient(#292929, #111);
  border: 1px solid #555;
`;

function makeBoxScoreRow() {
  var i;
  var inning = [];
  for (i = 0; i < 7; i++) {
    inning[i] = i + 1;
    
  }
  return (inning);
}

export default function TeamStatLine({teamName, boxValues}) {
    var inningStats;
    inningStats = makeBoxScoreRow();
    return (
    <Wrapper>
        <TeamName> 
            <Name>{teamName}</Name>
        </TeamName>
        
        {boxValues.map((i) => (
            <InningBox> <BoxScoreValue>{i}</BoxScoreValue> </InningBox>
        ))}
        
    </Wrapper>
    );
}
import React, { useReducer, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { API, graphqlOperation } from 'aws-amplify';
import { createBoxScore as CreateBoxScore, updateBoxScore as UpdateBoxScore, } from './graphql/mutations';
import { onUpdateByID } from './graphql/subscriptions'

import TeamStatLine from './TeamStatLine';
import ScoreButton from './ScoreButton';
import BoxScoreContext from './BoxScoreContext';

import uuid from 'uuid/v4';

const clientId = uuid();

const Wrapper = styled.div`
  border: 9px solid #ff32ff;
  min-width: 380px;
  height: 50vh;
`;

const Container = styled.div`
  min-width: 380px;
  
  margin: auto;
  background: linear-gradient(to bottom right, #222, #0a0a0a);
  border: 2px solid black;
  
  display: flex;
  
  flex-direction: column;
`;

const BoxScoreWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid #555;
  margin: 0px 20px 20px;
  
  
`;

const ButtonContainer = styled.div`
  flex: 1;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
  padding: 0px 20px 10px;
  display: flex;
`;
const IndicatorWrapper = styled.div`
  position: absolute;
  width: 300px;
  top: 0px;
  right: 0px;
  height: 100%;
  padding: 4px 2px;
  pointer-events: none;
`;

const Text = styled.h2`
  color: white;
  font-size: 14px;
  margin-left: 20px;
  line-height: 100%;
  margin: 0;
  vertical-align: middle;
  padding: 0px 10px;
  line-height: 50px;
`;

const BoxScoreHeaders = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'R'];
const teamBoxScores = {
  Away_Team: ['-', '-', '-', '-', '-', '-', '-', '-', '-', 0,],
  Home_Team: ['-', '-', '-', '-', '-', '-', '-', '-', '-', 0,], 
};

const boxScoreValues = {Inning: 1, InningHalf:'Top',
Away_Team: ['-', '-', '-', '-', '-', '-', '-', '-', '-', 0,],
  Home_Team: ['-', '-', '-', '-', '-', '-', '-', '-', '-', 0,], 
};

async function updateBoxScore(boxEntries, machineId) {
    const boxScores = { 
      id: machineId, clientId,  boxScore: JSON.stringify(boxEntries), name:machineId
    }
    try {
      await API.graphql(graphqlOperation(UpdateBoxScore, {input: boxScores }))
    } catch (err) {
      console.log('error updating drum machine...:', err)
    }
    return () => {}
  }
 async function createBoxScore(boxScoreVal, setBoxScore) {
  console.log('some info: '+ boxScoreVal.id + '\t' + boxScoreVal.clientId + '\t' + boxScoreVal.boxScore);
  try {
    console.log('trying to createMachine')
    //await API.graphql(graphqlOperation(CreateBoxScore, { input: boxScore }))
    await API.graphql(graphqlOperation(CreateBoxScore, { input:{ id: 1001, clientId: 1001, boxScore: boxScoreVal.boxScore, name: "test" }}))
    console.log('successfully created drum machine!')
  } catch (err) {
    console.log('error creating drum machine...: ', err)
    const { errors } = err
    console.log('errors' + errors[0].data)
    const boxScore = errors[0].data.boxScoreVal
    setBoxScore(JSON.parse(boxScore))
  }
} 
function reducer(state, action) {
  return action
}

export default function BoxScore({ gameName, machineIdin }) {
    console.log(machineIdin +"\t" + gameName);
    const name = gameName;
    const machineId = machineIdin;
    const [boxScoreState, setBoxScore] = useReducer( reducer, boxScoreValues);
    const [currentBoxScore, setCurrentBoxScoreState] = useState(0);
    
    
    
    useEffect(() => {
        const boxScore = {
            id: machineId,
            clientId: machineId,
            boxScore: JSON.stringify(boxScoreState),
            name: name
        }
        createBoxScore(boxScore, setBoxScore)
    }, [])
    useEffect(() => {
        console.log('machineId: ', machineId)
        const subscriber = API.graphql(graphqlOperation(onUpdateByID, { id: machineId })).subscribe({
            next: data => {
            console.log('data:', data)
            const { value: { data: { onUpdateByID: { clientId: ClientId, boxScore }}}} = data
            if (ClientId === clientId) return
            setBoxScore(JSON.parse(boxScore))
            }
        });
        return () => subscriber.unsubscribe()
    
    }, [])
    
    return(
        <Wrapper>
            <BoxScoreContext.Provider value={{ state: boxScoreState, setBoxScore, updateBoxScore, machineId }} >
            <Container>
                      
                <React.Suspense fallback={<p>loading</p>}>
                    <BoxScoreWrapper>
                      <TeamStatLine teamName='' boxValues={BoxScoreHeaders} /> {/* header row */}
                      <TeamStatLine teamName='Away Team' boxValues={teamBoxScores['Away_Team']} />
                      <TeamStatLine teamName='Home Team' boxValues={teamBoxScores['Home_Team']}/>
                      
                    </BoxScoreWrapper>
                        
                    <ButtonContainer>
                        
                     <ScoreButton btnName='Home' />
                     <ScoreButton btnName='Away' />
                     <ScoreButton btnName='New Inning' />
                         
                    </ButtonContainer>
                </React.Suspense>
            </Container>
            </BoxScoreContext.Provider>
        </Wrapper>
    );
}
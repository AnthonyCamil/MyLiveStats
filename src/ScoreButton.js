import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import BoxScoreContext from './BoxScoreContext';


const Button = styled.button`
  background: ${props => (props.held ? '#fd7272' : 'none')};
  flex: 1;
  border: 2px solid #fd7272;
  color: white;
  display: inline-block;
  font-size: 24px;
  border-radius: 2;
  padding: 20px;
  font-family: 'Righteous';
  margin: 2px;
  &:active {
    background: #fd7272;
    color: black;
  }
`;

{/*export default function ScoreButton({btnValue}) {
    const [on, set] = useState(false);
    const toggleRun = () => set(!on);
    
    return(
        <Button on={on} onClick={ toggleRun}>
        {btnValue}
        {on ? 'On' : 'Off'}
        </Button>
    );
}*/}

export default React.memo(function ScoreButton({ refs, tag, btnName }) {
    const context = useContext(BoxScoreContext);
    console.log('tag:' + tag + 'btnName: ' + refs.btnNames[tag]);
    function toggleRun(e) {
        const { id, state, setBoxScore, updateBoxScore } = context
        console.log('Button Pressed')
        console.log('Inning: ' + state.Inning);
        let  currentInning = [state.Inning];
        console.log('Inning' + currentInning);
        let currentInningHalf = [state.InningHalf];
        console.log('Inning Half: ' + currentInningHalf);
        var activeBox = [];
        var whichTeam = '';
        let awayScores = [state.Away_Team];
        switch (tag) {
            case refs.tags['Home']:
                activeBox = [...state['Home_Team']];
                whichTeam = 'Home_Team';
                 
                break;
            case refs.tags['Home']:
                activeBox = [...state['Away_Team']];
                whichTeam = 'Away_Team';
                break;
            case refs.tags['Home']:
                
                break;
            default:
                break;
        }
        if (activeBox[currentInning] == '-') {
            activeBox[currentInning] = 1
        }else {
            activeBox[currentInning] = activeBox[currentInning] + 1;
        }
        
        const newBoxScore = {
            ...state,
            ['Inning']: currentInning,
            ['InningHalf']: currentInningHalf,
            [whichTeam]: activeBox,
            ['Away_Team']: awayScores,
        }
        return(newBoxScore);
        {/* do stuff */}
        //updateBoxScore(newBoxScore, id)
        //setBoxScore(newBoxScore)
        
        
    }
    return (
        <Button onClick={ (e) => toggleRun(e)}>
        {/*{refs.btnNames[tag]}*/}
        {btnName}
        
        </Button>
    );
});
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clock from "./clock";
import './turn-progress.css';

function TurnProgress (props) {
    const timeToTotal = props.totalTime - (props.pastTime + props.maxTime);
    const extraPassedTime = props.turnTime - props.maxTime;
    const valueToTotalTime = extraPassedTime * 100 / timeToTotal;

    const turnFinished = (props.progress === 100);

    const value = turnFinished ? valueToTotalTime : props.progress;

    const time = turnFinished ? timeToTotal : props.turnTime;



    const color = turnFinished ? 'secondary' : 'primary';

    return (
        <div className={'turn-progress'}>
            <h2>Current Turn Time</h2>
            <CircularProgress
                className={'turn-progress-bar'}
                variant="static"
                value={value}
                size={200}
                color={color}
            />
            <div className={'turn-progress-clock'}>
                <Clock
                    time={time}
                    currentTurn={props.currentTurn}
                    turnFinished={turnFinished}
                />
            </div>
        </div>
    );
}

export default TurnProgress;
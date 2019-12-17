import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clock from "./clock";
import './turn-progress.css';

function TurnProgress (props) {
    const timeToTotal = props.totalTime - (props.pastTime + props.maxTime);
    const extraPassedTime = props.turnTime - props.maxTime;
    const valueToTotalTime = extraPassedTime * 100 / timeToTotal;

    const value = props.progress === 100 ? valueToTotalTime : props.progress;

    return (
        <div className={'turn-progress'}>
            <CircularProgress
                className={'turn-progress-bar'}
                variant="static"
                value={value}
                size={200}
            />
            <div className={'turn-progress-clock'}>
                <Clock time={props.turnTime}/>
            </div>
        </div>
    );
}

export default TurnProgress;
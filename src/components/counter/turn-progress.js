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
    const time = turnFinished ? 0 : props.turnTime; // change to exeeded time
    const color = turnFinished ? 'secondary' : 'primary';
    const direction = turnFinished ? 'forward' : 'backward';

    const getCircularProgressProps = () => {
        return {
            className: 'turn-progress-bar',
            variant: 'static',
            value: 100 - value,
            size: 200,
            color: color
        }
    };

    const getClockProps = () => {
        return {
            time: time, // exceeded when finish
            currentTurn: props.currentTurn,
            turnFinished: turnFinished,
            direction: direction,
            maxTime: props.totalTime
        }
    };

    return (
        <div className={'turn-progress'}>
            <h2>Current Turn Time</h2>
            <CircularProgress {...getCircularProgressProps()} />
            <div className={'turn-progress-clock'}>
                <Clock {...getClockProps()} />
            </div>
        </div>
    );
}

export default TurnProgress;
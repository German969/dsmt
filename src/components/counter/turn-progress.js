import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clock from "./clock";
import './turn-progress.css';

function TurnProgress (props) {
    const valueFromBeginning = (props.pastTime + props.turnTime) * 100 / props.totalTime;
    const turnFinished = (props.progress === 100);
    const value = turnFinished ? valueFromBeginning : 100 - props.progress;
    const time = turnFinished ? 0 : props.turnTime;
    const color = turnFinished ? 'secondary' : 'primary';
    const direction = turnFinished ? 'forward' : 'backward';

    const getCircularProgressProps = () => {
        return {
            className: 'turn-progress-bar',
            variant: 'static',
            value: value,
            size: 200,
            color: color
        }
    };

    const getClockProps = () => {
        return {
            time: time,
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
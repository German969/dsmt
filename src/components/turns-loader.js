import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './turns-loader.css';

function TurnsLoader (props) {
    const [totalProgressValues, setTotalProgressValues] = useState(getInitialTotalProgressValues(props.turns, props.totalTime));
    const [currentProgressValues, setCurrentProgressValues] = useState(getInitialCurrentProgressValues(props.turns));

    const [currentProgress, setCurrentProgress] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(0);

    const renderProgressValues = () => {
        const unavailableWidth = props.turns * 10 + 10;

        return totalProgressValues.map((progressValue, index) => {
            return (
                <div style={{width: progressValue + "%"}}>
                    <LinearProgress
                        className={'partial-progress'}
                        key={'progress'+index}
                        variant="determinate"
                        value={currentProgressValues[index]}
                    />
                </div>
            );
        });
    };

    return (
        <div className={'turns-loader'}>
            {renderProgressValues()}
        </div>
    );
}

function getInitialTotalProgressValues (turns, totalTime) {
    const currentTimes = [];
    let progress;

    turns.forEach((turn) => {
        progress = turn * 100 / totalTime;

        currentTimes.push(progress);
    });

    return currentTimes;
}

function getInitialCurrentProgressValues (turns) {
    const currentTimes = [];

    turns.forEach((turn) => {
        currentTimes.push(0);
    });

    return currentTimes;
}

export default TurnsLoader;
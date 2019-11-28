import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './turns-loader.css';

function TurnsLoader (props) {
    const [totalProgressValues, setTotalProgressValues] = useState(getInitialTotalProgressValues(props.turns, props.totalTime));
    const [currentProgressValues, setCurrentProgressValues] = useState(getInitialCurrentProgressValues(props.turns));
    const [currentInterval, setCurrentInterval] = useState(null);

    const [currentProgress, setCurrentProgress] = useState(0);

    const renderProgressValues = () => {
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

    useEffect(() => {
        const newProgressValues = [...currentProgressValues];

        const interval = setInterval(() => {
            newProgressValues[props.currentTurn] = newProgressValues[props.currentTurn] + 1;

            setCurrentProgressValues([...newProgressValues]);
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    }, [props.currentTurn]);

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
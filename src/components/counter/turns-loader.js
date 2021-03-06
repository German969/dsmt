import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './turns-loader.css';

function TurnsLoader (props) {

    const renderProgressValues = () => {
        return props.totalProgressValues.map((progressValue, index) => {
            const color = (
                (props.currentTurn === index) &&
                (props.currentProgressValues[index] === 100)) ?
                'secondary' :
                'primary';

            return (
                <div style={{width: progressValue + "%"}}>
                    <LinearProgress
                        className={'partial-progress'}
                        key={'progress'+index}
                        variant="determinate"
                        value={props.currentProgressValues[index]}
                        color={color}
                    />
                </div>
            );
        });
    };

    /*useEffect(() => {
        const newProgressValues = [...currentProgressValues];

        const interval = setInterval(() => {
            newProgressValues[props.currentTurn] = newProgressValues[props.currentTurn] + 1;

            setCurrentProgressValues([...newProgressValues]);
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    }, [props.currentTurn]);*/

    return (
        <div className={'turns-loader'}>
            {renderProgressValues()}
        </div>
    );
}

function getInitialCurrentProgressValues (turns) {
    const currentTimes = [];

    turns.forEach((turn) => {
        currentTimes.push(0);
    });

    return currentTimes;
}

export default TurnsLoader;
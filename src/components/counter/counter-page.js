import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Button} from '@material-ui/core';
import OverallClock from './overall-clock';
import TurnProgress from './turn-progress';
import TurnsDrawer from './turns-drawer';
import TurnsLeft from './turns-left';
import TurnsLoader from './turns-loader';
import './counter-page.css';

function CounterPage(props) {

    const getInitialTotalTimes = () => {
        let newTimes = [];
        const equalTime = props.totalTime / props.turnsCount;

        for (let i = 0; i < props.turnsCount; i++) {
            newTimes.push(equalTime);
        }

        return newTimes;
    };

    const getTurnsPercentage = (turnsTime) => {
        const currentTimes = [];
        let progress;

        turnsTime.forEach((turnTime) => {
            progress = turnTime * 100 / props.totalTime;

            currentTimes.push(progress);
        });

        return currentTimes;
    };

    const getInitialCurrentProgressValues = () => {
        const currentTimes = [];

        for (let i = 0; i < props.turnsCount; i++) {
            currentTimes.push(0);
        }

        return currentTimes;
    };

    // Total time of each turn
    const [totalTimes, setTotalTimes] = useState(getInitialTotalTimes());

    // Current turn
    const [currentTurn, setCurrentTurn] = useState(0);

    // Percentage of each turn based on total
    const [turnsPercentage, setTurnsPercentage] =
        useState(getTurnsPercentage(totalTimes));

    // tiempo avanzado de cada turno
    const [currentProgressValues, setCurrentProgressValues] = useState(getInitialCurrentProgressValues());

    // maximum initial turn time
    const [initialCurrentTotalTime, setInitialCurrentTotalTime] = useState(totalTimes[currentTurn]);

    // current counter interval
    const [currentInterval, setCurrentInterval] = useState(null);

    const [initialTurnMoment, setInitialTurnMoment] = useState(null);

    useEffect(() => {
        const newCurrentProgressValues = [...currentProgressValues];
        let newTotalTimes = [...totalTimes];
        const oneSecondPercentage = 100 / totalTimes[currentTurn];
        setInitialTurnMoment(moment());

        const interval = setInterval(() => {
            newCurrentProgressValues[currentTurn] = newCurrentProgressValues[currentTurn] + oneSecondPercentage;

            if (newCurrentProgressValues[currentTurn] >= 100) {
                const equalDiscount = 1 / (props.turnsCount - currentTurn - 1);
                let timePassed;

                newCurrentProgressValues[currentTurn] = 100;

                newTotalTimes = newTotalTimes.map((totalTime, index) => {
                    if (index === currentTurn) {
                        return totalTime + 1;
                    } else if (index > currentTurn) {
                        return totalTime - equalDiscount;
                    } else {
                        return totalTime;
                    }
                });

                timePassed = newCurrentProgressValues.reduce((total, actual, index) => {
                    return total + (newTotalTimes[index] * (actual / 100));
                }, 0);

                if (timePassed >= props.totalTime) {
                    props.setLastTurn(currentTurn);
                    props.setTimeFinished();
                } else {
                    setTotalTimes(newTotalTimes);
                    setTurnsPercentage(getTurnsPercentage(newTotalTimes));
                }
            }

            setCurrentProgressValues([...newCurrentProgressValues]);
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    }, [currentTurn]);

    const updateTimes = () => {
        let newTotalTimes = [...totalTimes];
        let newEqualTime;
        let timePassed;
        let newCurrentProgressValues = [...currentProgressValues];

        newCurrentProgressValues[currentTurn] = 100;

        if (currentProgressValues[currentTurn] < 100) {
            newTotalTimes[currentTurn] = moment().diff(initialTurnMoment) / 1000;

            timePassed = newTotalTimes.reduce((total, actual, index) => {
                if (index <= currentTurn) {
                    return total + actual;
                } else {
                    return total;
                }
            }, 0);

            newEqualTime = (props.totalTime - timePassed) / (props.turnsCount - currentTurn - 1);

            for (let i = currentTurn + 1; i < totalTimes.length; i++) {
                newTotalTimes[i] = newEqualTime;
            }

            setCurrentProgressValues(newCurrentProgressValues);
            setTotalTimes(newTotalTimes);
            setTurnsPercentage(getTurnsPercentage(newTotalTimes));
            setInitialCurrentTotalTime(newTotalTimes[currentTurn + 1]);
        } else {
            setCurrentProgressValues(newCurrentProgressValues);
            setInitialCurrentTotalTime(totalTimes[currentTurn + 1]);
        }
    };

    const nextTurn = () => {
        updateTimes();

        setCurrentTurn(currentTurn + 1);

        if (currentTurn + 1 === props.turnsCount) {
            props.setTimeFinished();
        }
    };

    const getCurrentProgress = () => {
        return currentProgressValues[currentTurn];
    };

    const getCurrentTotalTime = () => {
        return totalTimes[currentTurn];
    };

    const getPastTime = () => {
        return totalTimes.reduce((total, actual, index) => {
            if (index < currentTurn) {
                return total + actual;
            } else {
                return total;
            }
        }, 0);
    };

    const getTurnProgressProps = () => {
        return {
            currentTurn: currentTurn,
            maxTime: initialCurrentTotalTime,
            pastTime: getPastTime(),
            progress: getCurrentProgress(),
            totalTime: props.totalTime,
            turnTime: getCurrentTotalTime()
        }
    };

    const getNextButtonProps = () => {
        return {
            children: 'Next',
            className: 'next-button',
            color: 'primary',
            onClick: nextTurn,
            variant: 'contained'
        };
    };

    const getTurnsLoaderProps = () => {
        return {
            currentProgressValues: currentProgressValues,
            currentTurn: currentTurn,
            totalProgressValues: turnsPercentage,
            totalTime: props.totalTime,
            turns: totalTimes
        };
    };

    const getBackButtonProps = () => {
        return {
            children: 'Back',
            className: 'back-button',
            color: 'secondary',
            onClick: props.backToSetup,
            variant: 'contained'
        }
    };

    return (
        <div>
            <TurnsLeft currentTurn={currentTurn} turnsCount={props.turnsCount}/>
            <OverallClock time={props.totalTime}/>
            <TurnProgress {...getTurnProgressProps()} />
            <TurnsDrawer currentTurn={currentTurn} turns={props.turns}/>
            <Button {...getNextButtonProps()} />
            <TurnsLoader {...getTurnsLoaderProps()} />
            <Button {...getBackButtonProps()} />
        </div>
    );
}

export default CounterPage;
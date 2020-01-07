import React, {useEffect, useState} from "react";
import Clock from "./clock";
import {Button} from "@material-ui/core";
import TurnsLoader from "./turns-loader";
import TurnProgress from "./turn-progress";
import TurnsDrawer from './turns-drawer';
import TurnsLeft from './turns-left';
import moment from 'moment';
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

    // Tiempo total de cada turno
    const [totalTimes, setTotalTimes] = useState(getInitialTotalTimes());

    // turno actual
    const [currentTurn, setCurrentTurn] = useState(0);

    // Porcentaje de cada turno en base al total
    const [turnsPercentage, setTurnsPercentage] =
        useState(getTurnsPercentage(totalTimes));

    // tiempo avanzado de cada turno
    const [currentProgressValues, setCurrentProgressValues] = useState(getInitialCurrentProgressValues());

    // tiempo maximo inicial del turno
    const [initialCurrentTotalTime, setInitialCurrentTotalTime] = useState(totalTimes[currentTurn]);

    // intervalo del contador actual
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

    return (
        <div>
            {/*<Clock time={props.totalTime}/>*/}
            <TurnsLeft currentTurn={currentTurn} turnsCount={props.turnsCount}/>
            <TurnProgress
                progress={getCurrentProgress()}
                turnTime={getCurrentTotalTime()}
                totalTime={props.totalTime}
                pastTime={getPastTime()}
                maxTime={initialCurrentTotalTime}
                currentTurn={currentTurn}
            />
            <TurnsDrawer currentTurn={currentTurn} turns={props.turns}/>
            <Button
                variant="contained"
                color="primary"
                className={'next-button'}
                onClick={nextTurn}
            >
                Next
            </Button>
            <TurnsLoader
                turns={totalTimes}
                totalTime={props.totalTime}
                currentTurn={currentTurn}
                totalProgressValues={turnsPercentage}
                currentProgressValues={currentProgressValues}
            />
            <Button
                variant="contained"
                color="secondary"
                className={'back-button'}
                onClick={props.backToSetup}
            >
                Back
            </Button>
        </div>
    );
}

export default CounterPage;
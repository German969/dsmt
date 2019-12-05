import React, {useEffect, useState} from "react";
import Clock from "./clock";
import { Button } from "@material-ui/core";
import TurnsLoader from "./turns-loader";

function CounterPage (props) {

    const getTotalProgressValues = (times) => {
        const currentTimes = [];
        let progress;

        times.forEach((turn) => {
            progress = turn * 100 / props.totalTime;

            currentTimes.push(progress);
        });

        return currentTimes;
    };

    // tiempo total de cada turno
    const [times, setTimes] = useState(getInitialTimes(props.totalTime, props.turnsCount));

    // turno actual
    const [currentTurn, setCurrentTurn] = useState(0);

    // Progreso total de los turnos (% de width)
    const [totalProgressValues, setTotalProgressValues] =
        useState(getTotalProgressValues(times));

    // tiempo avanzado del turno
    const [currentProgressValues, setCurrentProgressValues] = useState(getInitialCurrentProgressValues(times));

    // intervalo del contador actual
    const [currentInterval, setCurrentInterval] = useState(null);

    useEffect(() => {
        const newProgressValues = [...currentProgressValues];
        const oneSecondPercentage = 100 / (props.totalTime / props.turnsCount);

        const interval = setInterval(() => {
            newProgressValues[currentTurn] = newProgressValues[currentTurn] + oneSecondPercentage;

            setCurrentProgressValues([...newProgressValues]);
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    }, [currentTurn]);

    const updateTimes = () => {
        const newTimes = [];
        const timePassed = currentProgressValues.reduce((total, actual, index) => {
            if (index === currentTurn) {
                const timeForProgress = actual * (props.totalTime / props.turnsCount) / 100;

                return total + timeForProgress;
            } else if (index < currentTurn) {
                const timeForProgress = totalProgressValues[index] * (props.totalTime / props.turnsCount) / 100;

                return total + timeForProgress;
            } else {
                return total;
            }
        }, 0);
        console.log('time passed: ', timePassed);
        const newEqualTime = (props.totalTime - timePassed) / (props.turnsCount - (currentTurn + 1));
        console.log('new equal time: ', newEqualTime);
        let newTotalProgressValues;
        let newCurrentProgressValues = [...currentProgressValues];

        console.log('total progress values: ', totalProgressValues);

        for (let i = 0; i < (currentTurn + 1); i++) {
            let finishValue;

            if (i === currentTurn) {
                //finishValue = totalProgressValues[i] / 1000 * props.totalTime;
                finishValue = currentProgressValues[i] * (props.totalTime / props.turnsCount) / 100;
            } else {
                finishValue = times[i];
            }
            //newTimes.push(currentProgressValues[i]);
            newTimes.push(finishValue);
        }

        for (let i = (currentTurn + 1); i < props.turnsCount; i++) {
            newTimes.push(newEqualTime);
        }

        console.log('new times: ', newTimes);

        newTotalProgressValues = getTotalProgressValues(newTimes, props.totalTime);

        console.log('new total progress values: ', newTotalProgressValues);

        newCurrentProgressValues[currentTurn] = 100;

        setTimes(newTimes);
        setTotalProgressValues(newTotalProgressValues);
        setCurrentProgressValues(newCurrentProgressValues);
    };

    const nextTurn = () => {
        const newTotalProgressValues = [];
        let progress;

        updateTimes();

        setCurrentTurn(currentTurn + 1);
    };

    return (
        <div>
            <Clock time={props.totalTime}/>
            <Button
                variant="contained"
                color="primary"
                className={'next-button'}
                onClick={nextTurn}
            >
                Next
            </Button>
            <TurnsLoader
                turns={times}
                totalTime={props.totalTime}
                currentTurn={currentTurn}
                totalProgressValues={totalProgressValues}
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

function getInitialTimes (totalTime, turns) {
    let newTimes = [];
    const equalTime = totalTime / turns;

    for (let i = 0; i < turns; i++) {
        newTimes.push(equalTime);
    }

    return newTimes;
}

function getInitialCurrentProgressValues (turns) {
    const currentTimes = [];

    turns.forEach((turn) => {
        currentTimes.push(0);
    });

    return currentTimes;
}

export default CounterPage;
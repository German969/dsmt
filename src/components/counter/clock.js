import React, { useState, useEffect } from "react";

function Clock (props) {
    const getInitialMinutes = () => {
        return Math.floor(props.time/60);
    };
    const getInitialSeconds = () => {
        return Math.floor(props.time - getInitialMinutes() * 60);
    };

    const [minutes, setMinutes] = useState(getInitialMinutes());
    const [seconds, setSeconds] = useState(getInitialSeconds());

    // intervalo del contador actual
    const [currentInterval, setCurrentInterval] = useState(null);

    const counterClock = () => {
        let sec = getInitialSeconds();
        let min = getInitialMinutes();

        const interval = setInterval(() => {
            if (sec > 0) {
                setSeconds(s => s - 1 );
                sec = sec - 1;
            }

            if (sec === 0) {
                if (min === 0) {
                    clearInterval(interval)
                } else {
                    setMinutes(m => m - 1);
                    setSeconds(59);
                    min = min - 1;
                    sec = 59;
                }
            }
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    };

    const forwardClock = () => {
        let sec = getInitialSeconds();
        let min = getInitialMinutes();
        let maxMinutes = props.totalTime / 60;

        const interval = setInterval(() => {
            if (sec < 60) {
                setSeconds(s => s + 1 );
                sec = sec + 1;
            }

            if (sec === 0) {
                if (min === maxMinutes) {
                    clearInterval(interval)
                } else {
                    setMinutes(m => m + 1);
                    setSeconds(0);
                    min = min - 1;
                    sec = 0;
                }
            }
        }, 1000);

        if (currentInterval) clearInterval(currentInterval);

        setCurrentInterval(interval);
    };

    const restartClock = () => {
        setMinutes(getInitialMinutes());
        setSeconds(getInitialSeconds());
    };

    useEffect(() => {
        restartClock();

        if (props.direction === 'backward') {
            counterClock();
        } else {
            forwardClock()
        }
    }, [props.currentTurn, props.turnFinished]);

    return (
        <div>
            <h1>{ minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</h1>
        </div>
    );
}

export default Clock;
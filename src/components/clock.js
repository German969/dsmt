import React, { useState, useEffect } from "react";

function Clock (props) {
    const getInitialMinutes = () => {
        return Math.floor(props.time/60);
    };
    const getInitialSeconds = () => {
        return props.time - getInitialMinutes() * 60;
    };

    const [minutes, setMinutes] = useState(getInitialMinutes());
    const [seconds, setSeconds] = useState(getInitialSeconds());

    const getActualSeconds = () => {
        return seconds + minutes * 60;
    };

    useEffect(() => {
        let sec = seconds;
        let min = minutes;

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

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>{ minutes }:{ seconds < 10 ? `0${ seconds }` : seconds }</h1>
        </div>
    );
}

export default Clock;
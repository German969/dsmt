import React, {useState} from "react";
import Clock from "./clock";
import { Button } from "@material-ui/core";
import TurnsLoader from "./turns-loader";

function CounterPage (props) {
    const [times, setTimes] = useState(getInitialTimes(props.totalTime, props.turnsCount));
    const [currentTurn, setCurrentTurn] = useState(0);

    return (
        <div>
            <Clock time={props.totalTime}/>
            <TurnsLoader turns={times} totalTime={props.totalTime} />
            <Button
                variant="contained"
                color="primary"
                className={'back-button'}
                onClick={props.backToSetup}
            >
                Back
            </Button>
        </div>
    );
}

function getInitialTimes (totalTime, turns) {
    console.log(totalTime, turns);
    let newTimes = [];
    const equalTime = totalTime / turns;

    for (let i = 0; i < turns; i++) {
        newTimes.push(equalTime);
    }

    return newTimes;
}

export default CounterPage;
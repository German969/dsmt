import React, {useState} from "react";
import Clock from "./clock";
import { Button } from "@material-ui/core";
import TurnsLoader from "./turns-loader";

function CounterPage (props) {
    const [times, setTimes] = useState(getInitialTimes(props.totalTime, props.turnsCount));
    const [currentTurn, setCurrentTurn] = useState(0);

    const nextTurn = () => {
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
            <TurnsLoader turns={times} totalTime={props.totalTime} currentTurn={currentTurn} />
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
    console.log(totalTime, turns);
    let newTimes = [];
    const equalTime = totalTime / turns;

    for (let i = 0; i < turns; i++) {
        newTimes.push(equalTime);
    }

    return newTimes;
}

export default CounterPage;
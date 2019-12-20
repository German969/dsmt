import React from "react";
import TimePicker from "./time-picker";
import TurnsPicker from "./turns-picker";
import {Button} from "@material-ui/core";

function SetUpPage (props) {
    return (
        <div>
            <TimePicker
                onTimeChange={(time) => {
                    props.setTime(time*60)
                }}
                onTimePicked={props.handleNewTime}
                onPickerChange={(type)=>{props.setTimeType(type)}}
            />
            <TurnsPicker
                setNewTurn={props.setNewTurn}
                addTurn={props.addTurn}
                removeItem={props.removeItem}
                turns={props.turns}
                addMany={props.addMany}
            />
            <Button
                variant="contained"
                color="primary"
                className={'start-button'}
                onClick={props.startRound}
            >
                Start
            </Button>
        </div>
    );
}

export default SetUpPage;
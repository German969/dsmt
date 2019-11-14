import React from "react";
import Clock from "./clock";
import { Button } from "@material-ui/core";

function CounterPage (props) {
    return (
        <div>
            <Clock time={props.time}/>
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

export default CounterPage;
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Clock from "./clock";
import './turn-progress.css';

function TurnProgress (props) {
    return (
        <div className={'turn-progress'}>
            <CircularProgress
                className={'turn-progress-bar'}
                variant="static"
                value={props.progress}
                size={200}
            />
            <div className={'turn-progress-clock'}>
                <Clock time={props.turnTime}/>
            </div>
        </div>
    );
}

export default TurnProgress;
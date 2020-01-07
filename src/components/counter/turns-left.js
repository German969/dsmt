import React from 'react';
import './turns-left.css';

function TurnsLeft (props) {
    return (
        <div className={'turns-left-container'}>
            <h2>Turns Left</h2>
            <h1>{props.turnsCount - props.currentTurn - 1}</h1>
        </div>
    );
}

export default TurnsLeft;
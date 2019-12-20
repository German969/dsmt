import React from 'react';
import './turns-left.css';

function TurnsLeft (props) {
    return (
        <div className={'turns-left-container'}>
            <h2>Turns Left</h2>
            <h2>{props.turnsCount - props.currentTurn - 1}</h2>
        </div>
    );
}

export default TurnsLeft;
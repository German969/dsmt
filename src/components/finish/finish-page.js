import React from 'react';
import './finish-page.css';
import {Card, ListItem} from "@material-ui/core";

function FinishPage (props) {
    const renderTurnsLeft = () => {
        const turnsLeft = props.turns.slice(props.lastTurn + 1);

        return turnsLeft.map((turn) => {
            return (
                <ListItem className={'finish-page-list-item'}>
                    <Card className={'finish-page-card'}>{turn}</Card>
                </ListItem>
            );
        });
    };

    return (
        <div>
            <h1 className={'time-finish-title'}>Time Finished</h1>
            <h2>Turns not taken</h2>
            <div className={'turns-not-taken-container'}>
                {renderTurnsLeft()}
            </div>
        </div>

    );
}

export default FinishPage;
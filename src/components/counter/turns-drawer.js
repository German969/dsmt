import React from "react";
import './turns-drawer.css';
import {Card, ListItem} from "@material-ui/core";

function TurnsDrawer (props) {
    const renderNextTurns = () => {
        const nextTurns = props.turns.slice(props.currentTurn, props.currentTurn + 3);

        return nextTurns.map((turn) => {
            return (
                <ListItem className={'turns-drawer-list-item'}>
                    <Card className={'turns-drawer-card'}>{turn}</Card>
                </ListItem>
            );
        });
    };

    return (
        <div className={'turns-drawer-container'}>
            <h2>Current and Next Turns</h2>
            {renderNextTurns()}
        </div>
    );
}

export default TurnsDrawer;
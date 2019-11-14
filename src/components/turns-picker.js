import React, { useState } from "react";
import {List, ListItem, Button, Input, Card} from '@material-ui/core';
import './turns-picker.css';

function TurnsPicker (props) {
    const [addManyTurns, setAddManyTurns] = useState(null);

    const renderListItems = () => {
        return props.turns.map((turn, index) =>
            <ListItem
                className={'turns-picker-list-item'}
            >
                <Card
                    className={'turns-picker-card'}
                >
                    <Input
                        className={'turns-picker-input'}
                        onChange={(e)=>{props.setNewTurn(e.target.value, index)}}
                        value={props.turns[index]}
                    />
                    <Button onClick={()=>{props.removeItem(index)}}>X</Button>
                </Card>
            </ListItem>
        );
    };

    return (
        <div className={'turns-picker-container'}>
            <h1>Turns</h1>
            <Input
                type={'number'}
                value={addManyTurns}
                onChange={(e)=>{setAddManyTurns(e.target.value)}}
                className={'turns-picker-input-number'}
            />
            <Button onClick={()=>{props.addMany(addManyTurns)}}>Accept</Button>
            <List>
                {renderListItems()}
                <Button onClick={() => props.addTurn()}>Add</Button>
            </List>
        </div>
    );
}

export default TurnsPicker;
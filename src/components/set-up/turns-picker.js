import React, { useState } from "react";
import {List, ListItem, Button, Input, TextField, Card} from '@material-ui/core';
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
            <TextField
                type={'number'}
                value={addManyTurns}
                onChange={(e)=>{setAddManyTurns(e.target.value)}}
                className={'turns-picker-input-number'}
                label={'Add many'}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                onClick={()=>{props.addMany(addManyTurns)}}
                className={'turns-picker-accept-button'}
            >
                Accept
            </Button>
            <List>
                {renderListItems()}
                <Button onClick={() => props.addTurn()}>Add</Button>
            </List>
        </div>
    );
}

export default TurnsPicker;
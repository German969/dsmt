import React, { useState } from 'react';
import { Input, TextField, Select, MenuItem } from '@material-ui/core';
import './time-picker.css';
import moment from 'moment';

function TimePicker (props) {
    const [picker, setPicker] = useState('minutes');

    const handleTimeChange = (e) => {
        const newTime = moment(e.target.value, 'hh:mm');

        props.onTimePicked(newTime);
    };

    const isMinutesPicker = () => {
        return picker === 'minutes';
    };
    const isTimePicker = () => {
        return picker === 'time';
    };
    const renderPicker = () => {
        let contentToRender = null;

        if (isMinutesPicker()) {
            contentToRender =
                <Input
                    type={'number'}
                    className={'time-picker--input-number'}
                    placeholder={'Minutes'}
                    onChange={(e)=>{props.onTimeChange(e.target.value)}}
                />
        } else if (isTimePicker()) {
            contentToRender =
                <TextField
                    type={'time'}
                    className={'time-picker--input-time'}
                    onChange={handleTimeChange}
                />
        }

        return contentToRender
    };

    const handlePickerChange = (e) => {
        props.onPickerChange(e.target.value);
        setPicker(e.target.value);
    };

    return (
        <div className={'time-picker--container'}>
            {renderPicker()}
            <Select
                value={picker}
                onChange={handlePickerChange}
                className={'time-picker--select'}
            >
                <MenuItem value={'minutes'}>Minutes</MenuItem>
                <MenuItem value={'time'}>Time</MenuItem>
            </Select>
        </div>
    );
}

export default TimePicker;
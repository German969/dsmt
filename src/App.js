import React, {useState} from 'react';
import './App.css';
import moment from 'moment';
import CounterPage from './components/counter-page';
import SetUpPage from "./components/set-up-page";

function App() {
    const [timeType, setTimeType] = useState('minutes');
    const [time, setTime] = useState(0);
    const [hour, setHour] = useState(null);
    const [counter, setCounter] = useState(false);
    const [turns, setTurns] = useState(['']);

    const handleNewTime = (newHour) => {
        setHour(newHour);
    };

    const startRound = () => {
        if (timeType === 'time') {
            setTime(hour.diff(moment(), 'seconds'));
        }

        setCounter(true);
    };

    const setNewTurn = (value, index) => {
        let newTurns = [...turns];

        newTurns[index] = value;

        setTurns(newTurns);
    };

    const addTurn = () => {
        let newTurns = [...turns];

        newTurns.push('');

        setTurns(newTurns);
    };

    const removeItem = (index) => {
        let newTurns = [...turns];

        newTurns.splice(index, 1);

        setTurns(newTurns);
    };

    const addMany = (number) => {
        let newTurns = [...turns];

        if (turns.length > number) {
            newTurns = newTurns.slice(0, number);
        } else if (turns.length < number) {
            for (let i = 0; i < number - turns.length; i++) {
                newTurns.push('');
            }
        }

        setTurns(newTurns);
    };

    const renderPage = () => {
        let contentToRender = null;

        if (!counter) {
            contentToRender = (
                <SetUpPage
                    setTime={setTime}
                    handleNewTime={handleNewTime}
                    setTimeType={setTimeType}
                    startRound={startRound}
                    setNewTurn={setNewTurn}
                    addTurn={addTurn}
                    removeItem={removeItem}
                    turns={turns}
                    addMany={addMany}
                />
            );
        } else {
            contentToRender = (
                <CounterPage
                    totalTime={time}
                    turnsCount={turns.length}
                    backToSetup={()=>setCounter(false)}
                />
            );
        }

        return contentToRender;
    };

    return (
        <div className="App">
            {renderPage()}
        </div>
    );
}

export default App;

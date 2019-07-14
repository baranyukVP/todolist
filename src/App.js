import React from 'react';
import './App.css';
import Task from './Task'

function App() {
    return (
        <div className="App">
            <h1>ToDoList</h1>
            <Task
                name="name"
                description="description"
            />
        </div>
    );
}

export default App;
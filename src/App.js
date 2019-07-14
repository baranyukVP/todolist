import React from 'react';
import { withCookies } from 'react-cookie';
import './App.css';
import Task from './Task';

class App extends React.Component {
    render() {
        const cookies = this.props.cookies;
        const tasks = cookies ?.tasks;
        return (
            <div className="App">
                <h1>ToDoList</h1>
                {tasks && tasks.map((task) => (
                    <Task
                        key={task.id}
                        name={task.name}
                        description={task.description}
                    />)
                )}
            </div>
        );
    }
}

export default withCookies(App);
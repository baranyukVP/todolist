import React from 'react';
import { withCookies } from 'react-cookie';
import './App.css';
import Task from './Task';
import Input from './Input';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.cookies ?.tasks,
            taskName: '',
            taskDescription: ''
        }
    }

    addNewTask(e) {
        e.preventDefault();

    }

    onChangeNewTaskParams(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        const {
            tasks,
            taskName,
            taskDescription
        } = this.state;
        return (
            <div className="App">
                <h1>ToDoList</h1>
                <div className="task-list">
                    {tasks && tasks.map((task) => (
                        <Task
                            key={task.id}
                            name={task.name}
                            description={task.description}
                        />)
                    )}
                    <form>
                        <Input
                            name="taskName"
                            value={taskName}
                            onChange={this.onChangeNewTaskParams}
                            onBlur={this.onChangeNewTaskParams}
                        />
                        <Input
                            name="taskDescription"
                            value={taskDescription}
                            onChange={this.onChangeNewTaskParams}
                            onBlur={this.onChangeNewTaskParams}
                        />
                    </form>
                </div>
                <div className="task-btn-bar">
                    <button
                        onClick={this.addNewTask}
                    >
                        Add new task
                    </button>
                </div>
            </div>
        );
    }
}

export default withCookies(App);
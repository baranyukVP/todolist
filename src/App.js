import React from 'react';
import { withCookies, Cookies } from 'react-cookie';
import './App.css';
import Task from './Task';
import Input from './Input';
import { instanceOf } from 'prop-types';

class App extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.cookies.get('tasks') || [],
            taskName: '',
            taskDescription: ''
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.onChangeNewTaskParams = this.onChangeNewTaskParams.bind(this);
    }

    addNewTask(e) {
        e.preventDefault();
        const { tasks, taskName, taskDescription } = this.state;

        let newTask = { 'taskId': tasks.length, 'taskName': taskName, 'taskDescription': taskDescription };
        let newTasks = tasks ? tasks : [];
        newTasks.push(newTask);

        this.props.cookies.set('tasks', newTasks);
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
                            key={task.taskId}
                            name={task.taskName}
                            description={task.taskDescription}
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
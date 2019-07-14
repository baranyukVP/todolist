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
            taskDescription: '',
            error: null
        };
        this.addNewTask = this.addNewTask.bind(this);
        this.onChangeNewTaskParams = this.onChangeNewTaskParams.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleClickRemove = this.handleClickRemove.bind(this);
    }

    addNewTask(e) {
        e.preventDefault();
        const { tasks, taskName, taskDescription } = this.state;
        
        let newTask = {
            'taskId': tasks.length > 0
                ? tasks[tasks.length - 1].taskId + 1
                : 0,
            'taskName': taskName,
            'taskDescription': taskDescription
        };
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

    handleClickRemove(taskId) {
        const { tasks } = this.state;
        let newTasks = tasks;
        const position = this.findElement(taskId, tasks);
        if (position !== -1) {
            newTasks = newTasks.splice(position, 1);
        } else {
            this.setState({
                error: 'Can\'t recognize this ToDo item. Try again.'
            })
        }
        this.props.cookies.set('tasks', newTasks);
    }

    handleClickEdit(taskId, newTaskName, newTaskDescription) {
        const { tasks } = this.state;
        let newTasks = tasks;
        const position = this.findElement(taskId, tasks);
        console.log(taskId);
        console.log(tasks[position]);
        let newTask = {
            'taskId': tasks.length > 0
                ? tasks[tasks.length - 1].taskId + 1
                : 0,
            'taskName': newTaskName,
            'taskDescription': newTaskDescription
        };
        if (position !== -1) {
            newTasks = newTasks.splice(position, 1, newTask);
        } else {
            this.setState({
                error: 'Can\'t recognize this ToDo item. Try again.'
            })
        }
        this.props.cookies.set('tasks', newTasks);
    }

    findElement(taskId, tasks) {
        for (var i = 0; i < tasks.length; i++) {
            if (taskId === tasks[i].taskId) {
                return i;
            }
        }
        return false;
    }

    render() {
        const {
            tasks,
            taskName,
            taskDescription,
            error
        } = this.state;
        return (
            <div className="App">
                <h1>ToDoList</h1>
                {error ? (<h2 className="text-danger">{error}</h2>) : null}

                <form className="task-btn-bar">
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
                    <button
                        onClick={this.addNewTask}
                    >
                        Add new task
                    </button>
                </form>
                <div className="task-list">
                    {tasks && tasks.length > 0 && tasks?.map((task) => (
                        <Task
                            key={task.taskId}
                            taskId={task.taskId}
                            name={task.taskName}
                            handleClickEdit={this.handleClickEdit}
                            handleClickRemove={this.handleClickRemove}
                            description={task.taskDescription}
                        />)
                    )}
                    
                </div>
            </div>
        );
    }
}

export default withCookies(App);
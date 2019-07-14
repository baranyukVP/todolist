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
        this.handleClickTask = this.handleClickTask.bind(this);
    }

    addNewTask(e) {
        e.preventDefault();
        const { tasks, taskName, taskDescription } = this.state;
        
        let newTask = {
            'taskId': tasks.length > 0
                ? tasks[tasks.length - 1].taskId + 1
                : 0,
            'taskName': taskName,
            'taskDescription': taskDescription,
            'isCompleted': false
        };
        let newTasks = tasks ? tasks : [];
        newTasks.push(newTask);
        this.props.cookies.set('tasks', newTasks);
        this.setState({
            taskName: '',
            taskDescription: '',
        });
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
        if (position !== -1) {
            newTasks[position].taskName = newTaskName;
            newTasks[position].taskDescription = newTaskDescription;
            this.props.cookies.set('tasks', newTasks);
            console.log(newTasks);
        } else {
            this.setState({
                error: 'Can\'t recognize this ToDo item. Try again.'
            })
        }
        console.log('updated2');
    }

    handleClickTask(taskId, newTaskIsCompleted) {
        const { tasks } = this.state;
        let newTasks = tasks;
        const position = this.findElement(taskId, tasks);
        if (position !== -1) {
            newTasks[position].isCompleted = newTaskIsCompleted;
            this.props.cookies.set('tasks', newTasks);
        } else {
            this.setState({
                error: 'Can\'t recognize this ToDo item. Try again.'
            })
        }
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
                    <h2>Create new task</h2>
                    <Input
                        title="Name"
                        name="taskName"
                        value={taskName}
                        onChange={this.onChangeNewTaskParams}
                        onBlur={this.onChangeNewTaskParams}
                    />
                    <Input
                        title="Description"
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
                            isCompleted={task.isCompleted}
                            handleClickTask={this.handleClickTask}
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
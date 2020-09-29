import React, { useEffect } from 'react'
import useReducerState from './common/hooks/useReducerState'

import Task from './app/Task/Task'
import Input from './app/Input/Input'

import './App.css'


const initialState = {
    tasks: [],
    taskName: "",
    taskDescription: "",
    error: null
}

const App = () => {
    const [ {
        tasks,
        taskName,
        taskDescription,
        error
    }, setState ] = useReducerState(initialState)

    useEffect(() => {
        const storageTasks = localStorage.getItem('tasks') || '[]'
        setState({
            tasks: JSON.parse(storageTasks)
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addNewTask = (e) => {
        e.preventDefault();
        
        const newTask = {
            taskId: tasks.length > 0
                ? tasks[tasks.length - 1].taskId + 1
                : 0,
            taskName,
            taskDescription,
            isCompleted: false
        };
        let newTasks = tasks;
        newTasks.push(newTask);
        setState({
            tasks: newTasks,
            taskName: '',
            taskDescription: '',
        });
    }

    const onChangeNewTaskParams = (e) => {
        const { name, value } = e.target;
        setState({[name]: value})
    }

    const handleClickRemove = (taskId) => {
        let newTasks = tasks
        const position = findElement(taskId, tasks)
        if (position !== -1) {
            newTasks.splice(position, 1)
            setState({
                tasks: newTasks
            })
        } else {
            setState({error: 'Can\'t recognize this ToDo item. Try again.'})
        }
    }

    const handleClickEdit = (taskId, newTaskName, newTaskDescription) => {
        let newTasks = tasks
        const position = findElement(taskId, tasks)
        if (position !== -1) {
            newTasks[position].taskName = newTaskName
            newTasks[position].taskDescription = newTaskDescription
            setState({tasks: newTasks})
        } else {
            setState({error: 'Can\'t recognize this ToDo item. Try again.'})
        }
    }

    const handleClickTask = (taskId, newTaskIsCompleted) => {
        let newTasks = tasks
        const position = findElement(taskId, tasks)
        if (position !== -1) {
            newTasks[position].isCompleted = newTaskIsCompleted
            setState({tasks: newTasks})
        } else {
            setState({error: 'Can\'t recognize this ToDo item. Try again.'})
        }
    }

    const findElement = (taskId, tasks) => {
        for (var i = 0; i < tasks.length; i++) {
            if (taskId === tasks[i].taskId) {
                return i
            }
        }
        return false;
    }

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
                    onChange={onChangeNewTaskParams}
                    onBlur={onChangeNewTaskParams}
                />
                <Input
                    title="Description"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={onChangeNewTaskParams}
                    onBlur={onChangeNewTaskParams}
                />
                <button
                    onClick={addNewTask}
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
                        handleClickTask={handleClickTask}
                        handleClickEdit={handleClickEdit}
                        handleClickRemove={handleClickRemove}
                        description={task.taskDescription}
                    />)
                )}
            </div>
        </div>
    )
}

export default App

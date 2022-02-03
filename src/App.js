import React, { useEffect } from 'react'
import useReducerState from './common/hooks/useReducerState'

import Input from './components/Input/Input'

import './App.css'
import TaskList from "./components/TaskList/TaskList";


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
  }, [setState])

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
        <button onClick={addNewTask}>Add new task</button>
      </form>
      <TaskList/>
    </div>
  )
}

export default App

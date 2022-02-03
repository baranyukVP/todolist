import React, {useState} from 'react';
import Task from "./Task";
import Error from "../Error/Error";

export const TaskList = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState();

	const handleClickTask = (taskId, newTaskIsCompleted) => {
		let newTasks = tasks
		const position = findElement(taskId, tasks)

		if (position !== -1) {
			newTasks[position].isCompleted = newTaskIsCompleted

			setTasks(newTasks)
		} else {
			setError('Can\'t recognize this ToDo item. Try again.')
		}
	}

	const handleClickRemove = (taskId) => {
		let newTasks = tasks
		const position = findElement(taskId, tasks)
		if (position !== -1) {
			newTasks.splice(position, 1)
			setTasks(newTasks)
		} else {
			setError('Can\'t recognize this ToDo item. Try again.')
		}
	}

	const handleClickEdit = (taskId, newTaskName, newTaskDescription) => {
		let newTasks = tasks
		const position = findElement(taskId, tasks)
		if (position !== -1) {
			newTasks[position].taskName = newTaskName
			newTasks[position].taskDescription = newTaskDescription
			setTasks(newTasks)
		} else {
			setError('Can\'t recognize this ToDo item. Try again.')
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
			<Error message={error} />
		</div>
	);
}

export default TaskList;

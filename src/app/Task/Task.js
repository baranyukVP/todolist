import React, { Fragment, useEffect } from 'react'
import useReducerState from '../../common/hooks/useReducerState'

import Input from '../Input/Input'


const initialState = {
    newName: '',
    newDescription: '',
    isEditing: false
}

const Task = (props) => {
    const {
        taskId,
        name,
        description,
        isCompleted,
        handleClickEdit,
        handleClickRemove,
        handleClickTask
    } = props

    const [ {
        newName,
        newDescription,
        isEditing
    }, setState ] = useReducerState(initialState)

    useEffect(() => {
        setState({
            newName: name,
            newDescription: description
        })
    }, [])

    const onEdit = (e) => {
        const { name, value } = e.target;
        setState({
            [name]: value
        })
    }

    const onClickEditButton = (e) => {
        e.preventDefault();
        setState({
            isEditing: true
        })
    }

    const onClickEditCancel = (e) => {
        e.preventDefault();
        setState({
            newName: '',
            newDescription: '',
            isEditing: false
        })
    }

    const onClickEdit = (e) => {
        e.preventDefault();
        handleClickEdit(taskId, newName, newDescription);
        setState({
            newName: '',
            newDescription: '',
            isEditing: false
        });
    }

    const onClickRemove = (e) => {
        e.preventDefault();
        handleClickRemove(taskId);
    }

    const onClickTask = (e) => {
        handleClickTask(taskId, !isCompleted);
    }

    return (
        <div
            className={`task ${isCompleted ? 'completed' : ''}`}
        >
            {isEditing
                ? (<form>
                    <Input
                        name="newName"
                        value={newName}
                        placeholder={name}
                        onChange={onEdit}
                        onBlur={onEdit}
                    />
                    <Input
                        name="newDescription"
                        value={newDescription}
                        placeholder={description}
                        onChange={onEdit}
                        onBlur={onEdit}
                    />
                    <button
                        onClick={onClickEdit}
                    >
                        Save
                    </button>
                    <button
                        onClick={onClickEditCancel}
                    >
                        Cancel
                    </button>
                    </form>)
                : (
                    <Fragment>
                        <div className="task-text">
                            <h2>
                                {name}
                            </h2>
                            <p>
                                {description}
                            </p>
                        </div>
                        <div className="task-buttons">
                            <button
                                onClick={onClickEditButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={onClickRemove}
                            >
                                Remove
                            </button>
                            <input
                                type='checkbox'
                                checked={isCompleted}
                                onClick={onClickTask}
                            />
                        </div>
                    </Fragment>
                )}
        </div>
    )
}

export default Task

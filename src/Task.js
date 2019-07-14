import React, { Fragment } from 'react';
import Input from './Input';

class Task extends React.Component {
    state = {
        taskId: '',
        name: '',
        newName: '',
        newDescription: '',
        description: '',
        isCompleted: false,
        isEditing: false
    }

    static getDerivedStateFromProps(props, state) {
        let result = null;
        if (props.taskId !== state.taskId) {
            result = {
                ...result,
                taskId: props.taskId
            }
        }
        if (props.name !== state.name) {
            result = {
                ...result,
                name: props.name,
                newName: props.name
            }
        }
        if (props.description !== state.description) {
            result = {
                ...result,
                description: props.description,
                newDescription: props.description
            }
        }
        if (props.isCompleted !== state.isCompleted) {
            result = {
                ...result,
                isCompleted: props.isCompleted
            }
        }
        return result;
    }

    onEdit(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onClickEditButton(e) {
        e.preventDefault();
        this.setState({
            isEditing: true
        })
    }

    onClickEditCancel(e) {
        e.preventDefault();
        this.setState({
            newName: '',
            newDescription: '',
            isEditing: false
        })
    }

    onClickEdit(e) {
        e.preventDefault();
        const { taskId, newName, newDescription } = this.state;
        this.props.handleClickEdit(taskId, newName, newDescription);
        this.setState({
            newName: '',
            newDescription: '',
            isEditing: false
        });
        console.log('updated');
    }

    onClickRemove(e) {
        e.preventDefault();
        const { taskId } = this.state;
        this.props.handleClickRemove(taskId);
    }

    onClickTask(e) {
        const { taskId, isCompleted } = this.state;
        this.props.handleClickTask(taskId, !isCompleted);
    }

    render() {
        const {
            name,
            description,
            isCompleted,
            isEditing,
            newName,
            newDescription
        } = this.state;
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
                            onChange={this.onEdit.bind(this)}
                            onBlur={this.onEdit.bind(this)}
                        />
                        <Input
                            name="newDescription"
                            value={newDescription}
                            placeholder={description}
                            onChange={this.onEdit.bind(this)}
                            onBlur={this.onEdit.bind(this)}
                        />
                        <button
                            onClick={this.onClickEdit.bind(this)}
                        >
                            Save
                        </button>
                        <button
                            onClick={this.onClickEditCancel.bind(this)}
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
                                    onClick={this.onClickEditButton.bind(this)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={this.onClickRemove.bind(this)}
                                >
                                    Remove
                                </button>
                                <input
                                    type='checkbox'
                                    checked={isCompleted}
                                    onClick={this.onClickTask.bind(this)}
                                />
                            </div>
                        </Fragment>
                    )}
            </div>
        );
    }
}

export default Task;
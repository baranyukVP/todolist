import React, { Fragment } from 'react';
import Input from './Input';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: props.taskId,
            name: props.name ? props.name : '',
            newName: props.name ? props.name : '',
            newDescription: props.description ? props.description : '',
            description: props.description ? props.description : '',
            isCompleted: props.isCompleted,
            isEditing: false
        };
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickEditButton = this.onClickEditButton.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this); 
        this.onClickTask = this.onClickTask.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onClickEditCancel = this.onClickEditCancel.bind(this);
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
            isEditing: false
        })
    }

    onClickEdit(e) {
        e.preventDefault();
        const { taskId, name, description, isCompleted } = this.state;
        this.props.handleClickEdit(taskId, name, description, isCompleted);
    }

    onClickRemove(e) {
        e.preventDefault();
        const { taskId } = this.state;
        this.props.handleClickRemove(taskId);
    }

    onClickTask(e) {
        const { taskId, name, description, isCompleted } = this.state;
        this.props.handleClickTask(taskId, name, description, isCompleted);
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
                                onChange={this.onEdit}
                                onBlur={this.onEdit}
                            />
                            <Input
                                name="newDescription"
                                value={newDescription}
                                placeholder={description}
                                onChange={this.onEdit}
                                onBlur={this.onEdit}
                            />
                        <button
                            onClick={this.onClickEdit}
                        >
                            Save
                            </button>
                        <button
                            onClick={this.onClickEditCancel}
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
                                    onClick={this.onClickEditButton}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={this.onClickRemove}
                                >
                                    Remove
                                </button>
                                <input
                                    type='checkbox'
                                    checked={isCompleted}
                                    onClick={this.onClickTask}
                                />
                            </div>
                        </Fragment>
                    )}
            </div>
        );
    }
}

export default Task;
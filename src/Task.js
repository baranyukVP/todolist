import React from 'react';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: props.taskId,
            name: props.name,
            description: props.description
        };
        this.onClickEdit = this.onClickEdit.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this); 
    }

    onClickEdit(e) {
        e.preventDefault();
        const { taskId, name, description } = this.state;
        this.props.handleClickEdit(taskId, name, description);
    }

    onClickRemove(e) {
        e.preventDefault();
        const { taskId } = this.state;
        this.props.handleClickRemove(taskId);
    }

    render() {
        const { name, description } = this.state;
        return (
            <div className="task">
                <h2>
                    {name}
                </h2>
                <p>
                    {description}
                </p>
                <button
                    onClick={this.onClickEdit}
                >
                    Edit
                </button>
                <button
                    onClick={this.onClickRemove}
                >
                    Remove
                </button>
            </div>
        );
    }
}

export default Task;
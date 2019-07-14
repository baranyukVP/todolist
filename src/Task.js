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
    }

    onClickEdit(e) {
        e.preventDefault();
        const { taskId, name, description } = this.state;
        this.props.handleClickEdit(taskId, name, description);
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
            </div>
        );
    }
}

export default Task;
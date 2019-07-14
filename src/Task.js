import React from 'react';

const Task = ({ name, description }) => (
    <div className="task">
        <h2>
            {name}
        </h2>
        <p>
            {description}
        </p>
    </div>
);

export default Task;
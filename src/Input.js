import React from 'react';

const Input = ({
    title = '',
    error = '',
    ...props
}) => (
        <div>
            {title && (<h4>{title}</h4>)}
            <input
                {...props}
            />
        </div>
);

export default Input;
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
            {error && (<h4 className="text-danger">{error}</h4>)}
        </div>
);

export default Input;
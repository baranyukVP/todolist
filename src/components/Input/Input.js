import React from 'react';

const Input = ({
  title,
  error,
  value = '',
  onChange,
  ...rest
}) => (
  <div className="input">
    {title && (<h4>{title}</h4>)}
    <input
      value={value}
      onChange={onChange}
      {...rest}
    />
    {error && (<h4 className="text-danger">{error}</h4>)}
  </div>
)

export default Input;
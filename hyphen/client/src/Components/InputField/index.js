import React from 'react';

const Input = props => (
  <input
    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
    type={props.type}
    onChange={props.onChange}
    value={props.value}
    required={props.required}
  ></input>
);

export default Input;
import React from 'react';
import { RotateSpinLoader } from 'react-css-loaders';

const Button = props => (
  <button
    className="b ph3 pv2 w4 flex justify-center input-reset ba b--black bg-transparent grow pointer f6 dib"
    onClick={props.onClick}
    type={props.type || 'button'}
  >
    {props.isLoading ? (
      <RotateSpinLoader size={2} style={{ margin: 0 }} />
    ) : props.label}
  </button>
);

export default Button;
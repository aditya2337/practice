import React from 'react';
import API from '../../constants/api';

const Button = props => (
  <button
    onClick={props.onClick}
    className="no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma2 tc br2 pa2 pointer f2"
    title={props.title}
  >
    {props.google ? <i className="fab fa-google " /> : <i className="fas fa-envelope" />}
    <div className="flex justify-center">
      <span className="f6 ml3 pr2 ttu">{props.title}</span>
    </div>
  </button>
)

const AuthButtons = props => (
  <div className="flex flex-column w6 pa2" >
    <a href={API.GOOGLE} target="_blank" className="link">
      <Button
        title={`${props.label} using google`}
        google
      />
    </a>
    <Button
      title={`${props.label} using Email`}
      onClick={() => props.onEmailClick(true)}
    />
  </div>
)

export default AuthButtons;
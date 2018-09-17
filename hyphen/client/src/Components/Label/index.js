import React from 'react';

const Label = ({ label, labelFor }) => (
  <label className="db fw6 lh-copy f6" htmlFor={labelFor}>{label}</label>
);

export default Label;
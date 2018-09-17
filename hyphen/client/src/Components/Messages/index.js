import React from 'react';

const Messages = ({ isError, message, className, onClose }) => (
  <div className={`flex items-center justify-between br2 pa3 ${isError ? 'bg-light-red' : 'bg-lightest-blue'} navy ${className}`}>
    <div>{message}</div>
    <i onClick={onClose} className="fa fa-times pointer" />
  </div>
);

export default Messages;
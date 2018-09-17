import React from 'react';

const CreateFolderButton = ({ onClick, className }) => (
  <a
    className={`f5 pointer no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 border-box ${className}`}
    onClick={onClick}
  >
    <i className="fas fa-plus" />
    <span className="pl1">Create folder</span>
  </a>
);

export default CreateFolderButton;

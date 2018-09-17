import React from 'react';
import './stlyle.css';

const Modal = ({ open }) => (
  <div  style={{ display: open ? 'block' : 'none' }} className="modal">
    <div className="modal-content">
      <span className="close">&times;</span>
      <p>Some text in the Modal..</p>
    </div>
  </div>
);

export default Modal;

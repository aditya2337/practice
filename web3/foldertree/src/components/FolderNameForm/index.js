import React from 'react';
import { compose, withStateHandlers } from 'recompose';

const FolderNameForm = ({ onSubmit, onNameChange, name }) => (
  <form onSubmit={e => {
    e.preventDefault();
    name.length && onSubmit(name);
  }}>
    <div>
      <label className="db fw6 lh-copy f6 tc" htmlFor="name">Folder name</label>
      <input
        value={name}
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 mt2"
        type="text"
        name="folder name"
        onChange={e => onNameChange(e.target.value)}
      />
    </div>
    <button
      type="submit"
      style={{ backgroundColor: '#fff', border: '1px solid' }}
      className="f6 link dim black db pa2 mt2 fr w-100"
    >
      Create
    </button>
  </form>
);

export default compose(
  withStateHandlers(
    () => ({
      name: ''
    }),
    {
      onNameChange: () => name => ({ name })
    }
  )
)(FolderNameForm);

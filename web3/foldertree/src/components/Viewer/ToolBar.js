import React from 'react';
import { withStateHandlers, compose } from 'recompose';
import Modal from 'react-responsive-modal';

import CreateFolderButton from '../CreateFolderButton';
import helpers from '../../config/helpers';
import FolderNameForm from '../FolderNameForm';

const Direction = direction => ({ onClick, disabled }) => (
  <div
    style={{ height: 40, width: 40, color: disabled && '#b5adad' }}
    className={`ba flex justify-center items-center ${!disabled ? 'black bg-animate hover-bg-black hover-white' : ''}`}
    onClick={() => !disabled && onClick()}
  >
    <div>
      <i className={`fas fa-chevron-${direction}`} />
    </div>
  </div>
)

const Left = Direction('left');
const Right = Direction('right');

const ToolBar = props => (
  <div className="flex justify-between bb items-center">
    <div className="pl3">
      <div className="flex">
        <Left disabled={props.stack.past.length === 0} onClick={props.goBack} />
        <Right disabled={props.stack.future.length === 0} onClick={props.goForward} />
      </div>
    </div>
    <div>
      {props.pwd}
    </div>
    <CreateFolderButton className="bl" onClick={() => props.openModal(true)}  />

    <Modal open={props.open} onClose={() => props.openModal(false)} center>
      <FolderNameForm
        onSubmit={folder => {
            // addRootFolder(folder);
            props.addFolder(helpers.removeFirstSlash(props.path).split('/').join('.'), folder);
            props.openModal(false);
          }
        }
      />
    </Modal>
  </div>
)

export default compose(
  withStateHandlers(() => ({
    open: false
  }),
  {
    openModal: () => open => ({ open })
  })
)(ToolBar);

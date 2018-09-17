import React from 'react';
import { withStateHandlers, compose } from 'recompose';
import Modal from 'react-responsive-modal';
import jsonPointer from 'json-pointer';

import FolderBar from '../FolderBar';
import CreateFolderButton from '../CreateFolderButton';
import FolderNameForm from '../FolderNameForm';
import helpers from '../../config/helpers';

const Tree = ({ folders, open, openModal, addRootFolder, selectFolder, addPathToStack }) => (
  <div>
    <div className="w-100 bb flex justify-end">
      <CreateFolderButton className='bl' onClick={() => openModal(true)} />
    </div>
    <div>
    {Object.keys(folders).map((folder, index) => (
      <FolderBar
        expandable
        addPathToStack={addPathToStack}
        allPaths={jsonPointer.dict(folders)}
        selectFolder={selectFolder}
        path={helpers.getPath(jsonPointer.dict(folders), folders[folder].id).replace('/~1', '').replace(/\/id/g, '')}
        key={folders[folder].id}
        folder={folders[folder]}
        title={folders[folder].name}
        expanded={folders[folder].isExpanded}
      />
    ))}
    </div>
    <Modal open={open} onClose={() => openModal(false)} center>
      <FolderNameForm
        onSubmit={folder => {
            addRootFolder(folder);
            openModal(false);
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
)(Tree);

import React from 'react';
import jsonPointer from 'json-pointer';

import ToolBar from './ToolBar';
import FolderBar from '../FolderBar';
import helpers from '../../config/helpers';

const Viewer = ({
  selectFolder,
  selectedFolder,
  allFolders,
  selectedId,
  addFolder,
  addPathToStack,
  stack,
  goBack,
  goForward
}) => (
  <div>
    <ToolBar
      pwd={
        stack.present
          .replace(/\/children/g, '')
        }
      path={helpers.getPath(jsonPointer.dict(allFolders), selectedId).replace('/~1', '').replace(/\/id/g, '')}
      addFolder={addFolder}
      goBack={goBack}
      goForward={goForward}
      stack={stack}
    />
    <div className="pa3">
      {Object.keys(selectedFolder).length ? Object.keys(selectedFolder).map((folder, index) => (
        <FolderBar
          selectFolder={selectFolder}
          addPathToStack={addPathToStack}
          allPaths={jsonPointer.dict(allFolders)}
          key={selectedFolder[folder].id}
          path={helpers.getPath(jsonPointer.dict(allFolders), selectedFolder[folder].id).replace('/~1', '').replace(/\/id/g, '')}
          id={selectedFolder[folder].id}
          folder={selectedFolder[folder]}
          title={selectedFolder[folder].name}
          expanded={selectedFolder[folder].isExpanded}
        />
      )) : 'Empty Folder'}
    </div>
  </div>
);

export default Viewer;
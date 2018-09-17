import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tree from './components/Tree';
import Viewer from './components/Viewer';
import {
  addFolder,
  addRootFolder,
  selectFolder,
  addPathToStack,
  updateFolders,
  goBack,
  goForward,
  autoExpandFolders
} from './App_duck';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.stack.present !== nextProps.stack.present) {
      this.props.autoExpandFolders(nextProps.stack.present);
    }
  }

  render() {
    const {
      folders,
      addRootFolder,
      selectFolder,
      selectedFolder,
      selectedId,
      addFolder,
      addPathToStack,
      stack,
      goBack,
      goForward
    } = this.props;
    return (
      <div className="pl3 pr3 flex justify-center items-center h-100">
        <div className="mt4 ba flex vh-75 w-100">
          <div className="w-30 br">
            <Tree
              addPathToStack={addPathToStack}
              folders={folders}
              addRootFolder={addRootFolder}
              selectFolder={selectFolder}
            />
          </div>
          <div className="w-70">
            <Viewer
              addPathToStack={addPathToStack}
              allFolders={folders}
              selectedFolder={selectedFolder}
              selectFolder={selectFolder}
              selectedId={selectedId}
              addFolder={addFolder}
              stack={stack}
              goBack={goBack}
              goForward={goForward}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  folders: state.app.folders,
  selectedFolder: state.app.selectedFolder,
  selectedId: state.app.selectedId,
  stack: state.app.stack,
});

const mapDispatchToProps = dispatch => ({
  addFolder: (path, value) => dispatch(addFolder(path, value)),
  addRootFolder: folder => dispatch(addRootFolder(folder)),
  selectFolder: (folder, id) => dispatch(selectFolder(folder, id)),
  addPathToStack: present => dispatch(addPathToStack(present)),
  updateFolders: folders => dispatch(updateFolders(folders)),
  goBack: () => dispatch(goBack()),
  goForward: () => dispatch(goForward()),
  autoExpandFolders: path => dispatch(autoExpandFolders(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

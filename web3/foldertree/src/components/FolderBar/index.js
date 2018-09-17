import React, { Component } from 'react';

import helpers from '../../config/helpers';

export default class FolderBar extends Component {
  state = {
    open: this.props.expanded
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expanded !== nextProps.expanded) {
      this.setState({ open: nextProps.expanded });
    }
  }

  openFolder = bool => this.setState({ open: bool });

  render() {
    const { open } = this.state;
    const { folder, selectFolder, title, expandable, addPathToStack, path, allPaths } = this.props;
    return (
      <div className="pt3 pl3 pr3">
        <div
          onClick={() => {
            expandable && this.openFolder(open ? false : true);
            selectFolder(folder, folder.id);
            addPathToStack(path);
          }}
          className="flex"
        >
          {!open ? (
            <div>
              {expandable && <i className="fas fa-caret-right mr2" />}
              <i className="fas fa-folder" />
            </div>
          ) : (
            <div>
              {expandable && <i className="fas fa-sort-down mr2" />}
              <i className="fas fa-folder-open" />
            </div>
          )}
          <div className="ml2">
            {title}
          </div>
        </div>
        {open && Object.keys(folder.children).length !== 0 && (
          <ul style={{ margin: 0 }}>
            {Object.keys(folder.children).map((val, index) => {
              return (
              <FolderBar
                expandable={expandable}
                key={folder.children[val].id}
                selectFolder={selectFolder}
                addPathToStack={addPathToStack}
                allPaths={allPaths}
                path={helpers.getPath(allPaths, folder.children[val].id).replace('/~1', '').replace(/\/id/g, '')}
                folder={folder.children[val]}
                title={folder.children[val].name}
                expanded={folder.children[val].isExpanded}
              />
            )})}
          </ul>
        )}
      </div>
    )
  }
};

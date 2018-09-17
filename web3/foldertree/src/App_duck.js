import randomId from 'random-id';
import _ from 'lodash';

import helpers from './config/helpers';

const ADD_FOLDER = 'APP_ADD_FOLDER';
const ADD_ROOT_FOLDER = 'APP_ADD_ROOT_FOLDER';
const SELECT_FOLDER = 'APP_SELECT_FOLDER';
const GO_BACK = 'APP_GO_BACK';
const GO_FORWORD = 'APP_GO_FORWORD';
const PATH_CHANGE = 'APP_PATH_CHANGE';
const FOLDERS_UPDATE = 'APP_FOLDERS_UPDATE';
const AUTO_EXPAND = 'APP_AUTO_EXPAND';

const initialFolderState = {
  root: {
    id: '1a',
    name: 'root',
    children: {},
    isExpanded: true
  }
}

const appReducer = (
  state = {
    folders: {
      ...initialFolderState
    },
    stack: {
      past: [],
      present: '/root',
      future: []
    },
    selectedFolder: {...initialFolderState.children},
    selectedId: '1a'
  }, action
) => {
  const { folders, stack } = state;
  const { past, present, future } = stack;
  switch (action.type) {
    case ADD_FOLDER:
      const path = `${action.path}.children.${action.name}`;
      const newFolder = {
        name: action.name,
        id: randomId(4),
        children: {},
        isExpanded: false
      }
      helpers.set(folders, path, newFolder);
      return Object.assign({}, state, {
        folders: {
          ...folders
        }
      });
    case ADD_ROOT_FOLDER:
      folders[action.folder] = {
        name: action.folder,
        id: randomId(4),
        children: {},
        isExpanded: false
      };
      return Object.assign({}, state, {
        folders,
      });
    case SELECT_FOLDER:
      return Object.assign({}, state, {
        selectedFolder: action.folder,
        selectedId: action.selectedId
      });
    case GO_BACK:
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return Object.assign({}, state, {
        stack: {
          past: newPast,
          present: previous,
          future: [present, ...future]
        }
      });
    case GO_FORWORD:
      const next = future[0];
      const newFuture = future.slice(1);
      return Object.assign({}, state, {
        stack: {
          past: [...past, present],
          present: next,
          future: newFuture
        }
      });
    case PATH_CHANGE:
      if (action.present === state.stack.present) {
        return state;
      }
      return Object.assign({}, state, {
        stack: {
          past: [...past, state.stack.present],
          present: action.present,
          future: [],
        },
      });
    case FOLDERS_UPDATE:
      return Object.assign({}, state, {
        folders: action.folders
      });
    case AUTO_EXPAND:
      return Object.assign({}, state, {
        folders: action.folders
      })
    default:
      return state;
  }
};

export const addFolder = (path, name) => ({
  type: ADD_FOLDER,
  path, name
});

export const addRootFolder = folder => ({
  type: ADD_ROOT_FOLDER,
  folder
});

export const goBack = () => ({
  type: GO_BACK
});

export const goForward = () => ({ type: GO_FORWORD });

export const addPathToStack = present => ({
  type: PATH_CHANGE,
  present,
});

export const updateFolders = folders => ({
  type: FOLDERS_UPDATE,
  folders
})

export const autoExpandFolders = path => (dispatch, getState) => {
  const { folders } = getState().app;
  const selectedFolder = _.get(folders, helpers.removeFirstSlash(path).replace(/\//g, '.'));
  dispatch(selectFolder(selectedFolder, selectedFolder.id))
  const clone = _.clone(folders, true);
  path = path.replace(/children\//g, 'children.');
  const arr = path.split('/');
  let newPath = '';
  arr.shift();
  arr.map(prop => {
    newPath += `${newPath.length ? '.' : ''}${prop}`;
    helpers.set(clone, `${newPath}.isExpanded`, true);
    return prop;
  })
  dispatch({ type: AUTO_EXPAND, folders: clone });
}

export const selectFolder = (folder, id) => ({
  type: SELECT_FOLDER,
  folder: folder.children,
  selectedId: id
});

export default appReducer;

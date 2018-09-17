import _ from 'lodash';

const helpers = {
  replaceAll: function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  },
  getPath: (paths, id) => {
    const path = _.findKey(paths, function(item) { return typeof item !== 'boolean' && item.indexOf(id) !== -1; });
    return path;
  },
  set: (obj, path, value) => {
    _.set(obj, path, value);
  },
  removeFirstSlash: str => {
    while(str.charAt(0) === '/') {
      str = str.substr(1);
    }
    return str;
  }
}

export default helpers;

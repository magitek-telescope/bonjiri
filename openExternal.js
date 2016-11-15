module.exports = function(e){
  const {shell} = require('electron');
  shell.openExternal(e.url)
};

module.exports = (e)=>{
  const {shell} = require("electron");
  shell.openExternal(e.url)
};

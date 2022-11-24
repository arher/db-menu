const debug = require('debug');
const path = require('path');

function _getCallerFile() {
  var filename;

  var _pst = Error.prepareStackTrace
  Error.prepareStackTrace = function (err, stack) { return stack; };
  try {
      var err = new Error();
      var callerfile;
      var currentfile;

      currentfile = err.stack.shift().getFileName();

      while (err.stack.length) {
          callerfile = err.stack.shift().getFileName();

          if(currentfile !== callerfile) {
              filename = callerfile;
              break;
          }
      }
  } catch (err) {}
  Error.prepareStackTrace = _pst;

  const baseName = path
    .relative(path.dirname(__dirname), filename)
    .replace(/(\.[^/.]+|\/index\.js)$/, "");

  return baseName;
}


module.exports = {
  getLogger: function() {
    const name = _getCallerFile();
    const base = debug(name);
    base.error = debug(`error:${name}`);
    base.info = debug(`info:${name}`);
    base.warn = base.warning = debug(`warn:${name}`);
    base.debug = debug(`debug:${name}`);
    return base;   
  }  
};

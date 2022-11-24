const fs     = require("fs");
const path   = require("path");
const logger = require('../../utils/logger').getLogger();

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports =  function(app, models){
  //cargar las rutas...
  fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf(".js") > 0) && (file.indexOf(".js")==file.length-3) && (file !== "index.js"))
  .forEach((filename) => {
    logger.debug(`loading route: ${filename}`);
    try{
      let ruta = require(path.join(__dirname, filename))(app, models);
      const name = capitalize(filename.substr(0, filename.lastIndexOf('.'))); //fixed?
      module.exports[name]=ruta;
    }catch(e){
      logger.warn(`${filename} is an invalid route`);
      logger.warn(e);
    }
  });
};
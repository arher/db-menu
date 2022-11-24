/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const logger = require('../../utils/logger').getLogger();
const environment = process.env.NODE_ENV || 'development';
const dbConfig = require('../config')[environment];


const basename = path.basename(__filename);
logger.info(`url: ${dbConfig.url}`);
const sequelize = new Sequelize(dbConfig.url, dbConfig);

const db = {};
fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    logger.debug(`Associating model ${modelName}`);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
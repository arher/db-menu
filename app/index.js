const http = require('http');
const express = require('express');
const finale = require('finale-rest');
const bodyParser = require('body-parser');
const models = require('../db/models');
const routes = require('./routes');
const logger = require('../utils/logger').getLogger();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server = http.createServer(app);

// Initialize finale
finale.initialize({
  app: app,
  sequelize: models.sequelize
});
Object.keys(models).forEach((modelName) => {
  if (models[modelName].createResource) {
    logger.debug(`Setting Resource model ${modelName}`);
    models[modelName].createResource(finale, server, models);
  }
});

routes(app, models);

module.exports = {
  app: server
};
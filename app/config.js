require('dotenv').config();

const config = {};

config.env = process.env.NODE_ENV || 'development';

config.appName = 'dbTest';
config.port = process.env.PORT || 9999;

module.exports = config;
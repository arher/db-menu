require('dotenv').config();

const path = require('path');

let dbUrl = process.env.DATABASE_URL ||
    'postgres://postgres:mypassword@localhost:5432';

if (dbUrl.slice(-1) === '/') {
    dbUrl = dbUrl.slice(0, -1);
}

const dbName = process.env.DATABASE_NAME || 'system';

module.exports = {
  dataBase: dbName,
  development: {
    url: `${dbUrl}/${dbName}`,
  },
  test: {
    url: 'sqlite::memory',
  },
  production: {
    url: `${dbUrl}/${dbName}`,
  },
};

const fs = require('fs');
require('dotenv').config();

const config = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_NAME,
    host: process.env.DEV_HOST,
    port: process.env.DEV_PORT,
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'TEST_DB_URL',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_NAME,
    host: process.env.PROD_HOST,
    port: process.env.PROD_PORT,
    dialect: 'postgres',
  },
};
//comment

fs.writeFileSync('config/config.json', JSON.stringify(config, null, 2));

console.log('Configuration file updated.');

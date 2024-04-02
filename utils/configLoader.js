require('dotenv').config();

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const configFile = path.resolve(__dirname,  "../config/config.json");
let config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))[env];

// Replace variables in config.json with environment variables from .env
config = Object.keys(config).reduce((acc, key) => {
  if (typeof config[key] === 'string') {
    acc[key] = config[key].replace(/\${(\w+)}/g, (match, variable) => {
      return process.env[variable] || match;
    });
  } else {
    acc[key] = config[key];
  }
  return acc;
}, {});

console.log(config);

module.exports = config;
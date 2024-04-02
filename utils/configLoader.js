require('dotenv').config();

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const configFile = path.resolve(__dirname, '../config/config.json');
let config = {};

try {
  const rawConfig = fs.readFileSync(configFile, 'utf-8');
  config = JSON.parse(rawConfig)[env];
} catch (err) {
  console.error('Error loading config:', err.message);
  process.exit(1); // Exit the process if config loading fails
}

if (!config) {
  console.error('Config is null or undefined.');
  process.exit(1); // Exit the process if config is null or undefined
}

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

console.log('Final config:', config);

module.exports = config;

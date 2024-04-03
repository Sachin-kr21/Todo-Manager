module.exports = {
  apps: [
    {
      name: 'app',
      script: 'index.js',
      // instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        // PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        // PORT: 5000,
      },
      error_file: 'storage/log/error.log',
      log_file: "storage/log/log.log",
      time: true,
    },
  ],
};

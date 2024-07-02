module.exports = {
    apps: [
      {
        name: 'shankhanaad-nodejs-backend',
        script: 'index.js',
        watch: true,
        ignore_watch: [
          'node_modules',
          'upload/photos', // Ignore changes in this directory
          'upload/pdf' // Ignore changes in this directory (if applicable)
        ],
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        }
      }
    ]
  };
  
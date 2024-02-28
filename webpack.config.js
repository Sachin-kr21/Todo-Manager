const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-compiled-loader',
            options: {
              htmlmin: true, // Optional: enable HTML minification
              htmlminOptions: {
                removeComments: true
              }
            }
          }
        ]
      }
    ]
  }
};

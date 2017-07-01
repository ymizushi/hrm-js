const path = require('path');

module.exports = {
    entry: './src/hrm.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hrm.bundle.js'
    },
    devServer: {
        contentBase: 'dist',
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

const path = require('path');

module.exports = {
    entry: './src/js/app.js',

    output: {
        path: path.resolve(__dirname, './app'),
        filename: 'app.js'
    },

    devtool: "source-map",
    watch: true,

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {presets: ['es2015']},
            },
            {
                test: /\.pug/,
                loader: 'pug-loader'
            }
        ]
    }

};
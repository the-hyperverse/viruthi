const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development', //'production'
    entry: {
        main: './src/main.ts',
        preload: './src/preload.ts'
    },
    target: 'node',
    externals: [webpackNodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js', // Output files for both main and preload
        path: path.resolve(__dirname, 'dist'),
    },
    node: {
        __dirname: false,
    },
};
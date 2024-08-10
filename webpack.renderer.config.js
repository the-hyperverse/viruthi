const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //'production'
    entry: './src/renderer.ts', // Entry point for the renderer process
    target: 'web', // Targeting browser environment
    devtool: 'source-map', // instead of 'eval-source-map'
    module: {
        rules: [
            {
                test: /\.ts$/, // Apply to TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'renderer.js', // Output file
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template HTML file
            filename: 'index.html',
        }),
    ],
};

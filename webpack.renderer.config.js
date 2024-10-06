const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development', //'development' or 'production'
    entry: './src/renderer.tsx', // Entry point for the renderer process
    target: 'web', // Targeting browser environment
    devtool: 'source-map', // instead of 'eval-source-map'
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Apply to both .ts and .tsx files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: 'file-loader', // Handling static assets like images
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src'), // Add this line for the alias
        },
    },
    output: {
        filename: 'renderer.js', // Output file
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template HTML file
            filename: 'index.html',
            inject: 'body', // Inject scripts at the bottom of the body,
            templateParameters: {
                nonce: '' // We will set this dynamically
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/style.css',
        }),
    ],
};
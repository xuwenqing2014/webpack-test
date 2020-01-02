const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.[hash:10].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        port: 3001,
        contentBase: path.resolve(__dirname, './dist'),
        proxy: {
            '/api': {
                target: 'http://localhost:9001'
            }
        }
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.js$/, use: [{ loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }] },
            { test: /\.(png|jpeg|jpg|gif|svg)$/, use: ['file-loader'] },
            {test: /\.vue$/, use: ['vue-loader']}
        ]
    },
    plugins: [
        new HtmlWepackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "common.css"
        }),
        new VueLoaderPlugin()
    ]
}
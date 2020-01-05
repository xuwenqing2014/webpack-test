const path = require('path');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    // devtool: 'source-map',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        filename: 'bundle.[hash:10].js',
        path: path.resolve(__dirname, './dist')
    },
    devServer: {
        port: 3001,
        contentBase: path.resolve(__dirname, './dist'), // 开服务器的根路径
        hot: true, // 开启热更新
        open: true, // 自动打开浏览器
        proxy: { // 设置本地服务器代理解决跨域
            '/api': { // 标识
                target: 'http://localhost:9001' // 代理目标
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.js$/, use: [
                    {
                        loader: 'babel-loader', options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    }],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpeg|jpg|gif|svg)$/, use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash:6].[ext]'
                            }
                        }
                    }
                }],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/, use: ['cache-loader', 'thread-loader', {
                    loader: 'vue-loader',
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false
                        }
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['dist/**/*', '!dist/vendors/**/*']
        }),
        new HtmlWepackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash:6].css"
        }),
        new VueLoaderPlugin(),
        new OptimizeCssAssetsWebpackPlugin(),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, './dist/*.html')),
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./dll/manifest.json')
        }),
        // 热替换，需要搭配devServer的hot:true热更新去使用
        new webpack.HotModuleReplacementPlugin()
    ]
}

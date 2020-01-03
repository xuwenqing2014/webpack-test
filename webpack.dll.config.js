const webpack = require('webpack');
const path = require('path');

const venders = [
    'vue'
];

module.exports = {
    output: {
        path: path.resolve(__dirname + '/dist/venders'),
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        venders: venders
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname + '/dll/manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
    ],
};
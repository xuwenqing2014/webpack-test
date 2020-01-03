const webpack = require('webpack');
const path = require('path');

const vendors = [
    'vue'
];

module.exports = {
    output: {
        path: path.resolve(__dirname + '/dll'),
        filename: '[name].js',
        library: '[name]'
    },
    entry: {
        venders: vendors
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname + '/dll/manifest.json'),
            name: '[name]',
            context: __dirname,
        }),
    ],
};
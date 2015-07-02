'use strict';
var webpack = require('webpack');
var path = require('path');
var port = process.env.HOT_LOAD_PORT || 8888;

// module.exports = {
//     entry: {
//         'static': './src/index.js',
//         'dynamic': './src/dynamic.js'
//     },
//
//     output: {
//         filename: '[name].js',
//         path: 'dist'
//     },
//
//     module: {
//         loaders: [
//             { test: /\.js$/, loader: 'babel-loader?stage=0', exclude: /node_modules/ },
//             { test: /\.md$/, loader: 'html-loader!markdown-loader' }
//         ]
//     },
//
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin('common.js'),
// 		new webpack.ProvidePlugin({
// 			React: 'react/addons'
// 		})
//     ]
// };

var config = {
    cache: true,
    devtool: 'eval',
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'client.js',
        publicPath: 'http://localhost:' + port + '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?stage=0'] }
        ]
    }
};

module.exports = config;

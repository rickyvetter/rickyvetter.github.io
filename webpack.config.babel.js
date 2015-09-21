export default {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader?{"stage":0,"plugins":["object-assign"]}'
                ]
            }
        ]
    }
};

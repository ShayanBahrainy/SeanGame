const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: 'development', // Use 'production' for production builds
    devtool: 'inline-source-map',
    optimization: {
        minimize: false,
        usedExports: true,
    },
    entry: {
        background: path.join(__dirname, 'src', 'background.js'),
        game: path.join(__dirname, 'src', 'game.js'),
        inventory: path.join(__dirname, 'src', 'inventory.js'),
        multiplayer: path.join(__dirname, 'src', 'multiplayer.js'),
        shop: path.join(__dirname, 'src', 'shop.js'),
        messagereceiver: path.join(__dirname, 'src', 'messagereceiver.js'),
        content_start_mellowtel: path.join(__dirname, 'src', 'content_start_mellowtel.js'),
        burke: path.join(__dirname, 'src', 'burke.js'),
        pascoli: path.join(__dirname, 'src', 'pascoli.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: '' } // Copy all assets and the manifest.json from 'public' to 'dist'
            ],
        }),
    ]
};
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'



let config = {
    entry: ['./src/index.js', './src/style/css.scss'],
    output:{
        path : path.resolve('./public')
    },
    resolve: {
        alias:{
            "@" : path.resolve("./src/"),
            "@css" : path.resolve("./src/style/"),
            "@image": path.resolve("./src/images/")
        }
    },
    devServer:{
        static:{
            directory: path.resolve("./public")
        },
        client:{
            logging: 'warn',
            overlay : true
        },
        port: 8080,
    },
    module : {
        rules:[
            {
                test : /\.js$/,
                exclude: /node_modules/,
                use:['babel-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({}),
        new ESLintPlugin({}),
        
    ]
}

if (env === 'production'){
    config.watch = false
    config.plugins.push(
        new BundleAnalyzerPlugin({
            openAnalyzer : false,
            defaultSizes :'gzip',
            analyzerMode : 'static'
        })
    )
}
else{
    config.plugins.push(
        new BundleAnalyzerPlugin({
            openAnalyzer : false,
            defaultSizes :'gzip'
        })
    )
}

module.exports = config;
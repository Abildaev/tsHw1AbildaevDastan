const {merge} = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const commonConfig = require('./webpack.config.common')


module.exports = merge(commonConfig,{
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [new ESLintPlugin({
        extensions: ['js'],
        files: 'src/**/*.js',
    })],
    devServer: {
        port: 3009,
        hot: true,
        open: true
    },

})






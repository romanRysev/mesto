const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {
    entry: { main: './src/scripts/script.js' },
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
    	     {
                test: /\.css$/,
                use:  [MiniCssExtractPlugin.loader, 'css-loader']
             },
		{
 		   test: /\.(eot|ttf|woff|woff2)$/,
		   loader: 'file-loader?name=./vendor/[name].[ext]'
		},
{
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
                'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
                {
                        loader: 'image-webpack-loader',
                        options: {}
                },
        ]
 }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new HtmlWebpackPlugin({ // настроили плагин
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
    new WebpackMd5Hash()
    ]
};
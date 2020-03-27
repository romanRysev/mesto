const webpack = require('webpack')
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
})

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
                use:  [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
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
	new OptimizeCssAssetsPlugin({
                        assetNameRegExp: /\.css$/g,
                        cssProcessor: require('cssnano'),
                        cssProcessorPluginOptions: {
                                preset: ['default'],
                        },
                        canPrint: true
                }),
        new HtmlWebpackPlugin({ // настроили плагин
            inject: false,
            template: './src/index.html',
            filename: 'index.html'
        }),
    new WebpackMd5Hash()
    ]
};
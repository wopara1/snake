'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
    devtool: 'eval-source-map',
    devServer: { },
    entry: path.join(__dirname, 'app/src/renderer/main.js'),
    externals: Object.keys(pkg.dependencies || {}),
    module: {
        rules: [
            {
                test: /\.s[a|c]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.join(__dirname, 'app/src/renderer/styles/style.scss')
                        }
                    }]
            },
            {
                test: /\.html$/,
                use: 'vue-html-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [path.resolve(__dirname, 'app/src/renderer')],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.node$/,
                use: {
                    loader: 'node-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader',
                            {
                                loader: 'sass-resources-loader',
                                options: {
                                    resources: path.join(__dirname, 'app/src/renderer/styles/style.scss')
                                }
                            }
                        ],
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'imgs/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.ejs',
            appModules: process.env.NODE_ENV !== 'production'
                ? path.resolve(__dirname, 'app/node_modules')
                : false,
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    output: {
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'app/dist')
    },
    resolve: {
        alias: {
            'components': path.join(__dirname, 'app/src/renderer/components'),
            'renderer': path.join(__dirname, 'app/src/renderer')
        },
        extensions: ['.js', '.vue', '.json', '.scss', '.node'],
        modules: [
            path.join(__dirname, 'app/node_modules'),
            path.join(__dirname, 'node_modules')
        ]
    },
    target: 'electron-renderer'
}

if (process.env.NODE_ENV !== 'production') {
    /**
     * Apply ESLint
     */
    if (settings.eslint) {
        rendererConfig.module.rules.push(
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                }
            }
        )
    }
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
    rendererConfig.devtool = ''

    rendererConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}

module.exports = rendererConfig  
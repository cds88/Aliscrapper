
const path = require('path');




module.exports = {
    entry: {
        Index: './root/frontend/src/Index.tsx'
    },
    watch: true,
    devtool :false,
    //'source-map',
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname, './root/frontend/static/frontend/')
    },
    cache: true,
    mode: 'development',


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
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: {
                        loader: "ts-loader"
                }
            },
             {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|eot|ttf|woff|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }


        ]



    },
    resolve: {
        extensions: [
            '.tsx', '.ts', '.js'
        ]
    }

}

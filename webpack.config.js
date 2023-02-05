const path = require('path');
const HtmlWebpack = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    plugins:[
        new HtmlWebpack({
            template:path.resolve(__dirname,'./index.html')
        })
    ],
    module:{
        rules:[
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    devServer:{
        port:8080,
        hot: true,
        allowedHosts: 'all',
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        client: {
            progress: true,
        },
    }
}

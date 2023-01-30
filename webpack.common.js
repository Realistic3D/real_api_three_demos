const path = require('path')

module.exports = {
    entry: './src/main.js',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './'),
    },
}

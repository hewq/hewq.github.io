const path = require('path');

module.exports = {
    publicPath: '/resume/',
    outputDir: '../resume',
    configureWebpack: {
        resolve: {
            alias: {
                '@images': path.resolve(__dirname, './src/assets/images'),
                '@styles': path.resolve(__dirname, './src/assets/styles'),
                '@components': path.resolve(__dirname, './src/components'),
                '@views': path.resolve(__dirname, './src/views'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@data': path.resolve(__dirname, './src/data')
            }
        }
    }
};
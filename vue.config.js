const {defineConfig} = require('@vue/cli-service')
const {WebpackManifestPlugin} = require("webpack-manifest-plugin")

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: 'src/main.js',
    },

    configureWebpack: {
        plugins: [
            new WebpackManifestPlugin({fileName: 'manifest.bundle.json'})
        ],

        entry: {
            insertion: './src/insertion.js',
            background: './src/background.js',
        },

        output: {
            filename: '[name].js',
            chunkFilename: '[name].js'
        },

        devtool: 'cheap-module-source-map',
    },
})

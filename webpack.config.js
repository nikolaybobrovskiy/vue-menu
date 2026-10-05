const { VueLoaderPlugin } = require('vue-loader')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    entry: [
        './src/index.ts',
    ],
    output: {
        path: `${__dirname}/lib`,
        filename: 'index.js',
        clean: true,
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.scss/, use: ["style-loader", "css-loader", { loader: "sass-loader", options: { api: "modern" } },] },
            {
                test: /\.ts$/, loader: 'ts-loader', options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            },
        ],
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new VueLoaderPlugin(),
    ],
}
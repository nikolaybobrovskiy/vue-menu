const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: [
        "file-loader?name=example.html!./src/example.html",
        "./src/index.ts",
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'vue-menu-standalone.js',
        library: { name: 'VueMenu', type: 'window' },
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true } },
            { test: /\.scss/, use: ["style-loader", "css-loader", { loader: "sass-loader", options: { api: "modern" } }] },
        ],
    },
    externals: {
        vue: 'Vue'
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
}
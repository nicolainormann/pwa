const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.join(__dirname, "dist/"),
        filename: "js/main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/main.css"
        }),
        new CopyWebpackPlugin([{
                from: "./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js",
                to: "js/3rdparty"
            },
            {
                from: "./node_modules/@webcomponents/webcomponentsjs/bundles",
                to: "js/3rdparty/bundles"
            },
            {
                from: "./src/assets",
                to: "assets"
            },
            "./src/sw.js"
        ]),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ["js/3rdparty/webcomponents-loader.js"],
            append: false
        })
    ]
};
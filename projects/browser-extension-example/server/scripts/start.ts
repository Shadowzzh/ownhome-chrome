import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import cors from "cors";

import webpackConfig from "../webpackPage.dev";
import webpackContent from "../webpackContent.dev";
import { PORT } from "../constant";
import { HRM_PATH } from "../entry";

const app = express();

const compiler = webpack(webpackConfig);
const contentCompiler = webpack(webpackContent);

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
const getWebpackDevCommonConfig = Object.freeze({
  publicPath: webpackConfig.output?.publicPath,
  stats: "minimal",
  writeToDisk: true,
});

app.use(
  cors(),
  webpackDevMiddleware(contentCompiler, getWebpackDevCommonConfig),
  webpackDevMiddleware(compiler, getWebpackDevCommonConfig),
  webpackHotMiddleware(compiler, { path: HRM_PATH })
);

// 将文件 serve 到 port 3000。
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!\n`);
});

import type { Configuration } from "webpack";
import { HotModuleReplacementPlugin } from "webpack";
import { merge } from "webpack-merge";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { devPageEntry } from "./entry";
import webpackCommonConfig from "./webpackPage.common";

const webpackConfig: Configuration = {
  mode: "development",

  entry: devPageEntry,

  devtool: false,

  cache: {
    type: "filesystem",
  },

  plugins: [
    // 热更新模块
    new HotModuleReplacementPlugin(),

    // React热更新模块
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /contentScript/],
      include: [/popup/, /options/],
      overlay: {
        sockIntegration: "whm",
      },
    }),
  ],
};

export default merge(webpackCommonConfig, webpackConfig);

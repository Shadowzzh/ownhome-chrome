import type { Configuration } from "webpack";
import { BUILD_PATH } from "./constant";
import { devScriptEntry } from "./entry";

const webpackContentConfig: Configuration = {
  mode: "development",

  entry: devScriptEntry,

  devtool: false,

  target: "web",

  module: {
    rules: [
      {
        test: /\.([cm]?ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
    filename: "js/[name].js",
    path: BUILD_PATH,
    publicPath: "/",
  },
};

export default webpackContentConfig;

require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-typescript"],
    extensions: [".js", ".ts"],
  });
  require("@babel/polyfill");
  require("./index.js");
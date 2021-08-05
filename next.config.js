const path = require("path");
var pjson = require('./package.json');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    versionNumber: pjson.version,
  },
};

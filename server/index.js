const path = require("path");
const https = require("https");
const rootCas = require("ssl-root-cas").create();

rootCas.addFile(path.resolve(__dirname, "intermediate.pem"));
https.globalAgent.options.ca = rootCas;

// ignore `.scss` imports
require("ignore-styles");

// transpile imports on the fly
require("@babel/register")({
  configFile: path.resolve(__dirname, "../babel.config.js"),
});

// import express server
require("./express.js");

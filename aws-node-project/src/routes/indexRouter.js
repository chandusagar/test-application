var express = require("express");
const routes = express.Router({ mergeParams: true });
var AWS = require("aws-sdk");

routes.post("/", async (req, res) => {});

module.exports = routes;

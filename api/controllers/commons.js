/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let commons = {};

//var fs = require("fs");
let yaml = require("js-yaml");
commons.server = require("../../config/server.yaml").servers.test;
console.log(`Using ${JSON.stringify(commons.server)}.`);

/* Admin */
commons.adminAuthObj = {
    url: commons.server.url,
    token: commons.server.admin_token
};

/* Test Robot */
commons.authObj = {
  url: commons.server.url,
  token: commons.server.test_token
};

commons.unauthObj = {
  url: commons.server.url,
  token: 'Fuck'
};

module.exports = commons;
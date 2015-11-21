/**
 * Created by htc on 11/8/15.
 */

"use strict";

let gitlab = require('gitlab');
let commons = require('./commons');


let apibase = {};

let parseCookies = (cookie) => {
  var list = {},
      rc = cookie;

  rc && rc.split(';').forEach(function( cookie ) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
};

apibase.apiwrap = (func) => {
  return (req, res) => {
    let cookies = parseCookies(req.swagger.params.Cookie.value);
    let userGitlab = gitlab({
      url: commons.server.url,
      token: cookies.token
    });
    return func(req, res, userGitlab);
  }
};

module.exports = apibase;
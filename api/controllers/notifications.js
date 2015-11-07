/**
 * Created by ZhongyiTong on 11/8/15.
 */
"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);

let notifications = {};



module.exports = notifications;

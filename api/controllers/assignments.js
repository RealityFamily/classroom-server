/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);

let assignments = {};

assignments.listAll = (req, res) => {
  return new Promise((resolve, reject) => {
      gitlab.projects.all((projects) => {
        resolve(projects);
      });
    }
  ).then((projects) => {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.assignmentsFilter(projects);
    console.log(filterFactory);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

module.exports = assignments;
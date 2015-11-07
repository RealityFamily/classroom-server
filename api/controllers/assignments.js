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
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

assignments.get = (req, res) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
    gitlab.projects.show(id, (project) => {
        resolve(project);
      });
    }
  ).then((project) => {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.assignmentFilter(project);
    console.log(filterFactory);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

module.exports = assignments;
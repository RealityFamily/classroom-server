/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let apiwrap = require('./apibase').apiwrap;

let assignments = {};

assignments.listAll = apiwrap((req, res, gitlab) => {
  return new Promise((resolve, reject) => {
      gitlab.projects.all((projects) => {
        resolve(projects);
      });
    }
  ).then((projects) => {
    let filterFactory = require('../filters/filters');
    let val = filterFactory.assignmentsFilter(projects, true, true);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});

assignments.get = apiwrap((req, res, gitlab) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.projects.show(id, (project) => {
        resolve(project);
      });
    }
  ).then((project) => {
    let filterFactory = require('../filters/filters');
    let val = filterFactory.assignmentFilter(project);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});

module.exports = assignments;
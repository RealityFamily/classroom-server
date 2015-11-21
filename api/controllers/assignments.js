/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let apiwrap = require('./apibase').apiwrap;

let assignments = {};

assignments.listAll = apiwrap((req, res, gitlab) => {
  return new Promise((resolve, reject) => {
      gitlab.projects.all((projects) => {
        let assignments_ = require('../filters/assignments').parseAssignments(projects, true, true);
        resolve(assignments_);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});

assignments.get = apiwrap((req, res, gitlab) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.projects.show(id, (project) => {
        let assignment_ = require('../filters/assignments').parseAssignment(project);
        resolve(assignment_);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});

assignments.remove = apiwrap((req, res, gitlab) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.projects.remove(id, (result) => {
        resolve(result);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
});


module.exports = assignments;
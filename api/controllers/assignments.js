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
        //let classes = [];
        //for (let project of projects) {
        //  if (project.name.indexOf('-') != -1) {
        //    classes.push(project);
        //  }
        //}
        resolve(projects);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

module.exports = assignments;
"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);

let classes = {};

classes.listAll = (req, res) => {
  new Promise((resolve, reject) => {
      gitlab.groups.all((groups) => {
        let classes = [];
        for (let group of groups) {
          if (group.name.indexOf('-') != -1) {
            classes.push(group);
          }
        }
        resolve(classes);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.get = (req, res) => {
  let id = req.swagger.params.id.value;
  new Promise((resolve, reject) => {
    gitlab.groups.show(id, function (group) {
      resolve(group);
      });
    }
  ).then((val) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.listAssignments = (req, res) => {
  let id = req.swagger.params.id.value;
  new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (projects) {
        let assignments = [];
        for (let project of projects) {

        }
        resolve(projects);
      });
    }
  ).then((val)=> {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.listMaterials = (req, res) => {
  let id = req.swagger.params.id.value;
  new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (group) {
        if (group.name == 'syllabus')
          resolve(group);
      });
    }
  ).then((val)=> {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

module.exports = classes;

/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);

let classes = {};

classes.listAll = (req, res) => {
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
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
  return new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (projects) {
        let assignments = [];
        for (let project of projects) {
          if (group.name != 'syllabus') {
            resolve(group);
          }
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
  return new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (projects) {
        for (let project of projects) {
          if (project.name == 'syllabus') {
            console.log(project.id);
            resolve(project);
          }
        }
      });
    }
  ).then((syllabus)=> {
    return new Promise((resolve, reject) => {
      gitlab.projects.repository.listTree(syllabus.id, function (list) {
        console.log(list);
        resolve(list);
      });
    });
  }).then((list)=> {
    let val = [];
    for (let item of list) {
      if (item.name.indexOf('.') != 0 && item.name.indexOf("README.md") == -1) {
        val.push(item);
      }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.listMembers = (req, res) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.groups.listMembers(id, function (members) {
        resolve(members);
      });
    }
  ).then((val)=> {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};


module.exports = classes;

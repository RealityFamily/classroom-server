/**
 * Created by ZhongyiTong on 11/7/15.
 */
"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);
let apiwrap = require('./apibase').apiwrap;

let classes = {};

classes.listAll = apiwrap((req, res) => {
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
});

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
          if (project.name != 'syllabus') {
            assignments.push(project);
          }
        }
        resolve(assignments);
      });
    }
  ).then((assignments)=> {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.assignmentsFilter(assignments);
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
            resolve(project);
          }
        }
      });
    }
  ).then((syllabus)=> {
    return new Promise((resolve, reject) => {
      gitlab.projects.repository.listTree(syllabus.id, function (list) {
        resolve(list);
      });
    });
  }).then((materials)=> {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.materialsFilter(materials);
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
  ).then((members)=> {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.membersFilter(members);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.listNotifications = (req, res) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (projects) {
        for (let project of projects) {
          if (project.name == 'syllabus') {
            resolve(project);
          }
        }
      });
    }
  ).then((syllabus)=> {
    return new Promise((resolve, reject) => {
        gitlab.projects.issues.list(syllabus.id, function (issues) {
          resolve(issues);
        });
      }
    )
  }).then((issues)=> {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.notificationsFilter(issues);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

classes.listActivities = (req, res) => {
  let id = req.swagger.params.id.value;
  return new Promise((resolve, reject) => {
      gitlab.groups.listProjects(id, function (projects) {
        for (let project of projects) {
          if (project.name == 'syllabus') {
            let activitiesObj = {'syllabus': project, 'assignments': projects};
            resolve(activitiesObj);
          }
        }
      });
    }
  ).then((activitiesObj)=> {
    return new Promise((resolve, reject) => {
        gitlab.projects.issues.list(activitiesObj.syllabus.id, function (issues) {
          activitiesObj.notifications = issues;
          resolve(activitiesObj);
        });
      }
    )
  }).then((activitiesObj)=> {
    let filterFactory = require('../helpers/filters');
    let val = filterFactory.activitiesFilter(activitiesObj);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(val));
    res.end();
  });
};

module.exports = classes;

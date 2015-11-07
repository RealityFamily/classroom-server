"use strict";

let commons = require('./commons');
let gitlab = require('gitlab')(commons.authObj);

let classes = {};

classes.listAll = () => {
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
  );
};

classes.get = (id) => {
  return new Promise((resolve, reject) => {
      gitlab.groups.show(id, function (group) {
        console.log(group);
        resolve(group);
      });
    }
  );
};

module.exports = classes;

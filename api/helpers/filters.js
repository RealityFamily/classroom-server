/**
 * Created by ZhongyiTong on 11/7/15.
 */

"use strict";

let filterFactory = {};

filterFactory.assignmentsFilter = (projects) => {
  let results = [];
  for (let project of projects) {
    let ddl = project.description.match(/%ddl:(\S*)%/);
    if (!project["forked_from_project"] || !ddl) {
      continue;
    }
    console.log(ddl);
    project.deadline = new Date(ddl[1]);
    project.daysLeft = Math.floor((project.deadline - Date.now()) / 1000 / 24 / 3600);

    results.push(project);
  }
  results.sort((a, b)=> {
    return a.daysLeft - b.daysLeft;
  });
  return results;
};

module.exports = filterFactory;
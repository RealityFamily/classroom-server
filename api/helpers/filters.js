/**
 * Created by ZhongyiTong on 11/7/15.
 */

"use strict";

let filterFactory = {};

filterFactory.assignmentsFilter = (projects) => {
  let results = [];
  for (let project of projects) {
    let result = filterFactory.assignmentFilter(project);
    if (result) {
      results.push(project);
    }
  }
  results.sort((a, b)=> {
    return a.daysLeft - b.daysLeft;
  });
  return results;
};

filterFactory.assignmentFilter = (project) => {
  let ddl = project.description.match(/%ddl:(\S*)%/);
  if (!project["forked_from_project"] || !ddl) {
    return null;
  }
  project.deadline = new Date(ddl[1]);
  project.daysLeft = Math.floor((project.deadline - Date.now()) / 1000 / 24 / 3600);
  project.class = project["forked_from_project"]["name_with_namespace"].match(/^(\S+)/)[1];
  return project;
};

filterFactory.memberFilter = (member) => {
  if (member.access_level == 20) {
    member.role = 'student';
  } else if (member.access_level > 20) {
    member.role = 'teacher';
  } else {
    member.role = 'others';
  }

  delete member.access_level;

  return member;
};

filterFactory.membersFilter = (members) => {
  for (let member of members) {
    member = filterFactory.memberFilter(member);
  }
  return members;
};

filterFactory.notificationFilter = (notification) => {
  if (notification.state == 'closed') {
    return null;
  }
  delete notification.assignee;
  return notification;
};

filterFactory.notificationsFilter = (notifications) => {
  let results = [];
  for (let notification of notifications) {
    let result = filterFactory.notificationFilter(notification);
    if (result) {
      results.push(result);
    }
  }
  return results;
};


module.exports = filterFactory;
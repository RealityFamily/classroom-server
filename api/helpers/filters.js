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

filterFactory.assignmentFilter = (project, strictMode) => {
  let ddl = project.description.match(/%ddl:(\S*)%/);
  if (!ddl || (strictMode && project["forked_from_project"])) {
    return null;
  }
  let nameObj = project.description.match(/^(\S+)\s+%ddl:\S+%/);
  if (nameObj) {
    project.description = nameObj[1];
  }

  project.deadline = new Date(ddl[1]);
  project.daysLeft = Math.floor((project.deadline - Date.now()) / 1000 / 24 / 3600);
  if (project["forked_from_project"]) {
    project.class = project["forked_from_project"]["name_with_namespace"].match(/^(\S+)/)[1];
  } else {
    project.class = "";
  }

  project.item_type = 'assignment';
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

  member.item_type = 'member';
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

  notification.item_type = 'notification';
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

filterFactory.materialFilter = (material) => {
  if (material.name.indexOf('.') == 0 || material.name.indexOf("README.md") != -1) {
    return null;
  }

  material.item_type = 'material';
  return material;
};

filterFactory.materialsFilter = (materials) => {
  let results = [];
  for (let material of materials) {
    let result = filterFactory.materialFilter(material);
    if (result) {
      results.push(result);
    }
  }
  return results;
};

filterFactory.activitiesFilter = (activitiesObj) => {
  let notifications = filterFactory.notificationsFilter(activitiesObj.notifications);
  let assignments = filterFactory.assignmentsFilter(activitiesObj.assignments);

  let results = assignments.concat(notifications);
  results.sort((a, b)=> {
    let a_time = a.last_activity_at || a.updated_at;
    let b_time = b.last_activity_at || b.updated_at;
    return new Date(b_time) - new Date(a_time);
  });

  return results;
};


module.exports = filterFactory;
/**
 * Created by ZhongyiTong on 11/7/15.
 */

"use strict";

let filterFactory = {};



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
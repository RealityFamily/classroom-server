/**
 * Created by ZhongyiTong on 11/7/15.
 */

"use strict";

let filterFactory = {};



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
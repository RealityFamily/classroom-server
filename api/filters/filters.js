/**
 * Created by ZhongyiTong on 11/7/15.
 */

"use strict";

let filterFactory = {};

filterFactory.activitiesFilter = (activitiesObj) => {
  let notifications = NotificationsFilter.parseNotification(activitiesObj.notifications);
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
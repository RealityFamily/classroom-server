/**
 * Created by ZhongyiTong on 11/21/15.
 */
"use strict";

class NotificationsFilter {

  static parseNotifications(notifications) {
    let results = [];
    for (let notification of notifications) {
      let result = NotificationsFilter.parseNotification(notification);
      if (result) {
        results.push(result);
      }
    }
    return results;
  };

  static parseNotification(notification) {
    if (notification.state == 'closed') return null;

    delete notification.assignee;
    delete notification.state;
    delete notification.milestone;
    delete notification.labels;

    notification.item_type = 'notification';
    return notification;
  };
}

module.exports = NotificationsFilter;
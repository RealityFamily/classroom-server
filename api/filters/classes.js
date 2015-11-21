/**
 * Created by ZhongyiTong on 11/21/15.
 */
"use strict";

class ClassesFilter {
  static getClasses(classes) {
    let results = [];

    for (let class_ of classes) {
      class_ = ClassesFilter.getClass(class_);
      if (class_) results.push(class_);
    }
    return results;
  };

  static getClass(class_) {
    if (class_.name == 'best-practices') return false;

    //console.log(class_);
    let semester = ClassesFilter.getSemester(class_);
    if (!semester) return;

    class_.semester = semester;

    return class_;
  };

  static getSemester(class_) {
    let semesterObj = class_.name.match(/-(\S+)/);

    // invalid class
    if (!semesterObj) return false;

    return semesterObj[1];
  };
}

module.exports = ClassesFilter;
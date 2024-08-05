package com.nextpin.app.service.impl;

import com.nextpin.app.dao.CourseDao;
import com.nextpin.app.dao.CourseHomeReview2Dao;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.service.CourseHomeReview2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CourseHomeReview2ServiceImpl implements CourseHomeReview2Service {
    @Autowired
    private final CourseHomeReview2Dao courseHomeReview2Dao;

    @Autowired
    public CourseHomeReview2ServiceImpl(CourseHomeReview2Dao courseHomeReview2Dao) {
        this.courseHomeReview2Dao = courseHomeReview2Dao;
    }

    @Override
    @Transactional
    public void createCourse(CourseDto course, CourseDetailDto courseDetail) {
        int courseId = courseHomeReview2Dao.insertCourse(course);
//        courseHomeReview2Dao.insertCourse(course);
        courseDetail.setCourseId(courseId);
        courseHomeReview2Dao.insertCourseDetail(courseDetail);
    }
}

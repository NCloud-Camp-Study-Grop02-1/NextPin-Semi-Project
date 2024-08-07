package com.nextpin.app.service.impl;

import com.nextpin.app.dao.CourseHomeReview2Dao;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.service.CourseHomeReview2Service;
import org.apache.ibatis.exceptions.TooManyResultsException;
import org.mybatis.spring.MyBatisSystemException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class CourseHomeReview2ServiceImpl implements CourseHomeReview2Service {

    private final Logger logger = LoggerFactory.getLogger(CourseHomeReview2ServiceImpl.class);
    private final CourseHomeReview2Dao courseHomeReview2Dao;

    @Autowired
    public CourseHomeReview2ServiceImpl(CourseHomeReview2Dao courseHomeReview2Dao) {
        this.courseHomeReview2Dao = courseHomeReview2Dao;
    }

    @Override
    public Integer findCourseIdByUserIdAndCourseName(String userId, String courseName) {
        List<Integer> courseIds = courseHomeReview2Dao.findCourseIdByUserIdAndCourseName(userId, courseName);
        if (courseIds == null || courseIds.isEmpty()) {
            return null; // 또는 적절한 예외 처리
        }
        if (courseIds.size() > 1) {
            throw new MyBatisSystemException(new TooManyResultsException("Expected one result (or null) to be returned by selectOne(), but found: " + courseIds.size()));
        }
        return courseIds.get(0);
    }

    @Override
    public void updateCourseColorAndModifyDate(int courseId, String color) {
        courseHomeReview2Dao.updateCourseColorAndModifyDate(courseId, color);
    }

    @Override
    public void insertCourse(CourseDto courseDto) {
        courseHomeReview2Dao.insertCourse(courseDto);
    }

    @Override
    public void insertCourseDetail(CourseDetailDto courseDetail) {
        courseHomeReview2Dao.insertCourseDetail(courseDetail);
    }

    @Override
    public List<CourseDetailDto> getCourseDetails(int courseId) {
        return courseHomeReview2Dao.getCourseDetails(courseId);
    }

    @Override
    public boolean isDuplicateCourseDetail(int courseId, String location) {
        return courseHomeReview2Dao.isDuplicateCourseDetail(courseId, location);
    }

    @Override
    public List<CourseDetailDto> getCourseDetails(String courseName, String userId) {
        return courseHomeReview2Dao.getCourseDetailsByNameAndUser(courseName, userId);
    }

    @Override
    public boolean isLocationExist(Integer courseId, String location) {
        return courseHomeReview2Dao.isLocationExist(courseId, location);
    }

    @Override
    @Transactional
    public void createCourse(CourseDto course, CourseDetailDto courseDetail) {
        int courseId = courseHomeReview2Dao.insertCourse(course);
        courseDetail.setCourseId(courseId);
        courseHomeReview2Dao.insertCourseDetail(courseDetail);
    }

    @Override
    public int saveCourse(CourseDto saveCourseDto) {
        return courseHomeReview2Dao.insertCourse(saveCourseDto);
    }

    @Override
    public void saveCourseDetail(CourseDto saveCourseDto, List<CourseDetailDto> saveCourseDetailDtoList) {
        int courseId = saveCourse(saveCourseDto);
        logger.debug("courseId : " + courseId);
        for(CourseDetailDto saveCourseDetailDto : saveCourseDetailDtoList) {
            saveCourseDetailDto.setCourseId(courseId);
            logger.debug("saveCourseDetailDto.courseId : " + saveCourseDetailDto.getCourseId());
        }

        courseHomeReview2Dao.saveCourseDetail(saveCourseDetailDtoList);
    }

    @Override
    public List<String> getCoursesByUserId(String userId) {
        return courseHomeReview2Dao.getCoursesByUserId(userId);
    }

}

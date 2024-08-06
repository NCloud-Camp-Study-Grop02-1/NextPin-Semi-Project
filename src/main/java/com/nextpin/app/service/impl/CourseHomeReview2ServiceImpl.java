package com.nextpin.app.service.impl;

import com.nextpin.app.dao.CourseHomeReview2Dao;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.service.CourseHomeReview2Service;
import org.apache.ibatis.exceptions.TooManyResultsException;
import org.mybatis.spring.MyBatisSystemException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CourseHomeReview2ServiceImpl implements CourseHomeReview2Service {

    @Autowired
    private CourseHomeReview2Dao courseHomeReview2Dao;

    @Override
    public String findCourseIdByUserIdAndCourseName(String userId, String courseName) {
        List<String> courseIds = courseHomeReview2Dao.findCourseIdByUserIdAndCourseName(userId, courseName);
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

    public Map<String, Double> getCoordinatesByLocation(String location) {
        List<Map<String, Double>> coordinatesList = courseHomeReview2Dao.getCoordinatesByLocation(location);
        if (coordinatesList.isEmpty()) {
            return null;
        } else {
            // 여러 결과 중 첫 번째 결과를 반환
            return coordinatesList.get(0);
        }
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
}

package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;

import java.util.List;
import java.util.Map;

public interface CourseHomeReview2Service {

    String findCourseIdByUserIdAndCourseName(String userId, String courseName);

    void updateCourseColorAndModifyDate(int courseId, String color);

    void insertCourse(CourseDto courseDto);

    void insertCourseDetail(CourseDetailDto courseDetail);

    List<CourseDetailDto> getCourseDetails(int courseId);

    Map<String, Double> getCoordinatesByLocation(String location);

    boolean isDuplicateCourseDetail(int courseId, String location);

    List<CourseDetailDto> getCourseDetails(String courseName, String userId);

    boolean isLocationExist(Integer courseId, String location);

    boolean deleteCourseDetail(Integer courseId, String location);

    int deleteCourseDetail(int courseId, String location);

}

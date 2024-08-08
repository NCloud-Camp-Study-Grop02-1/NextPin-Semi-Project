package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;

import java.util.List;
import java.util.Map;

public interface CourseHomeReview2Service {

    Integer findCourseIdByUserIdAndCourseName(String userId, String courseName);

    void updateCourseColorAndModifyDate(int courseId, String color);

    void insertCourse(CourseDto courseDto);

    void insertCourseDetail(CourseDetailDto courseDetail);

    List<CourseDetailDto> getCourseDetails(int courseId);

    boolean isDuplicateCourseDetail(int courseId, String location);

    List<CourseDetailDto> getCourseDetails(String courseName, String userId);

    boolean isLocationExist(Integer courseId, String location);

    public void createCourse(CourseDto course, CourseDetailDto courseDetail);

    public int saveCourse(CourseDto saveCourseDto);

    public void saveCourseDetail(CourseDto saveCourseDto, List<CourseDetailDto> saveCourseDetailDtoList);

    List<String> getCoursesByUserId(String userId);

}

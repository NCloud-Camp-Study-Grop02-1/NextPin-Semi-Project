package com.nextpin.app.service;

import com.nextpin.app.dto.CourseAndDetailDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface MyPinService {

    UserDto getUserProfile(String userId);

    List<CourseDto> getUserCourse(String userId);
    List<CourseDto> getUserLikeCourse(String userId);

    List<CourseDetailDto> getUserCourseDetail(String userId, int courseId);

    void editUserProfile(Map<String, Object> userDto);

    void editUserCourse1(CourseDto courseDto);
    void editUserCourse2(CourseDto courseDto);
    void editUserCourse3(CourseDto courseDto);

    void editUserBookMark(Map<String, Object> map);

    void deleteUserCourse(CourseDto courseDto);
    void deleteUserCourseDetail(CourseDetailDto courseDetailDto);

}


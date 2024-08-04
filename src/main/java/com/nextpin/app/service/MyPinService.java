package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.UserDto;

import java.util.List;
import java.util.Map;

public interface MyPinService {

    UserDto getUserProfile(String userId);

    List<CourseDto> getUserCourse(String userId);

    List<CourseDetailDto> getUserCourseDetail(String userId);

    void editUserProfile(Map<String, Object> userDto);

    void editUserCourse(Map<String, Object> courseDto);
}


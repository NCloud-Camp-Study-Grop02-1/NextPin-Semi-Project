package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;

import java.util.List;
import java.util.Map;

public interface CommunityService {
    List<CourseDto> getAllCourses();
    List<Map<CourseDto, List<CourseDetailDto>>> getCourseListMapData();
}

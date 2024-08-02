package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;

import java.util.List;

public interface CommunityService {
    List<CourseDto> getAllCourses();
    List<CourseDetailDto> getCourseDetailsByCourseId(int courseId);
}

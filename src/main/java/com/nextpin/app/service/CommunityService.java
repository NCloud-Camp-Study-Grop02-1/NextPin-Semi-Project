package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.likeCourseDto;

import java.util.List;
import java.util.Map;

public interface CommunityService {
    List<CourseDto> getAllCourses();
    List<CourseDetailDto> getCourseDetailsByCourseId(int courseId);
    List<Map<CourseDto, List<CourseDetailDto>>> getCourseListMap();
    boolean addLike(int courseId, String userId);
    boolean removeLike(int courseId, String userId);
    List<Integer> getUserLikedCourses(String userId);
    void updateHeartCount(int courseId, int increment);
}

package com.nextpin.app.service;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;

import java.util.List;

public interface CourseHomeReview2Service {
    public void createCourse(CourseDto course, CourseDetailDto courseDetail);

    public int saveCourse(CourseDto saveCourseDto);

    public void saveCourseDetail(CourseDto saveCourseDto, List<CourseDetailDto> saveCourseDetailDtoList);
}

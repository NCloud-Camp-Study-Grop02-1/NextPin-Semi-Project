package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface CourseHomeReview2Dao {

    public List<String> findCourseIdByUserIdAndCourseName(String userId, String courseName);

    void updateCourseColorAndModifyDate(@Param("courseId") int courseId, @Param("color") String color);

    void insertCourse(CourseDto courseDto);

    void insertCourseDetail(CourseDetailDto courseDetail);

    List<CourseDetailDto> getCourseDetails(@Param("courseId") int courseId);

    List<Map<String, Double>> getCoordinatesByLocation(String location);

    boolean isDuplicateCourseDetail(@Param("courseId") int courseId, @Param("location") String location);

    List<CourseDetailDto> getCourseDetailsByNameAndUser(@Param("courseName") String courseName, @Param("userId") String userId);

    boolean isLocationExist(@Param("courseId") Integer courseId, @Param("location") String location);

}

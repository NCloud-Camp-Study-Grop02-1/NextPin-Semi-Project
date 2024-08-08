package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CourseHomeReview2Dao {

    private final SqlSessionTemplate mybatis;

    @Autowired
    public CourseHomeReview2Dao(SqlSessionTemplate sqlSessionTemplate) {
        this.mybatis = sqlSessionTemplate;
    }

    public int insertCourse(CourseDto course) {
        mybatis.insert("CourseHomeReview2Dao.insertCourse", course);
        return course.getCourseId();
    }

    public void insertCourseDetail(CourseDetailDto courseDetail) {
        mybatis.insert("CourseHomeReview2Dao.insertCourseDetail", courseDetail);
    }

    public void saveCourseDetail(List<CourseDetailDto> saveCourseDetailDtoList) {
        for (CourseDetailDto detail : saveCourseDetailDtoList) {
            mybatis.insert("CourseHomeReview2Dao.insertCourseDetail", detail);
        }
    }

    public List<Integer> findCourseIdByUserIdAndCourseName(String userId, String courseName) {
        Map<String, String> params = new HashMap<>();
        params.put("userId", userId);
        params.put("courseName", courseName);
        return mybatis.selectList("CourseHomeReview2Dao.findCourseIdByUserIdAndCourseName", params);
    }

    public void updateCourseColorAndModifyDate(@Param("courseId") int courseId, @Param("color") String color) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("color", color);
        mybatis.update("CourseHomeReview2Dao.updateCourseColorAndModifyDate", params);
    }

    public List<CourseDetailDto> getCourseDetails(@Param("courseId") int courseId) {
        return mybatis.selectList("CourseHomeReview2Dao.getCourseDetails", courseId);
    }

    public boolean isDuplicateCourseDetail(@Param("courseId") int courseId, @Param("location") String location) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("location", location);
        return mybatis.selectOne("CourseHomeReview2Dao.isDuplicateCourseDetail", params);
    }

    public List<CourseDetailDto> getCourseDetailsByNameAndUser(@Param("courseName") String courseName, @Param("userId") String userId) {
        Map<String, String> params = new HashMap<>();
        params.put("courseName", courseName);
        params.put("userId", userId);
        return mybatis.selectList("CourseHomeReview2Dao.getCourseDetailsByNameAndUser", params);
    }

    public boolean isLocationExist(@Param("courseId") Integer courseId, @Param("location") String location) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("location", location);
        return mybatis.selectOne("CourseHomeReview2Dao.isLocationExist", params);
    }

    public List<String> getCoursesByUserId(String userId) {
        return mybatis.selectList("CourseHomeReview2Dao.getCoursesByUserId", userId);
    }

}

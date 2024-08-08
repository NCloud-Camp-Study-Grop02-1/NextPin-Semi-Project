package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.likeCourseDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CommunityDao {

    private final SqlSessionTemplate mybatis;

    @Autowired
    public CommunityDao(SqlSessionTemplate sqlSessionTemplate) {
        this.mybatis = sqlSessionTemplate;
    }

    public List<CourseDto> getAllCourses() {
        return mybatis.selectList("CommunityMapper.getAllCourses");
    }

    public List<CourseDetailDto> getCourseDetailsByCourseId(int courseId) {
        return mybatis.selectList("CommunityMapper.getCourseDetailsByCourseId", courseId);
    }

    public List<CourseDetailDto> getCourseDetailByCourses(List<Integer> courseIds){
        return mybatis.selectList("CommunityMapper.getCourseDetailByCourses", courseIds);
    }

    public boolean insertLike(int courseId, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("userId", userId);
        params.put("bookMarkBoolean", false); // 항상 false로 설정
        return mybatis.insert("CommunityMapper.insertLike", params) > 0;
    }

    public boolean deleteLike(int courseId, String userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("userId", userId);
        return mybatis.delete("CommunityMapper.deleteLike", params) > 0;
    }

    public List<Integer> selectUserLikedCourses(String userId) {
        return mybatis.selectList("CommunityMapper.selectUserLikedCourses", userId);
    }

    public void updateHeartCount(int courseId, int increment) {
        Map<String, Object> params = new HashMap<>();
        params.put("courseId", courseId);
        params.put("increment", increment);
        mybatis.update("CommunityMapper.updateHeartCount", params);
    }
}

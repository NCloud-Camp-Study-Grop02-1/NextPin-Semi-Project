package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}

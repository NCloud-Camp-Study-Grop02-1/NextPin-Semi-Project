package com.nextpin.app.dao;

import com.nextpin.app.dto.SaveCourseDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SaveCourseDao {

    @Autowired
    private SqlSession sqlSession;
    private static final String NAMESPACE = "com.nextpin.app.mapper.SaveCourseMapper";

    public void saveCourse(SaveCourseDto saveCourseDto) {
        sqlSession.insert(NAMESPACE + ".saveCourse", saveCourseDto);
    }
}
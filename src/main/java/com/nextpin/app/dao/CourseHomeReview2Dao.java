package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class CourseHomeReview2Dao {

    private final SqlSessionTemplate mybatis;

    @Autowired
    public CourseHomeReview2Dao(SqlSessionTemplate sqlSessionTemplate) {
        this.mybatis = sqlSessionTemplate;
    }

    public int insertCourse(CourseDto course) {
        mybatis.insert("com.nextpin.app.dao.CourseHomeReview2Dao.insertCourse", course);
        return course.getCourseId();
    }

    public void insertCourseDetail(CourseDetailDto courseDetail) {
        mybatis.insert("com.nextpin.app.dao.CourseHomeReview2Dao.insertCourseDetail", courseDetail);
    }

    public void saveCourseDetail(List<CourseDetailDto> saveCourseDetailDtoList) {
        for (int i = 0; i < saveCourseDetailDtoList.size(); i++) {
            mybatis.insert("com.nextpin.app.dao.CourseHomeReview2Dao.insertCourseDetail", saveCourseDetailDtoList.get(i));
        }

    }
}

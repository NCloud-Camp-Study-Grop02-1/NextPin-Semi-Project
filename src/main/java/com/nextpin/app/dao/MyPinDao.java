package com.nextpin.app.dao;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.UserDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MyPinDao {
    private SqlSessionTemplate mybatis;

    @Autowired
    public MyPinDao(SqlSessionTemplate sqlSessionTemplate){
        this.mybatis = sqlSessionTemplate;
    }

    public UserDto getUserProfile(String userId){
        System.out.println("MyPinDao의 getUserProfile 메소드 실행...ㅜ,,ㅜ" + userId);

        // 왜 매개변수가 두개이고 각 변수가 왜 들어간지 모르겠음.
        return mybatis.selectOne("MyPinDao.getUserProfile",userId);
    }

    public List<CourseDto> getUserCourse(String userId){
        return mybatis.selectList("MyPinDao.getUserCourse",userId);
    }

    public List<CourseDto> getUserLikeCourse(String userId){
        return mybatis.selectList("MyPinDao.getUserLikeCourse",userId);
    }

    public List<CourseDetailDto> getUserCourseDetail(String userId, int courseId){
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("userId", userId);
        paramMap.put("courseId", courseId);

        return mybatis.selectList("MyPinDao.getUserCourseDetail",paramMap);
    }

    public void editUserProfile(Map<String, Object> userDto){
        mybatis.update("MyPinDao.editUserProfile",userDto);
    }

    public void editUserCourse1(CourseDto courseDto) {
        mybatis.update("MyPinDao.editUserCourse",courseDto);
    }
    public void editUserCourse2(CourseDto courseDto) {
        mybatis.update("MyPinDao.editUserCourse",courseDto);
    }
    public void editUserCourse3(CourseDto courseDto) {
        mybatis.update("MyPinDao.editUserCourse",courseDto);
    }

    public void editUserBookMark(CourseDto courseDto) {
        mybatis.update("MyPinDao.editBookMark",courseDto);
    }

    public void deleteUserCourseDetail(CourseDetailDto courseDetailDto) {
        mybatis.delete("MyPinDao.deleteCourseDetail",courseDetailDto);
    }
}


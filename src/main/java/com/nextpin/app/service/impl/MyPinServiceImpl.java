package com.nextpin.app.service.impl;

import com.nextpin.app.dao.MyPinDao;
import com.nextpin.app.dto.CourseAndDetailDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class MyPinServiceImpl implements MyPinService {
    private MyPinDao myPinDao;

    private static final Logger logger = LoggerFactory.getLogger(MyPinServiceImpl.class);

    @Autowired
    public MyPinServiceImpl(MyPinDao myPinDao){ this.myPinDao = myPinDao;}

    @Override
    public UserDto getUserProfile(String userId){
        logger.debug("MyPinServiceImpl의 getUserProfile 메소드 실행...");
        return myPinDao.getUserProfile(userId);
        //return myPinDao.getUserProfile(userId);
    }

    @Override
    public List<CourseDto> getUserCourse(String userId) {
        return myPinDao.getUserCourse(userId);
    }

    @Override
    public List<CourseDto> getUserLikeCourse(String userId) {
        return myPinDao.getUserLikeCourse(userId);
    }

    public List<CourseDetailDto> getUserCourseDetail(String userId, int courseId) {
        return myPinDao.getUserCourseDetail(userId, courseId);
    }


    public void editUserProfile(Map<String, Object> userDto){
        myPinDao.editUserProfile(userDto);
    }

    @Override
    public void editUserCourse1(CourseDto courseDto) {myPinDao.editUserCourse1(courseDto);}

    public void editUserCourse2(CourseDto courseDto) {myPinDao.editUserCourse2(courseDto);}

    public void editUserCourse3(CourseDto courseDto) {myPinDao.editUserCourse3(courseDto);}

    public void editUserBookMark(Map<String, Object> map){
        myPinDao.editUserBookMark(map);
    }

    public void deleteUserCourse(CourseDto courseDto){
        myPinDao.deleteUserCourse(courseDto);
    }

    public void deleteUserCourseDetail(CourseDetailDto courseDetailDto){
        myPinDao.deleteUserCourseDetail(courseDetailDto);
    }

    @Override
    public CourseDetailDto selectBeforeDeleteCheckDetailDto(int courseDetailId) {
        return myPinDao.selectBeforeDeleteCheckDetailDto(courseDetailId);
    }

}


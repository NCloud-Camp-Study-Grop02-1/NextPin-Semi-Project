package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextpin.app.dao.CommunityDao;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.likeCourseDto;
import com.nextpin.app.service.CommunityService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommunityServiceImpl implements CommunityService {

    private Logger logger = (Logger) LoggerFactory.getLogger(CommunityServiceImpl.class);
    private final CommunityDao communityDao;

    @Autowired
    public CommunityServiceImpl(CommunityDao communityDao){
        this.communityDao = communityDao;
    }

    @Override
    public List<CourseDto> getAllCourses() {
        return communityDao.getAllCourses();
    }

    public List<CourseDetailDto> getCourseDetailByCourses(List<Integer> courseIds) {
        return communityDao.getCourseDetailByCourses(courseIds);
    }

    public List<Map<CourseDto, List<CourseDetailDto>>> getCourseListMapData(){
        /*
         * -- 변경 전
         * [ {cousrId1, cousrId2, cousrId3, ...}, {detailCourse1, detailCourse2, detailCourse3, ...}]
         *
         *
         * -- 변경예정
         *[
         *   {cousrId1 : [detailCourse1, detailCourse2, detailCourse3]}
         * , {cousrId2 : [detailCourse1, detailCourse2]}
         * , {cousrId3 : [detailCourse1, detailCourse2, detailCourse3, detailCourse4]}
         * ]
         * */
        List<CourseDto> courseList = getAllCourses();
        logger.debug("courseList : " + courseList.toString());
        List<Map<CourseDto, List<CourseDetailDto>>> courseDataList = new ArrayList<>();

        List<Integer> courseIds = new ArrayList<>();
        for(CourseDto courseDto : courseList){
            courseIds.add(courseDto.getCourseId());
        }
        List<CourseDetailDto> courseDetailList = getCourseDetailByCourses(courseIds);
        logger.debug("courseDetailList : " + courseDetailList.toString());

        for(CourseDto courseDto : courseList){
            Map<CourseDto, List<CourseDetailDto>> tempMap = new HashMap<>();
            List<CourseDetailDto> tempDetailList = new ArrayList<>();
            for(CourseDetailDto courseDetailDto : courseDetailList){
                if(courseDto.getCourseId() == courseDetailDto.getCourseId()){
                    tempDetailList.add(courseDetailDto);
                }
            }
            tempDetailList = tempDetailList.stream()
                                           .sorted(Comparator.comparing(CourseDetailDto::getVisitDate))
                                           .collect(Collectors.toList());
            if(null != courseDto && tempDetailList.size() > 0){
                tempMap.put(courseDto, tempDetailList);
            }
            courseDataList.add(tempMap);
        }
        //        logger.debug("courseDetailList : " + courseDetailList.toString());
        // ObjectMapper objectMapper = new ObjectMapper();
        // String jsonCourseDetailList = "";

        // try {
        //     jsonCourseDetailList = objectMapper.writerWithDefaultPrettyPrinter()
        //             .writeValueAsString(courseDetailList);
        // } catch (JsonProcessingException je) {
        //     System.out.println(je.getMessage());
        // }

        // logger.debug("jsonCourseDetailList : " + jsonCourseDetailList);
        // Map<String, Object> courseMap = new HashMap<>();
        // courseMap.put("courseList", courseList);
        // courseMap.put("courseDetailList", jsonCourseDetailList);

        return courseDataList;
    }

    @Override
    public boolean addLike(int courseId, String userId) {
        return communityDao.insertLike(courseId, userId);
    }

    @Override
    public boolean removeLike(int courseId, String userId) {
        return communityDao.deleteLike(courseId, userId);
    }

    @Override
    public List<Integer> getUserLikedCourses(String userId) {
        return communityDao.selectUserLikedCourses(userId);
    }

    @Override
    public void updateHeartCount(int courseId, int increment) {
        communityDao.updateHeartCount(courseId, increment);
    }
}

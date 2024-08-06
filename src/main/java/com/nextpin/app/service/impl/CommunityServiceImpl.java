package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextpin.app.dao.CommunityDao;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.service.CommunityService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    @Override
    public List<CourseDetailDto> getCourseDetailsByCourseId(int courseId) {
        return communityDao.getCourseDetailsByCourseId(courseId);
    }

    public List<CourseDetailDto> getCourseDetailByCourses(List<Integer> courseIds) {
        return communityDao.getCourseDetailByCourses(courseIds);
    }

    public Map<String, Object> getCourseListMap(){
        List<CourseDto> courseList = getAllCourses();

        List<Integer> courseIds = new ArrayList<>();
        for(CourseDto courseDto : courseList){
            courseIds.add(courseDto.getCourseId());
        }
        List<CourseDetailDto> courseDetailList = getCourseDetailByCourses(courseIds);

//        logger.debug("courseDetailList : " + courseDetailList.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonCourseDetailList = "";

        try {
            jsonCourseDetailList = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(courseDetailList);
        } catch (JsonProcessingException je) {
            System.out.println(je.getMessage());
        }

        logger.debug("jsonCourseDetailList : " + jsonCourseDetailList);
        Map<String, Object> courseMap = new HashMap<>();
        courseMap.put("courseList", courseList);
        courseMap.put("courseDetailList", jsonCourseDetailList);

        return courseMap;
    }
}

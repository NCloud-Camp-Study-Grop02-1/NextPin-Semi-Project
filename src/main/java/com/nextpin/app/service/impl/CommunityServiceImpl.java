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
    @Autowired
    private CommunityDao communityDao;

    @Override
    public List<CourseDto> getAllCourses() {
        return communityDao.getAllCourses();
    }

    @Override
    public List<CourseDetailDto> getCourseDetailsByCourseId(int courseId) {
        return communityDao.getCourseDetailsByCourseId(courseId);
    }

    public String getCourseListMap(){
        List<CourseDto> courseList = getAllCourses();
        List<Map<String, Object>> courseListMap = new ArrayList<>();
        for (CourseDto course : courseList) {
            List<CourseDetailDto> tempList = getCourseDetailsByCourseId(course.getCourseId());
            if(tempList.size() > 0){
                Map<String, Object> map = new HashMap<>();
                map.put("nickname", course.getNickname());
                map.put("courseName", course.getCourseName());
                map.put("courseColor", course.getColor());
                map.put("heartCnt", course.getHeartCnt());
                map.put("data", tempList);
                courseListMap.add(map);
            }
        }
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = "";

        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(courseListMap);
        } catch(JsonProcessingException je){
            logger.error(je.getMessage());
        }
        return jsonString;
    }
}

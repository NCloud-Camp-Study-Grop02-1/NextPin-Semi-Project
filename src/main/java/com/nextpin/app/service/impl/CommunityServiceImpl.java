package com.nextpin.app.service.impl;

import com.nextpin.app.dao.CommunityDao;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityServiceImpl implements CommunityService {

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
}

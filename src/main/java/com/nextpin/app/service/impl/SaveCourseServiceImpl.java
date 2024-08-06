package com.nextpin.app.service.impl;

import com.nextpin.app.dao.SaveCourseDao;
import com.nextpin.app.dto.SaveCourseDto;
import com.nextpin.app.service.SaveCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaveCourseServiceImpl implements SaveCourseService {

    @Autowired
    private SaveCourseDao saveCourseDao;

    @Override
    public void saveCourse(SaveCourseDto saveCourseDto) {
        saveCourseDao.saveCourse(saveCourseDto);
    }
}
package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dao.CourseDao;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseServiceImpl.class);
    private CourseDao courseDao;

    @Autowired
    public CourseServiceImpl(CourseDao courseDao) {
        this.courseDao = courseDao;
    }

    @Override
    public List<KakaoMapDto> getAddressDatas() {
        return courseDao.getAddressDatas();
    }

    @Override
    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList) {
        courseDao.updateAddressConversion(kakaoMapDtoList);
    }
}

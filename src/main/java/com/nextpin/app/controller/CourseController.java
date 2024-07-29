package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CourseController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseController.class);

    @GetMapping("/courseHomeReview2")
    public ModelAndView courseHomeReview2(@RequestParam(value = "id", required = false, defaultValue = "1") int id) {
        String rtnKaMapDto = courseService.searchPinDetail(id);

        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseHomeReview2");
        mav.addObject("rtnKaMapDto", rtnKaMapDto);

        logger.debug("courseHomeReview2페이지 이동");
        return mav;
    }

    @GetMapping("/mainCourse")
    public ModelAndView mainCourse() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/mainCourse");

        logger.debug("mainCourse페이지 이동");
        return mav;
    }
}

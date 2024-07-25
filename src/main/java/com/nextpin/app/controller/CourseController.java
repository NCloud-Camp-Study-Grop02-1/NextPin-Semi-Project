package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

@RestController
public class CourseController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseController.class);
    private CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/courseHomeReview")
    public ModelAndView courseHomeReview() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseHomeReview");

        logger.debug("courseHomeReview페이지 이동");
        return mav;
    }

    @GetMapping("/courseHomeReview2")
    public ModelAndView courseHomeReview2() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseHomeReview2");

        logger.debug("courseHomeReview2페이지 이동");
        return mav;
    }

    @GetMapping("/courseMake")
    public ModelAndView courseMake() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseMake");

        logger.debug("courseMake페이지 이동");
        return mav;
    }

    @GetMapping("/courseMake2")
    public ModelAndView courseMake2() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseMake2");

        logger.debug("courseMake2페이지 이동");
        return mav;
    }

    @GetMapping("/mainCourse")
    public ModelAndView mainCourse() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/mainCourse");

        logger.debug("mainCourse페이지 이동");
        return mav;
    }

    @PostMapping("/searchPlaces")
    @ResponseBody
    public String searchPlaces(@RequestBody HashMap<String, String> searchKeywords, Criteria cri) {
        return courseService.searchPinDatas(searchKeywords, cri);
    }
}

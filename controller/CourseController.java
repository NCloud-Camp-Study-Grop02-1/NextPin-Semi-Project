package com.test.api.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CourseController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseController.class);

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

    @GetMapping("/myCourse")
    public ModelAndView myCourse() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/myCourse");

        logger.debug("myCourse페이지 이동");
        return mav;
    }

    @GetMapping("/myCourse2")
    public ModelAndView myCourse2() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/myCourse2");

        logger.debug("myCourse2페이지 이동");
        return mav;
    }
}

package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.service.CommunityService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class CommunityController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CommunityController.class);

    @GetMapping("/community")
    public ModelAndView community() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("community/community");

        logger.debug("community페이지 이동");
        return mav;
    }

    @Autowired
    private CommunityService communityService;

    @GetMapping("/courses")
    public List<CourseDto> getAllCourses() {
        return communityService.getAllCourses();
    }

    @GetMapping("/courses/{courseId}/details")
    public List<CourseDetailDto> getCourseDetails(@PathVariable int courseId) {
        return communityService.getCourseDetailsByCourseId(courseId);
    }

}

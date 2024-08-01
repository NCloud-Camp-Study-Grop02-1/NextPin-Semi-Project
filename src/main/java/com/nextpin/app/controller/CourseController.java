package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.dto.KakaoMapReviewDto;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;

@RestController
public class CourseController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseController.class);
    private CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/courseHomeReview2")
    public ModelAndView courseHomeReview2(@RequestParam(value = "id", required = false, defaultValue = "1") int id) {
        KakaoMapDto rtnKaMapDto = courseService.searchPinDetail(id);

        List<KakaoMapReviewDto> rtnKaMapReviewList = courseService.searchPinDetailReview(id);
        int rtnKaMapReviewListSize = rtnKaMapReviewList.size();

        logger.debug("리뷰 리스트 : " + rtnKaMapReviewList.toString());
        ModelAndView mav = new ModelAndView();
        mav.setViewName("course/courseHomeReview2");
        mav.addObject("rtnKaMapDto", rtnKaMapDto);
        mav.addObject("rtnKaMapReviewList", rtnKaMapReviewList);
        mav.addObject("rtnKaMapReviewListCnt", rtnKaMapReviewListSize);

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
//    @RequestMapping(value = "/searchPlaces", method = RequestMethod.POST)
//    @RequestMapping(value = "/searchPlaces", method = RequestMethod.GET)
    @PostMapping("/searchPlaces")
    @ResponseBody
    public String searchPlaces(@RequestBody HashMap<String, String> searchKeywords, Criteria cri) {
        return courseService.searchPinDatas(searchKeywords, cri);
    }
}

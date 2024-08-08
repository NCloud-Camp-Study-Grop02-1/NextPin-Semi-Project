package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dao.CourseDao;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.service.CourseService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/searchPlaces")
    @ResponseBody
    public String searchPlaces(@RequestBody HashMap<String, String> searchKeywords, Criteria cri) {
        return courseService.searchPinDatas(searchKeywords, cri);
    }

    @GetMapping("/userCourseTitle")
    public ResponseEntity<List<CourseDto>> getUserCourses(HttpSession session) {
        try {
            MemberDto loginMember = (MemberDto) session.getAttribute("loginMember");

            if (loginMember == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            List<CourseDto> userCourses = courseService.getUserCourses(loginMember.getUserId());
            return ResponseEntity.ok(userCourses);
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/courseDetail")
    public ResponseEntity<List<Map<String, Object>>> getCourseDetail(HttpSession session) {
        try {
            MemberDto loginMember = (MemberDto) session.getAttribute("loginMember");

            if (loginMember == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            List<Map<String, Object>> courseDetail = courseService.findCourseDetail(loginMember.getUserId());
            return ResponseEntity.ok(courseDetail);
        } catch (Exception e) {
            e.printStackTrace(); // 에러 로그 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @PostMapping("/updateMemo")
    public ResponseEntity<String> updateMemo(@RequestBody CourseDetailDto courseDetailDto) {
        try{
            System.out.println("---------------------------------------------");
            System.out.println(courseDetailDto);
            courseService.updateMemo(courseDetailDto);
            return ResponseEntity.ok("메모가 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메모 업데이트 중 오류가 발생했습니다.");
        }
    }
}

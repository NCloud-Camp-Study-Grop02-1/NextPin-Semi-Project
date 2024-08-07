package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextpin.app.dto.*;
import com.nextpin.app.service.CourseHomeReview2Service;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.dto.KakaoMapReviewDto;
import com.nextpin.app.dto.SearchRequestDto;
import com.nextpin.app.service.CourseService;
import com.nextpin.app.service.PlaceService;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.awt.*;
import java.util.List;

@RestController
public class CourseController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseController.class);
    private CourseService courseService;
    private CourseHomeReview2Service courseHomeReview2Service;

    @Autowired
    public CourseController(CourseService courseService, CourseHomeReview2Service courseHomeReview2Service) {
        this.courseService = courseService;
        this.courseHomeReview2Service = courseHomeReview2Service;
    }

    @GetMapping("/courseHomeReview2")
    public ModelAndView courseHomeReview2(@RequestParam(value = "id", required = false, defaultValue = "1") int id) {
        KakaoMapDto rtnKaMapDto = courseService.searchPinDetail(id);

        List<KakaoMapReviewDto> rtnKaMapReviewList = courseService.searchPinDetailReview(id);
        int rtnKaMapReviewListSize = rtnKaMapReviewList.size();

        logger.debug("리뷰 리스트 : " + rtnKaMapReviewList);
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

    @PostMapping("/createCourse")
    public String createCourse(@RequestBody HashMap<String, Object> requestData) {
        System.out.println("1111111111111111111111");
        try {
            // CourseDto와 CourseDetailDto를 생성하여 requestData에서 데이터를 설정합니다.
            CourseDto course = new CourseDto();
            course.setUserId((String) requestData.get("userId"));
            course.setNickname((String) requestData.get("nickname"));
            course.setCourseName((String) requestData.get("courseName"));
            course.setColor((String) requestData.get("color"));

            HashMap<String, Object> courseDetailMap = (HashMap<String, Object>) requestData.get("courseDetail");
            CourseDetailDto courseDetail = new CourseDetailDto();
            courseDetail.setLocation((String) courseDetailMap.get("location"));
            courseDetail.setX(((Number) courseDetailMap.get("x")).doubleValue());
            courseDetail.setY(((Number) courseDetailMap.get("y")).doubleValue());
            // visitDate가 문자열로 전달된 경우
            String visitDateString = (String) courseDetailMap.get("visitDate");
            if (visitDateString != null && !visitDateString.isEmpty()) {
                try {
                    // "yyyy/MM/dd" 형식을 처리할 수 있도록 DateTimeFormatter를 정의합니다.
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                    LocalDate localDate = LocalDate.parse(visitDateString, formatter);

                    Date date = Date.valueOf(localDate);
                    courseDetail.setVisitDate(date);
                } catch (DateTimeParseException e) {
                    // 올바르지 않은 날짜 형식 처리 (예: 기본값 설정 또는 예외 던지기)
                    throw new IllegalArgumentException("잘못된 날짜 형식: " + visitDateString, e);
                }
            } else {
                // visitDate가 null이거나 비어 있는 경우 처리 (예: 기본값 설정 또는 예외 던지기)
                throw new IllegalArgumentException("visitDate 값이 null이거나 비어 있습니다.");
            }
            courseDetail.setMemo((String) courseDetailMap.get("memo"));

            // 서비스 레이어를 통해 코스를 생성합니다.
            courseHomeReview2Service.createCourse(course, courseDetail);

            return "코스가 성공적으로 생성되었습니다.";
        } catch (Exception e) {
            logger.error("코스 생성 중 오류 발생", e);
            return "코스 생성에 실패하였습니다.";
        }
    }
    @PostMapping("/createOrUpdateCourse")
    public String createOrUpdateCourse(@RequestBody HashMap<String, Object> requestData) {
        try {
            CourseDto course = new CourseDto();
            course.setUserId((String) requestData.get("userId"));
            course.setNickname((String) requestData.get("nickname"));
            course.setCourseName((String) requestData.get("courseName"));
            course.setColor((String) requestData.get("color"));

            HashMap<String, Object> courseDetailMap = (HashMap<String, Object>) requestData.get("courseDetail");
            CourseDetailDto courseDetail = new CourseDetailDto();
            courseDetail.setUserId((String) requestData.get("userId"));
            courseDetail.setLocation((String) courseDetailMap.get("location"));

            String visitDateString = (String) courseDetailMap.get("visitDate");
            if (visitDateString != null && !visitDateString.isEmpty()) {
                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
                    LocalDate localDate = LocalDate.parse(visitDateString, formatter);
//                    courseDetail.setVisitDate(localDate);
                    Date date = Date.valueOf(localDate);
                    courseDetail.setVisitDate(date);
                } catch (DateTimeParseException e) {
                    throw new IllegalArgumentException("잘못된 날짜 형식: " + visitDateString, e);
                }
            } else {
                throw new IllegalArgumentException("visitDate 값이 null이거나 비어 있습니다.");
            }
            courseDetail.setMemo((String) courseDetailMap.get("memo"));

            Integer existingCourseId = Integer.valueOf(courseHomeReview2Service.findCourseIdByUserIdAndCourseName(course.getUserId(), course.getCourseName()));
            if (existingCourseId != null) {
                course.setCourseId(existingCourseId);
                courseHomeReview2Service.updateCourseColorAndModifyDate(existingCourseId, course.getColor());
            } else {
                courseHomeReview2Service.insertCourse(course);
                existingCourseId = Integer.valueOf(courseHomeReview2Service.findCourseIdByUserIdAndCourseName(course.getUserId(), course.getCourseName()));
            }

            // Check for duplicate location
            if (courseHomeReview2Service.isLocationExist(existingCourseId, courseDetail.getLocation())) {
                return "{\"status\":\"error\", \"message\":\"중복된 코스가 있습니다.\"}";
            }

            // Get coordinates from map table
            Map<String, Double> coordinates = courseHomeReview2Service.getCoordinatesByLocation(courseDetail.getLocation());
            courseDetail.setX(coordinates.get("x"));
            courseDetail.setY(coordinates.get("y"));
            courseDetail.setCourseId(existingCourseId);

            courseHomeReview2Service.insertCourseDetail(courseDetail);

            // Return success response with existing flag
            return "{\"status\":\"success\", \"existing\": true}";
        } catch (Exception e) {
            logger.error("코스 생성 중 오류 발생", e);
            return "{\"status\":\"error\", \"message\":\"코스 생성에 실패하였습니다.\"}";
        }
    }

    @GetMapping("/getCourseDetails")
    public Map<String, Object> getCourseDetails(@RequestParam String courseName, @RequestParam String userId) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<CourseDetailDto> courseDetails = courseHomeReview2Service.getCourseDetails(courseName, userId);
            response.put("status", "success");
            response.put("courseList", courseDetails);
        } catch (Exception e) {
            logger.error("코스 세부 정보 가져오기 중 오류 발생", e);
            response.put("status", "error");
            response.put("message", "코스 세부 정보를 가져오는 데 실패하였습니다.");
        }
        return response;
    }

    @PostMapping("/deleteCourseDetail")
    public ResponseEntity<?> deleteCourseDetail(@RequestBody Map<String, String> request) {
        try {
            String userId = request.get("userId");
            String courseName = request.get("courseName");
            String location = request.get("location");
            int courseId = Integer.parseInt(courseHomeReview2Service.findCourseIdByUserIdAndCourseName(userId, courseName));

            System.out.println("Deleting location: " + location + " from courseId: " + courseId);

            int deleteCount = courseHomeReview2Service.deleteCourseDetail(courseId, location);
            if (deleteCount > 0) {
                return ResponseEntity.ok().body(Collections.singletonMap("status", "success"));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "장소 삭제에 실패하였습니다. 다시 시도해주세요."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.singletonMap("message", "장소 삭제에 실패하였습니다. 다시 시도해주세요."));
        }
    }

    @PostMapping("/insertCourse")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> insertCourse(@RequestBody Map<String, Object> requestData) {
        // JSON 데이터에서 courseData와 courseDetailData 추출
        ObjectMapper mapper = new ObjectMapper();
        CourseDto courseDto = mapper.convertValue(requestData.get("courseData"), CourseDto.class);
        List<CourseDetailDto> courseDetailDtoList = mapper.convertValue(requestData.get("courseDetailData"), new TypeReference<List<CourseDetailDto>>() {});

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Course data inserted successfully");
        response.put("data", courseDto);
        logger.debug("courseDto : " + courseDto.toString());
        logger.debug("courseDetailDtoList : " + courseDetailDtoList.toString());

        courseHomeReview2Service.saveCourseDetail(courseDto, courseDetailDtoList);
        return ResponseEntity.ok(response);
    }
}



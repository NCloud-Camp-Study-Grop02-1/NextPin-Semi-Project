package com.nextpin.app.controller;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
public class MypinController {

    private static final Logger logger = LoggerFactory.getLogger(MypinController.class);

    @Autowired
    private MyPinService myPinService;

    @GetMapping("/myPin")
    public ModelAndView myPin(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("mypin/myPin");

        // 세션에서 사용자 정보 가져오기
        UserDto user = (UserDto) session.getAttribute("user");

        // 세션에 사용자 정보가 없는 경우 처리 (로그인하지 않았거나 세션이 만료된 경우)
        String userId;
        if (user == null) {
            userId = "ksy"; // 임의의 사용자 ID 설정
            logger.debug("controller 실행둥.. userId 값 : " + userId);
            //mav.setViewName("redirect:/login"); // 로그인 페이지로 리디렉션
            //return mav;
        } else {
            userId = user.getUserId();
        }

        // 사용자 프로필 정보 가져오기
        UserDto userProfile = myPinService.getUserProfile(userId);
        logger.debug("user 값 : " + userProfile.toString());
        mav.addObject("user", userProfile); // 사용자 프로필 정보를 뷰에 추가

        // 사용자 코스(mypin) 정보 가져오기
        List<CourseDto> userCourseList = myPinService.getUserCourse(userId);
        logger.debug("userCourseList 값 : " + userCourseList.toString());
        for (CourseDto course : userCourseList) {
            logger.debug("Course나와..: " + course.toString());
        }
        mav.addObject("userCourseList", userCourseList); // 사용자 코스 정보를 뷰에 추가

        // 사용자 코스 정보(관심있는코스) 가져오기
        List<CourseDto> userLikeCourseList = myPinService.getUserLikeCourse(userId);
        logger.debug("userCourseList 값 : " + userLikeCourseList.toString());
        for (CourseDto course : userLikeCourseList) {
            logger.debug("Course나와..: " + course.toString());
        }
        mav.addObject("userLikeCourseList", userLikeCourseList); // 사용자 코스 정보를 뷰에 추가

        // 사용자 코스 세부내용 정보 가져오기
        List<CourseDetailDto> userCourseDetailList = myPinService.getUserCourseDetail(userId);
        logger.debug("userCourseDetailList 값 : " + userCourseList.toString());
        for (CourseDetailDto course : userCourseDetailList) {
            logger.debug("Course나와..: " + course.toString());
        }
        mav.addObject("userCourseDetailList", userCourseDetailList); // 사용자 코스 세부내용 정보를 뷰에 추가

        logger.debug("myPin페이지 이동");
        return mav;
    }

    @PostMapping("/editProfileMessage")
    @ResponseBody
    public void editUserProfile(@RequestBody Map<String, Object> userDto){

        boolean dbprocess = false;
        String rtnMessage = "";

//        myPinService.updateProfile(sendData);
        if(!dbprocess){
            rtnMessage = "db 저장 성공";
        } else {
            rtnMessage = "db 저장 실패";
        }

        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserProfile(userDto);
    }
    //Q.프로필 메시지를 수정하면
    // 수정된 message값을 받아서 그에 해당하는 userId의 message 값을 바꿔주면 되니까
    // return값은 필요없는거 아닌가요?
    // 어차피 userId의 message값을 select해서 화면에 표출되도록 구현해놨으니
    // return문 없이 db값을 수정만 해주면 알아서 그 값이 표출되는거 아닌가유??

    @PostMapping("/editCourseOpenClose")
    @ResponseBody
    public void editUserCourse1(@RequestBody CourseDto courseDto){

        logger.debug("courseDto : " + courseDto.toString());

        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserCourse1(courseDto);
    }

    @PostMapping("/editCourseColor")
    @ResponseBody
    public void editUserCourse2(@RequestBody CourseDto courseDto){

        logger.debug("courseDto : " + courseDto.toString());
        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserCourse2(courseDto);
    }

    @PostMapping("/editCourseName")
    @ResponseBody
    public void editUserCourse3(@RequestBody CourseDto courseDto){

        logger.debug("courseDto : " + courseDto.toString());
        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserCourse3(courseDto);
    }

    @PostMapping("/editBookMark")
    @ResponseBody
    public void editUserBookMark(@RequestBody CourseDto courseDto){

        logger.debug("courseDto : " + courseDto.toString());
        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserBookMark(courseDto);
    }

}
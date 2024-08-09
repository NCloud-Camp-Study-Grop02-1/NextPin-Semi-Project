package com.nextpin.app.controller;

import com.nextpin.app.dto.*;
import com.nextpin.app.service.MyPinService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class MypinController {

    private static final Logger logger = LoggerFactory.getLogger(MypinController.class);
    private MyPinService myPinService;

    @Autowired
    public MypinController(MyPinService myPinService) {
        this.myPinService = myPinService;
    }

    @GetMapping("/myPin")
    public ModelAndView myPin(HttpSession session, Model model) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("mypin/myPin");


        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId;

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리 (로그인하지 않았거나 세션이 만료된 경우)
            mav.setViewName("redirect:/login"); // 로그인 페이지로 리디렉션
            return mav;
        }


        List<Map<String, Object>> mapList = new ArrayList<>();
        List<Map<String, Object>> mapList2 = new ArrayList<>();


        // 사용자 프로필 정보 가져오기
        UserDto userProfile = myPinService.getUserProfile(userId);
        logger.debug("user 값 : " + userProfile.toString());
        mav.addObject("user", userProfile); // 사용자 프로필 정보를 뷰에 추가

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");


        // 사용자 코스(mypin) 정보 가져오기
        List<CourseDto> userCourseList = myPinService.getUserCourse(userId);

        userCourseList.forEach(courseDto -> {
            Map<String, Object> map = new HashMap<>();
            map.put("course", courseDto);
            List<CourseDetailDto> userCourseDetailList = myPinService.getUserCourseDetail(userId, courseDto.getCourseId());

            // Date 형식을 String 형식으로 변환
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            // visitDate 개수를 계산하여 CourseDetailDto에 설정
            Map<String, Long> visitCounts = userCourseDetailList.stream()
                    .collect(Collectors.groupingBy(
                            detail -> sdf.format(detail.getVisitDate()),
                            Collectors.counting()
                    ));

            userCourseDetailList.forEach(detail -> {
                detail.setVisitDateCount(visitCounts.get(sdf.format(detail.getVisitDate())));
            });

            // userId, courseId와 visitDate로 정렬 후 visitOrder 설정
            userCourseDetailList.sort(Comparator
                    .comparing((CourseDetailDto detail) -> Optional.ofNullable(detail.getUserId()).orElse(""))
                    .thenComparing(detail -> Optional.ofNullable(detail.getCourseId()).orElse(0))
                    .thenComparing(detail -> Optional.ofNullable(detail.getVisitDate()).orElse(new Date(0))));

            Map<String, Integer> visitOrderMap = new HashMap<>();
            Date previousVisitDate = null;
            int currentOrder = 0;

            for (CourseDetailDto detail : userCourseDetailList) {
                String key = detail.getUserId() + "-" + detail.getCourseId();
                if (!detail.getVisitDate().equals(previousVisitDate)) {
                    currentOrder++;
                    previousVisitDate = detail.getVisitDate();
                }
                detail.setVisitOrder(currentOrder);
                visitOrderMap.put(key, currentOrder);
                logger.debug("Visit Order 설정됨 - userId: " + detail.getUserId() + ", courseId: " + detail.getCourseId() + ", visitOrder: " + detail.getVisitOrder());
            }




            map.put("courseDetail", userCourseDetailList);

            mapList.add(map);
        });

        mav.addObject("userCourseList", mapList);


        //mav.addObject("userCourseList", userCourseList); // 사용자 코스 정보를 뷰에 추가


        // 사용자 코스 정보(관심있는코스) 가져오기
        List<CourseDto> userLikeCourseList = myPinService.getUserLikeCourse(userId);

        userLikeCourseList.forEach(courseDto -> {
            Map<String, Object> map2 = new HashMap<>();
            map2.put("course", courseDto);
            List<CourseDetailDto> userCourseDetailList = myPinService.getUserCourseDetail(userId, courseDto.getCourseId());

            // Date 형식을 String 형식으로 변환
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            // visitDate 개수를 계산하여 CourseDetailDto에 설정
            Map<String, Long> visitCounts = userCourseDetailList.stream()
                    .collect(Collectors.groupingBy(
                            detail -> sdf.format(detail.getVisitDate()),
                            Collectors.counting()
                    ));

            userCourseDetailList.forEach(detail -> {
                detail.setVisitDateCount(visitCounts.get(sdf.format(detail.getVisitDate())));
            });


            // userId, courseId와 visitDate로 정렬 후 visitOrder 설정
            userCourseDetailList.sort(Comparator
                    .comparing((CourseDetailDto detail) -> Optional.ofNullable(detail.getUserId()).orElse(""))
                    .thenComparing(detail -> Optional.ofNullable(detail.getCourseId()).orElse(0))
                    .thenComparing(detail -> Optional.ofNullable(detail.getVisitDate()).orElse(new Date(0))));

            Map<String, Integer> visitOrderMap2 = new HashMap<>();
            Date previousVisitDate = null;
            int currentOrder = 0;

            for (CourseDetailDto detail : userCourseDetailList) {
                String key = detail.getUserId() + "-" + detail.getCourseId();
                if (!detail.getVisitDate().equals(previousVisitDate)) {
                    currentOrder++;
                    previousVisitDate = detail.getVisitDate();
                }
                detail.setVisitOrder(currentOrder);
                visitOrderMap2.put(key, currentOrder);
                logger.debug("Visit Order 설정됨 - userId: " + detail.getUserId() + ", courseId: " + detail.getCourseId() + ", visitOrder: " + detail.getVisitOrder());
            }

            System.out.println(userLikeCourseList);

            map2.put("courseDetail", userCourseDetailList);

            mapList2.add(map2);
        });

        // 사용자 코스 세부내용 정보 가져오기
        mav.addObject("userLikeCourseList", mapList2);

        //mav.addObject("userLikeCourseList", userLikeCourseList); // 사용자 코스 정보를 뷰에 추가


        return mav;
    }

    @PostMapping("/editProfileMessage")
    @ResponseBody
    public void editUserProfile(HttpSession session, @RequestBody Map<String, Object> userDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId;

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("User not logged in");
            return;
        }

        // userId를 courseDto에 설정
        userDto.put("userId", userId);

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
    public void editUserCourse1(HttpSession session, @RequestBody CourseDto courseDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId;

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("User not logged in");
            return;
        }

        // userId를 courseDto에 설정
        courseDto.setUserId(userId);

        logger.debug("courseDto : " + courseDto.toString());

        // 사용자 프로필 메시지 변경하기
        // CourseDto에 userId, message 값 담아서 넘겨줄거임.
        myPinService.editUserCourse1(courseDto);
    }

    @PostMapping("/editCourseColor")
    @ResponseBody
    public void editUserCourse2(HttpSession session, @RequestBody CourseDto courseDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId;

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("컬러 편집 User not logged in");
            return;
        }

        // userId를 courseDto에 설정
        courseDto.setUserId(userId);

        logger.debug("컬러편집의 courseDto : " + courseDto);

        myPinService.editUserCourse2(courseDto);
    }

    @PostMapping("/editCourseName")
    @ResponseBody
    public void editUserCourse3(HttpSession session, @RequestBody CourseDto courseDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId = "";

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("컬러 편집 User not logged in");
        }

        // userId를 courseDto에 설정
        courseDto.setUserId(userId);

        logger.debug("courseDto : " + courseDto.toString());

        myPinService.editUserCourse3(courseDto);
    }

    @PostMapping("/deleteCourse2")
    @ResponseBody
    public CourseDto deleteUserCourse(HttpSession session, @RequestBody CourseDto courseDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId = "";

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("컬러 편집 User not logged in");
        }
        
        
        // userId를 courseDto에 설정
        courseDto.setUserId(userId);
        
        try {
            logger.debug("courseDto : " + courseDto.toString());
            myPinService.deleteUserCourse(courseDto);
            courseDto.setStatus("success");
            courseDto.setMessage("삭제 성공");
        } catch (Exception e) {
            courseDto.setStatus("error");
            courseDto.setMessage("삭제 실패");
        }
        return courseDto;
    }


    @PostMapping("/editBookMark")
    @ResponseBody
    public void editUserBookMark(HttpSession session, @RequestBody CourseAndDetailDto courseAndDetailDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId;

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            userId = "";
            // 사용자 정보가 없는 경우 처리
            logger.error("컬러 편집 User not logged in");

        }

        Map<String, Object> mapList3 = new HashMap<>();

        // 사용자 코스(mypin) 정보 가져오기
        List<CourseDto> userCourseList = myPinService.getUserCourse(userId);

        userCourseList.forEach(courseDto -> {
            Map<String, Object> map = new HashMap<>();
            map.put("course", courseDto);
            List<CourseDetailDto> userCourseDetailList = myPinService.getUserCourseDetail(userId, courseDto.getCourseId());

            // Date 형식을 String 형식으로 변환
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");


            // userId, courseId와 visitDate로 정렬 후 visitOrder 설정
            userCourseDetailList.sort(Comparator
                    .comparing((CourseDetailDto detail) -> Optional.ofNullable(detail.getUserId()).orElse(""))
                    .thenComparing(detail -> Optional.ofNullable(detail.getCourseId()).orElse(0))
                    .thenComparing(detail -> Optional.ofNullable(detail.getVisitDate()).orElse(new Date(0))));

            Map<String, Integer> visitOrderMap = new HashMap<>();
            Date previousVisitDate = null;
            int currentOrder = 0;

            for (CourseDetailDto detail : userCourseDetailList) {
                String key = detail.getUserId() + "-" + detail.getCourseId();
                if (!detail.getVisitDate().equals(previousVisitDate)) {
                    currentOrder++;
                    previousVisitDate = detail.getVisitDate();
                }
                detail.setVisitOrder(currentOrder);
                visitOrderMap.put(key, currentOrder);
            }


            map.put("courseDetail", userCourseDetailList);

        });

//        mav.addObject("userCourseList", mapList3);



        logger.debug("editBookMark의 courseDto : " + courseAndDetailDto.toString());

        myPinService.editUserBookMark(mapList3);
    }

    @PostMapping("/deleteCourseDetail2")
    @ResponseBody
    public CourseDetailDto deleteUserCourseDetail(HttpSession session, @RequestBody CourseDetailDto courseDetailDto){

        // 세션에서 사용자 정보 가져오기
        Object userObj = session.getAttribute("loginMember");
        String userId = "";

        if (userObj instanceof MemberDto) {
            MemberDto user = (MemberDto) userObj;
            userId = user.getUserId();
        } else if (userObj instanceof UserDto) {
            UserDto user = (UserDto) userObj;
            userId = user.getUserId();
        } else {
            // 사용자 정보가 없는 경우 처리
            logger.error("컬러 편집 User not logged in");

        }
        CourseDetailDto deleteBeforeCheckDetailDto = myPinService.selectBeforeDeleteCheckDetailDto(courseDetailDto.getCourseDetailId());
        // userId를 courseDto에 설정
        courseDetailDto.setUserId(userId);
        courseDetailDto.setLocation(deleteBeforeCheckDetailDto.getLocation());

        try {
            logger.debug("courseDetailDto : " + courseDetailDto.toString());
            myPinService.deleteUserCourseDetail(courseDetailDto);
            courseDetailDto.setStatus("success");
            courseDetailDto.setMessage("삭제 성공");
        } catch (Exception e) {
            courseDetailDto.setStatus("error");
            courseDetailDto.setMessage("삭제 실패");
        }
        return courseDetailDto;
    }

//    @PostMapping("/deleteCourseDetail2")
//    @ResponseBody
//    public void deleteUserCourse(HttpSession session, @RequestBody CourseDetailDto courseDetailDto){
//
//        // 세션에서 사용자 정보 가져오기
//        Object userObj = session.getAttribute("loginMember");
//        String userId;
//
//        if (userObj instanceof MemberDto) {
//            MemberDto user = (MemberDto) userObj;
//            userId = user.getUserId();
//        } else if (userObj instanceof UserDto) {
//            UserDto user = (UserDto) userObj;
//            userId = user.getUserId();
//        } else {
//            // 사용자 정보가 없는 경우 처리
//            logger.error("컬러 편집 User not logged in");
//            return;
//        }
//
//        // userId를 courseDto에 설정
//        courseDetailDto.setUserId(userId);
//
//        logger.debug("courseDetailDto : " + courseDetailDto.toString());
//
//        myPinService.deleteUserCourseDetail(courseDetailDto);
//    }

}

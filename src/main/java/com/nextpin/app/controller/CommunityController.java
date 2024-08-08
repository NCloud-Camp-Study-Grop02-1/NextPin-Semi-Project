package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.CommunityService;
import com.nextpin.app.service.MyPinService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/community") // 클래스 레벨의 RequestMapping 추가
public class CommunityController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CommunityController.class);
    private final CommunityService communityService;
    private final MyPinService myPinService;

    @Autowired
    public CommunityController(CommunityService communityService, MyPinService myPinService) {
        this.communityService = communityService;
        this.myPinService = myPinService;
    }

    @GetMapping("")
    public ModelAndView community(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("community/community");

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

        List<Map<CourseDto, List<CourseDetailDto>>> courseListMapData = communityService.getCourseListMapData();
//        logger.debug("-------------------------------------------");
//        logger.debug("courseListMap : " + courseListMap.toString());
//        logger.debug("-------------------------------------------");

        mav.addObject("courseListMap", courseListMapData);

        // 사용자 프로필 정보 가져오기
        UserDto userProfile = myPinService.getUserProfile(userId);
        mav.addObject("user", userProfile);

        logger.debug("community페이지 이동");
        return mav;
    }

    @PostMapping("/updateLikeStatus")
    public ResponseEntity<Map<String, Object>> updateLikeStatus(@RequestBody Map<String, Object> request) {
        int courseId = Integer.parseInt(request.get("courseId").toString());
        String userId = (String) request.get("userId");
        boolean isLiked = (boolean) request.get("isLiked");
        int increment = (int) request.get("increment");

        boolean success;
        if (isLiked) {
            success = communityService.addLike(courseId, userId);
        } else {
            success = communityService.removeLike(courseId, userId);
        }

        if (success) {
            communityService.updateHeartCount(courseId, increment);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getUserLikes")
    public ResponseEntity<List<Integer>> getUserLikes(@RequestParam String userId) {
        List<Integer> likedCourseIds = communityService.getUserLikedCourses(userId);
        return ResponseEntity.ok(likedCourseIds);
    }
}

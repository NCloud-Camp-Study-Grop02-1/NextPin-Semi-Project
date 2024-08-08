package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.service.CommunityService;
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

    @Autowired
    public CommunityController(CommunityService communityService) {
        this.communityService = communityService;
    }

    @GetMapping("")
    public ModelAndView community() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("community/community");

        List<Map<CourseDto, List<CourseDetailDto>>> courseListMap = communityService.getCourseListMap();

        logger.debug("-------------------------------------------");
        logger.debug("courseListMap : " + courseListMap.toString());
        logger.debug("-------------------------------------------");

        mav.addObject("courseListMap", courseListMap);

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

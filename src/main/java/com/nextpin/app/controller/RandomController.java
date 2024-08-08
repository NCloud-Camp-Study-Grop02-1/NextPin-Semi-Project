package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RandomController {

    private Logger logger = (Logger) LoggerFactory.getLogger(RandomController.class);
    private final MyPinService myPinService;

    @Autowired
    public RandomController(MyPinService myPinService) {
        this.myPinService = myPinService;
    }

    @GetMapping("/randomPin")
    public ModelAndView randomPin(HttpSession session) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("randomPin/randomPin");

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
        // 사용자 프로필 정보 가져오기
        UserDto userProfile = myPinService.getUserProfile(userId);
        mav.addObject("user", userProfile);

        logger.debug("randomPin페이지 이동");
        return mav;
    }
}

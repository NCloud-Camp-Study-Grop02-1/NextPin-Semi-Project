package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MypinController {

    private Logger logger = (Logger) LoggerFactory.getLogger(MypinController.class);

    @GetMapping("/myPin")
    public ModelAndView myPin() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("mypin/myPin");

        logger.debug("myPin페이지 이동");
        return mav;
    }

    @Controller
    @RequestMapping("/mypin")
    public class MyPinController {
        @Autowired
        private MyPinService myPinService;

        // 기존 메소드...

        @GetMapping("/user/{userId}")
        public String getUserDetails(@PathVariable String userId, Model model) {
            UserDto user = myPinService.getUserProfile(userId);
            model.addAttribute("nickname", user.getNickname());
            model.addAttribute("message", user.getMessage());
            model.addAttribute("profileURL", user.getProfileURL());
            return "mypin/mypin";
        }
    }

}

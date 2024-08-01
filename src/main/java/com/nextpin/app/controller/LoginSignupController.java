package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginSignupController {

    private Logger logger = (Logger) LoggerFactory.getLogger(LoginSignupController.class);

    @GetMapping("/login")
    public ModelAndView login() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/login");

        logger.debug("login페이지 이동");
        return mav;
    }

    @GetMapping("/signUp")
    public ModelAndView signUp() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/signUp");

        logger.debug("signUp페이지 이동");
        return mav;
    }
}

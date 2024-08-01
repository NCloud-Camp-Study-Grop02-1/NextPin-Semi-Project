package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MypageController {

    private Logger logger = (Logger) LoggerFactory.getLogger(MypageController.class);

    @GetMapping("/userPage")
    public ModelAndView userPage() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("mypage/userPage");

        logger.debug("userPage페이지 이동");
        return mav;
    }
}

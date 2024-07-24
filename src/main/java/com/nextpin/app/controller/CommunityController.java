package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CommunityController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CommunityController.class);

    @GetMapping("/community")
    public ModelAndView community() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("community/community");

        logger.debug("community페이지 이동");
        return mav;
    }
}

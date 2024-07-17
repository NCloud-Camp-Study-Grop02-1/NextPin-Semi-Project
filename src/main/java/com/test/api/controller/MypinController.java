package com.test.api.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
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
}

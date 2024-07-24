package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RandomController {

    private Logger logger = (Logger) LoggerFactory.getLogger(RandomController.class);

    @GetMapping("/randomPin")
    public ModelAndView randomPin() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("randomPin/randomPin");

        logger.debug("randomPin페이지 이동");
        return mav;
    }
}

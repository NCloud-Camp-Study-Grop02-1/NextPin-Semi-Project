package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class CalendarController {

    private Logger logger = (Logger) LoggerFactory.getLogger(CalendarController.class);

    // 캘린더 페이지로 이동
    @GetMapping("/calendar")
    public ModelAndView calendarView() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("calendar/calendar");

        logger.debug("calendar페이지 이동");
        return mav;
    }
}

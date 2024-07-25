package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.KakaoMapDataRestore;
import com.nextpin.app.service.OctoparseData;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MainController {

    private Logger logger = (Logger) LoggerFactory.getLogger(MainController.class);
    private final OctoparseData octoparseData;
    private final KakaoMapDataRestore kakaoMapDataRestore;

    @GetMapping("/")
    public ModelAndView index() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");

        logger.debug("index페이지 이동");
        return mav;
    }

    @GetMapping("/main")
    public ModelAndView main() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("main");

        logger.debug("main페이지 이동");
        return mav;
    }

    @GetMapping("/getData")
    public void getData() {
        logger.debug("getData 실행");
        octoparseData.getData();
    }

    @PostMapping("/kakaoData")
    @ResponseBody
    public void kakaoData(@RequestBody List<KakaoMapDto> data){
        logger.debug("ajax 받은 데이터 : " + data.toString());
        logger.debug("ajax 받은 데이터 개수 : " + data.size());
        kakaoMapDataRestore.restore(data);
//        kakaoMapDataRestore.testRestore(data.get(0));
    }
}

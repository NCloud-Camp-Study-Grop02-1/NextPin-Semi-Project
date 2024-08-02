package com.nextpin.app.service.impl;

import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextpin.app.dao.CourseDao;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.dto.KakaoMapReviewDto;
import com.nextpin.app.service.CourseService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseServiceImpl implements CourseService {

    private Logger logger = (Logger) LoggerFactory.getLogger(CourseServiceImpl.class);
    private CourseDao courseDao;

    @Autowired
    public CourseServiceImpl(CourseDao courseDao) {
        this.courseDao = courseDao;
    }

    @Override
    public List<KakaoMapDto> getAddressDatas() {
        return courseDao.getAddressDatas();
    }

    public List<KakaoMapDto> getUpdateForData() { return courseDao.getUpdateForData(); }

    @Override
    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList) {
        courseDao.updateAddressConversion(kakaoMapDtoList);
    }

    public void updateForData(List<KakaoMapDto> kakaoMapDtoList) {
        courseDao.updateForData(kakaoMapDtoList);
    }

    @Override
    public KakaoMapDto searchPinDetail(int id) {
        return courseDao.searchPinDetail(id);
    }

    @Override
    public List<KakaoMapReviewDto> searchPinDetailReview(int id) {
        return courseDao.searchPinDetailReview(id);
    }

    @Override
    public String searchPinDatas(HashMap<String, String> searchKeywords, Criteria cri) {
        if(null != searchKeywords.get("pageNum") && !searchKeywords.get("pageNum").equals("")){
            cri.setPageNum(Integer.parseInt(searchKeywords.get("pageNum")));
        }
        cri.setStartNum((cri.getPageNum() - 1) * cri.getAmount());

        Map<String, Object> paramMap = new HashMap<>();
        //{"searchKewords" : {"keyword" : keyword, "keyword2" : keyword2, "category" : category}}
        paramMap.put("searchKewords", searchKeywords);
//        Criteria cri1 = new Criteria();
//        cri1.setAmount(2);
//        Criteria cri2 = new Criteria();
//        cri.setAmount(3);
        paramMap.put("cri", cri);

        List<KakaoMapDto> pinDatas = courseDao.searchPinDatas(paramMap);

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();

        if(null != searchKeywords.get("keyword2") && !searchKeywords.get("keyword2").equals("")) {
            jsonMap.put("pageNum", cri.getPageNum());
            jsonMap.put("amount", cri.getAmount());
            jsonMap.put("data", pinDatas);
            jsonMap.put("cnt", getPinDatasCnt(searchKeywords));
        } else {
            jsonMap.put("pageNum", cri.getPageNum());
            jsonMap.put("amount", cri.getAmount());
            jsonMap.put("data", pinDatas);
            jsonMap.put("cnt", getPinDatasCnt(searchKeywords));
        }

        String jsonString = "";

        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(jsonMap);
        } catch(JsonProcessingException je){
            logger.error(je.getMessage());
        }
        return jsonString;
    }

    @Override
    public int getPinDatasCnt(HashMap<String, String> searchKeywords) {
        return courseDao.getPinDatasCnt(searchKeywords);
    }

    @Override
    public List<KakaoMapReviewDto> searchPinDetailReview(int id) {
        return courseDao.searchPinDetailReview(id);
    }
}
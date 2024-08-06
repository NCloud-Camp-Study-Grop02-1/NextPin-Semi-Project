package com.nextpin.app.dao;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.*;
import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.dto.KakaoMapReviewDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class CourseDao {
    private Logger logger = (Logger) LoggerFactory.getLogger(CourseDao.class);
    private SqlSessionTemplate mybatis;

    @Autowired
    public CourseDao(SqlSessionTemplate sqlSessionTemplate) {
        this.mybatis = sqlSessionTemplate;
    }

    public List<KakaoMapDto> getAddressDatas() {
        logger.debug("주소 데이터 select");
        return mybatis.selectList("MainCourseMapper.getAddressDatas");
    }

    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList){
        for(int i = 0; i <kakaoMapDtoList.size(); i++){
            mybatis.update("DataMapper.updateAddressConversion", kakaoMapDtoList.get(i));
        }
    }

    public List<KakaoMapDto> getUpdateForData(){
        return mybatis.selectList("MainCourseMapper.getUpdateForData");
    }

    public void updateForData(List<KakaoMapDto> kakaoMapDtoList){
        Map<String, Object> dataMap = new HashMap<>();
        for(int i = 0; i <kakaoMapDtoList.size(); i++){
            dataMap.put("newId", i + 1522);
            dataMap.put("id", kakaoMapDtoList.get(i).getId());
            mybatis.update("DataMapper.updateForData", dataMap);
        }
    }

    public KakaoMapDto searchPinDetail(int id){
        return mybatis.selectOne("MainCourseMapper.searchPinDetail", id);
    }

    public List<KakaoMapReviewDto> searchPinDetailReview(int id){
        return mybatis.selectList("MainCourseMapper.searchPinDetailReview", id);
    }

    public List<KakaoMapDto> searchPinDatas(Map<String, Object> paramMap){
        Criteria criteria = (Criteria) paramMap.get("cri");
        logger.debug("검색어 : " + paramMap.get("searchKewords").toString() + criteria.getPageNum() + "페이지에 관한 데이터들 가져오기");

//        paramMap.put("keyword", keyword);
//        paramMap.put("category", "food");
//        List<KakaoMapDto> foodc = mybatis.selectList("DataMapper.searchPinDatas", paramMap);
//        List<KakaoMapDto> cafec = mybatis.selectList("DataMapper.searchPinDatas", paramMap);
//        List<KakaoMapDto> tourc = mybatis.selectList("DataMapper.searchPinDatas", paramMap);
//        List<KakaoMapDto> hotelc = mybatis.selectList("DataMapper.searchPinDatas", paramMap);
        return mybatis.selectList("MainCourseMapper.searchPinDatas", paramMap);
    }

    public int getPinDatasCnt(HashMap<String, String> searchKeywords){
        return mybatis.selectOne("MainCourseMapper.getPinTotalCnt", searchKeywords);
    }
}

package com.nextpin.app.dao;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.KakaoMapDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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
        return mybatis.selectList("DataMapper.getAddressDatas");
    }

    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList){
        for(int i = 0; i <kakaoMapDtoList.size(); i++){
            mybatis.update("DataMapper.updateAddressConversion", kakaoMapDtoList.get(i));
        }
    }
    public KakaoMapDto searchPinDetail(int id){
        return mybatis.selectOne("DataMapper.searchPinDetail", id);
    }

    public List<KakaoMapDto> searchPinDatas(Map<String, Object> paramMap){
        Criteria criteria = (Criteria) paramMap.get("cri");
        logger.debug("검색어 : " + paramMap.get("searchKewords").toString() + criteria.getPageNum() + "페이지에 관한 데이터들 가져오기");
        return mybatis.selectList("DataMapper.searchPinDatas", paramMap);
    }

    public int getPinDatasCnt(HashMap<String, String> searchKeywords){
        return mybatis.selectOne("DataMapper.getPinTotalCnt", searchKeywords);
    }
}

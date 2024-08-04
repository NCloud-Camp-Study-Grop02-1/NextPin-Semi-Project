package com.nextpin.app.dao;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.dto.KakaoMapReviewDto;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CsvDataRestoreDao {
    private Logger logger = (Logger) LoggerFactory.getLogger(CsvDataRestoreDao.class);
    private SqlSessionTemplate mybatis;

    @Autowired
    public CsvDataRestoreDao(SqlSessionTemplate sqlSessionTemplate) {
        this.mybatis = sqlSessionTemplate;
    }
    public void insertCrowlData(List<KakaoMapDto> csvDataList){
        logger.info("insert crowl data");
        logger.debug("insert 실행전 확인 : " + csvDataList.toString());
        logger.debug("businessHour 확인 : " + csvDataList.get(0).getBusinessHour());
        logger.debug("phone 확인 : " + csvDataList.get(0).getPhone());
        mybatis.insert("DataMapper.crowlData", csvDataList);
        logger.info("insert crowl data success");
    }

    public void mergeCsvData(List<KakaoMapDto> csvDataList){
        for(KakaoMapDto csvData : csvDataList){
            mybatis.update("DataMapper.mergeData", csvData);
        }
    }

    public void mergeCsvReviewData(List<KakaoMapReviewDto> csvReviewDataList){
        for(KakaoMapReviewDto csvReviewData : csvReviewDataList){
            mybatis.update("DataMapper.mergeReviewData", csvReviewData);
        }
    }
}

package com.nextpin.app.dao;

import com.nextpin.app.dto.KakaoMapDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PlaceDao {

    @Autowired
    private SqlSession sqlSession;
//    private static final String NAMESPACE = "com.nextpin.app.mapper.PlaceMapper";


    public List<KakaoMapDto> getAllPlaces() {
        return sqlSession.selectList("PlaceMapper.getAllPlaces");
    }


    public List<KakaoMapDto> getPlacesByKeyword(Map<String, Object> paramMap) {
        return sqlSession.selectList("PlaceMapper.getPlacesByKeyword", paramMap);
    }
}
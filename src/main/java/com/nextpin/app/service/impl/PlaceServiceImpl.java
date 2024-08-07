package com.nextpin.app.service.impl;

import com.nextpin.app.dao.PlaceDao;
import com.nextpin.app.dto.KakaoMapDto;
import com.nextpin.app.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceDao placeDAO;

    @Override
    public List<KakaoMapDto> getAllPlaces() {
        return placeDAO.getAllPlaces();
    }

    @Override
    public List<KakaoMapDto> getPlacesByKeyword(String keyword) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("keyword", keyword);

        paramMap.put("category", "food");
        paramMap.put("cnt", 2);
        List<KakaoMapDto> foodList = placeDAO.getPlacesByKeyword(paramMap);

        paramMap.put("category", "cafe");
        paramMap.put("cnt", 1);
        List<KakaoMapDto> cafeList = placeDAO.getPlacesByKeyword(paramMap);

        paramMap.put("category", "tour");
        paramMap.put("cnt", 1);
        List<KakaoMapDto> tourList = placeDAO.getPlacesByKeyword(paramMap);

        paramMap.put("category", "hotel");
        paramMap.put("cnt", 1);
        List<KakaoMapDto> hotelList = placeDAO.getPlacesByKeyword(paramMap);

        List<KakaoMapDto> rtnList = new ArrayList<>();
        rtnList.addAll(foodList);
        rtnList.addAll(cafeList);
        rtnList.addAll(tourList);
        rtnList.addAll(hotelList);

        return rtnList;
    }
}
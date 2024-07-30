package com.nextpin.app.service;

import com.nextpin.app.dto.Criteria;
import com.nextpin.app.dto.KakaoMapDto;

import java.util.HashMap;
import java.util.List;

public interface CourseService {
    public List<KakaoMapDto> getAddressDatas();

    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList);

    public String searchPinDetail(int id);

    public String searchPinDatas(HashMap<String, String> searchKeywords, Criteria cri);

    public int getPinDatasCnt(HashMap<String, String> searchKeywords);

}

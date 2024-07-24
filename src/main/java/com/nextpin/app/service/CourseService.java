package com.nextpin.app.service;

import com.nextpin.app.dto.KakaoMapDto;

import java.util.List;

public interface CourseService {
    public List<KakaoMapDto> getAddressDatas();

    public void updateAddressConversion(List<KakaoMapDto> kakaoMapDtoList);
}

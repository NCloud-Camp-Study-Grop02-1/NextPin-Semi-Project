package com.nextpin.app.service;

import com.nextpin.app.dto.KakaoMapDto;

import java.util.List;

public interface PlaceService {
    List<KakaoMapDto> getAllPlaces();
    List<KakaoMapDto> getPlacesByKeyword(String keyword);
}

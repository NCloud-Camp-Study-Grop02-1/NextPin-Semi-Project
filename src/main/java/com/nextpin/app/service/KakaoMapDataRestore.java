package com.nextpin.app.service;

import com.nextpin.app.dto.KakaoMapDto;

import java.util.List;

public interface KakaoMapDataRestore {
    public void restore(List<KakaoMapDto> data);

    public void testRestore(KakaoMapDto kakaoMapDto);
}

package com.nextpin.app.mapper;

import com.nextpin.app.dto.KakaoMapDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DataMapper {
    void kakaoInsert(List<KakaoMapDto> data);

    void kakaoTestInsert(KakaoMapDto kakaoMapDto);
}

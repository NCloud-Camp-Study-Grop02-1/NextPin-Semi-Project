package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class KakaoMapDto {
    long id;
    String categoryGroupCode;
    String categoryGroupName;
    String categoryName;
    String placeName;
    double score;
    String addressName;
    String roadAddressName;
    String businessHour;
    String phone;
    String courseShare;
    String placeUrl;
    double x;
    double y;
}

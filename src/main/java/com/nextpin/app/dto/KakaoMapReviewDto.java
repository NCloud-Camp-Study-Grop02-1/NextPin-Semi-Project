package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class KakaoMapReviewDto {
    private int id;
    private String placeName;
    private String addressName;
    private String roadAddressName;
    private String userNickName;
    private Date regDate;
    private Date modDate;
    private double score;
    private String comment;
}

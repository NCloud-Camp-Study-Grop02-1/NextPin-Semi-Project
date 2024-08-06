package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class SaveCourseDto {
    private String userId;
    private String nickname;
    private String courseName;
    private Date regDate;
    private Date modifyDate;
    private int bookMark;
    private int heartCnt;
    private int isPublic;
    private String color;

}
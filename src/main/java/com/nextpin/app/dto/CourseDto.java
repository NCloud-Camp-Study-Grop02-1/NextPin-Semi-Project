package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@ToString
public class CourseDto {
    private int courseId;
    private String userId;
    private String nickname;
    private String courseName;
    private String visitDate;
    private LocalDateTime regDate;
    private Date modifyDate;
    private int bookMark;
    private int heartCnt;
    private int openClose;
    private String color;
    private boolean myPinBoolean;
    private boolean likeBoolean;
    private int courseRank;
    private String status;
    private String message;
}

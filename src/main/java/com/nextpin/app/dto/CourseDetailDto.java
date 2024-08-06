package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class CourseDetailDto {
    private int courseId;
    private String location;
    private double x;
    private double y;
    private int day; // 추가된 필드
    private Date visitDate;
    private String memo;

}
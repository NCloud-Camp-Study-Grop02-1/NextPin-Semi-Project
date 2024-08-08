package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CourseDetailDto {
    private int courseDetailId;
    private int courseId;
    private String visitDate;
    private String memo;
    private String color;
    private int day;
}


package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class CourseDetailDto {
    private int courseId;
    private String location;
    private double x;
    private double y;
    private int day;
    private LocalDate visitDate;
    private String memo;
    private String userId;
}

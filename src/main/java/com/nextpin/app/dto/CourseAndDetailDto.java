package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CourseAndDetailDto {
    private CourseDto courseDto;
    private CourseDetailDto courseDetailDto;
}

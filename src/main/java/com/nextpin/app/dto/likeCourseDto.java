package com.nextpin.app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class likeCourseDto {
    private String userId;
    private int courseId;
    private boolean bookMarkBoolean;
}

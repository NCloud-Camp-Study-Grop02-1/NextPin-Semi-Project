package com.nextpin.app.dto;

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
        private LocalDateTime regDate;
        private Date modifyDate;
        private int bookMark;
        private int heartCnt;
        private int openClose;
        private String color;

}

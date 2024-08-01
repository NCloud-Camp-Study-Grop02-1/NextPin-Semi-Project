package com.nextpin.app.dto;

import java.time.LocalDateTime;

public class CourseDto {
        private int courseId;
        private String userId;
        private String nickname;
        private String courseName;
        private LocalDateTime regDate;
        private String color;

        public int getCourseId() {
            return courseId;
        }

        public void setCourseId(int courseId) {
            this.courseId = courseId;
        }

        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }

        public String getNickname() {
            return nickname;
        }

        public void setNickname(String nickname) {
            this.nickname = nickname;
        }

        public String getCourseName() {
            return courseName;
        }

        public void setCourseName(String courseName) {
            this.courseName = courseName;
        }

        public LocalDateTime getRegDate() {
            return regDate;
        }

        public void setRegDate(LocalDateTime regDate) {
            this.regDate = regDate;
        }

        public String getColor() {
            return color;
        }

        public void setColor(String color) {
            this.color = color;
        }

        @Override
        public String toString() {
            return "CourseDTO{" +
                    "courseId=" + courseId +
                    ", userId='" + userId + '\'' +
                    ", nickname='" + nickname + '\'' +
                    ", courseName='" + courseName + '\'' +
                    ", regDate=" + regDate +
                    ", color='" + color + '\'' +
                    '}';
        }


}

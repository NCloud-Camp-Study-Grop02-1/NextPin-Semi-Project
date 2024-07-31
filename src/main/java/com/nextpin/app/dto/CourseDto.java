package com.nextpin.app.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CourseDto {
    public class CourseDTO {
        private int courseId;
        private String userId;  // This will be set later when login is implemented
        private String nickname;
        private String courseName;
        private LocalDateTime regDate;
        private LocalDateTime modifyDate;
        private int bookMark;
        private int heartCnt;
        private boolean openClose;

        private String location; // 방문 장소 이름
        private String x;
        private String y;
        private int day; // 몇일차 일정인지
        private LocalDate visitDate;
        private String memo;
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

        public LocalDateTime getModifyDate() {
            return modifyDate;
        }

        public void setModifyDate(LocalDateTime modifyDate) {
            this.modifyDate = modifyDate;
        }

        public int getBookMark() {
            return bookMark;
        }

        public void setBookMark(int bookMark) {
            this.bookMark = bookMark;
        }

        public int getHeartCnt() {
            return heartCnt;
        }

        public void setHeartCnt(int heartCnt) {
            this.heartCnt = heartCnt;
        }

        public boolean isOpenClose() {
            return openClose;
        }

        public void setOpenClose(boolean openClose) {
            this.openClose = openClose;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getX() {
            return x;
        }

        public void setX(String x) {
            this.x = x;
        }

        public String getY() {
            return y;
        }

        public void setY(String y) {
            this.y = y;
        }

        public int getDay() {
            return day;
        }

        public void setDay(int day) {
            this.day = day;
        }

        public LocalDate getVisitDate() {
            return visitDate;
        }

        public void setVisitDate(LocalDate visitDate) {
            this.visitDate = visitDate;
        }

        public String getMemo() {
            return memo;
        }

        public void setMemo(String memo) {
            this.memo = memo;
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
                    ", modifyDate=" + modifyDate +
                    ", bookMark=" + bookMark +
                    ", heartCnt=" + heartCnt +
                    ", openClose=" + openClose +
                    ", location='" + location + '\'' +
                    ", x='" + x + '\'' +
                    ", y='" + y + '\'' +
                    ", day=" + day +
                    ", visitDate=" + visitDate +
                    ", memo='" + memo + '\'' +
                    ", color='" + color + '\'' +
                    '}';
        }
    }
}

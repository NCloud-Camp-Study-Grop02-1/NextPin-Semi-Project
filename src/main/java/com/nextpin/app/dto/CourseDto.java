package com.nextpin.app.dto;

import java.time.LocalDateTime;
import java.util.Date;

public class CourseDto {
        private int courseId;
        private String userId;
        private String nickname;
        private String courseName;
        private LocalDateTime regDate;
        private Date modifyDate;
        private int bookMark;
        private int heartCnt;
        private boolean isPublic;
        private String color;

    public CourseDto(String userId, String courseName) {
    }

    public CourseDto() {

    }

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

    public Date getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(Date modifyDate) {
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

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    @Override
    public String toString() {
        return "CourseDto{" +
                "courseId=" + courseId +
                ", userId='" + userId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", courseName='" + courseName + '\'' +
                ", regDate=" + regDate +
                ", modifyDate=" + modifyDate +
                ", bookMark=" + bookMark +
                ", heartCnt=" + heartCnt +
                ", isPublic=" + isPublic +
                ", color='" + color + '\'' +
                '}';
    }


}

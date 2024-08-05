package com.nextpin.app.dto;

import java.time.LocalDate;

public class CourseDetailDto {
        private int courseId;
        private String location;
        private double x;
        private double y;
        private LocalDate visitDate;
        private String memo;
        private String userId;

        public int getCourseId() {
            return courseId;
        }

        public void setCourseId(int courseId) {
            this.courseId = courseId;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public double getX() {
            return x;
        }

        public void setX(double x) {
            this.x = x;
        }

        public double getY() {
            return y;
        }

        public void setY(double y) {
            this.y = y;
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "CourseDetailDto{" +
                "courseId=" + courseId +
                ", location='" + location + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", visitDate=" + visitDate +
                ", memo='" + memo + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }

}

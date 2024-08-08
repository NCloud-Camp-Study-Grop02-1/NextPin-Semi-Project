package com.nextpin.app.dto;

public class CourseDetailDto {
    private int courseDetailId;
    private int courseId;
    private String visitDate;
    private String memo;
    private int day;

    public int getCourseDetailId() {
        return courseDetailId;
    }

    public void setCourseDetailId(int courseDetailId) {
        this.courseDetailId = courseDetailId;
    }

    public int getCourseId() {
        return courseId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public String getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }
}


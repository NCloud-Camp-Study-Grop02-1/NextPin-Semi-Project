package com.nextpin.app.dto;

public class CourseDto {
    private String courseName;
    private String visitDate;

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(String visitDate) {
        this.visitDate = visitDate;
    }

    @Override
    public String toString() {
        return "CourseDto{" +
                ", courseName='" + courseName + '\'' +
                ", visitDate='" + visitDate + '\'' +
                '}';
    }
}

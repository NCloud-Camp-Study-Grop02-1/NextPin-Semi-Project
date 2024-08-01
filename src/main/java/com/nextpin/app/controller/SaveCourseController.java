package com.nextpin.app.controller;

import com.nextpin.app.dto.SaveCourseDto;
import com.nextpin.app.service.SaveCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SaveCourseController {


    private SaveCourseService saveCourseService;

    @Autowired
    public SaveCourseController(SaveCourseService saveCourseService) {
        this.saveCourseService = saveCourseService;
    }

    @PostMapping("/insertCourse")
    public ResponseEntity<Map<String, Object>> insertCourse(@RequestBody SaveCourseDto courseData) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Course data inserted successfully");
        response.put("data", courseData);
        saveCourseService.saveCourse(courseData);
        return ResponseEntity.ok(response);
    }
}
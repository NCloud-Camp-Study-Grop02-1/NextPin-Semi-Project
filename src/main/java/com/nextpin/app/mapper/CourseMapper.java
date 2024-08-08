package com.nextpin.app.mapper;

import com.nextpin.app.dto.CourseDetailDto;
import com.nextpin.app.dto.CourseDto;
import com.nextpin.app.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface CourseMapper {
    List<CourseDto> findCourseByUserId(String userId);
    void updateMemo(CourseDetailDto courseDetailDto);
    List<Map<String,Object>> findCourseDetail(String userId);
}

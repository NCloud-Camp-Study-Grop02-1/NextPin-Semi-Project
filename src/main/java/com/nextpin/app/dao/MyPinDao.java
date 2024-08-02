package com.nextpin.app.dao;

import com.nextpin.app.dto.UserDto;
import org.mybatis.spring.SqlSessionTemplate;

public interface MyPinDao {

    // 사용자 정보를 가져오는 메소드 추가
    UserDto getUserDetails(String userId);
}


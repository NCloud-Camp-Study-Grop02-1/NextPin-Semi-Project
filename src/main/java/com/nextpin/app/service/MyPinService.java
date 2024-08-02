package com.nextpin.app.service;

import com.nextpin.app.dto.UserDto;

public interface MyPinService {
    // 기존 메소드...

    // 사용자 정보를 가져오는 메소드 추가
    UserDto getUserDetails(String userId);
}


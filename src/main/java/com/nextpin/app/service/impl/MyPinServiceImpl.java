package com.nextpin.app.service.impl;

import com.nextpin.app.dao.MyPinDao;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyPinServiceImpl implements MyPinService {
    @Autowired
    private MyPinDao myPinDao;

    // 기존 메소드...

    @Override
    public UserDto getUserDetails(String userId) {
        return myPinDao.getUserDetails(userId);
    }
}


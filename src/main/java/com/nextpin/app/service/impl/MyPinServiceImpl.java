package com.nextpin.app.service.impl;

import com.nextpin.app.dao.MyPinDao;
import com.nextpin.app.dto.UserDto;
import com.nextpin.app.service.MyPinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyPinServiceImpl implements MyPinService {
    private MyPinDao myPinDao;

    @Autowired
    public MyPinServiceImpl(MyPinDao myPinDao){ this.myPinDao = myPinDao;}

    @Override
    public UserDto getUserProfile(String userId){return myPinDao.getUserProfile();}


}


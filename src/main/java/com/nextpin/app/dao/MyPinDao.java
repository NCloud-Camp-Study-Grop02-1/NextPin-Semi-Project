package com.nextpin.app.dao;

import com.nextpin.app.dto.UserDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MyPinDao {
    private SqlSessionTemplate mybatis;

    @Autowired
    public MyPinDao(SqlSessionTemplate sqlSessionTemplate){
        this.mybatis = sqlSessionTemplate;
    }

    public UserDto getUserProfile(){
        System.out.println("MyPinDao의 getUserProfile 메소드 실행...ㅜ,,ㅜ");
        return mybatis.selectOne("MyPinDao.getUserProfile");
    }
}


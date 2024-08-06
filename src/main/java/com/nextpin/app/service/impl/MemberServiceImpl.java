package com.nextpin.app.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.mapper.MemberMapper;
import com.nextpin.app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberServiceImpl implements MemberService {
    private MemberMapper memberMapper;

    @Autowired
    public MemberServiceImpl(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @Override
    public void signUp(MemberDto memberDto) {
        memberMapper.signUp(memberDto);
    }

    @Override
    public List<MemberDto> getMembers() {
        return memberMapper.getMembers();
    }

    @Override
    public MemberDto getMemberByUserId(MemberDto memberDto) {
        return memberMapper.getMemberByUserId(memberDto.getUserId());
    }

    @Override
    public String userIdCheck(String userId) {
//        System.out.println("아이디 체크메소드 들어감-----------");
        int userIdCheck = memberMapper.userIdCheck(userId);

        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> jsonMap = new HashMap<>();

        if(userIdCheck == 0){
//            System.out.println("아이디 체크함---------------------");
            System.out.println(userIdCheck);
            jsonMap.put("userIdCheckMsg", "userIdOk");
        } else if(userIdCheck == 1) {
            jsonMap.put("userIdCheckMsg", "userIdFail");
        }

        String jsonString = "";

        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter()
                                     .writeValueAsString(jsonMap);
        } catch (JsonProcessingException je) {
            System.out.println(je.getMessage());
        }

        return jsonString;
    }

    @Override
    public String userNicknameCheck(String userNickname) {
        int userNicknameCheck = memberMapper.userNicknameCheck(userNickname);

        ObjectMapper objectMapper = new ObjectMapper();

        Map<String, String> jsonMap = new HashMap<>();

        if(userNicknameCheck == 0){
            jsonMap.put("userNicknameCheckMsg", "userNicknameOk");
        } else {
            jsonMap.put("userNicknameCheckMsg", "userNicknameFail");
        }

        String jsonString = "";

        try {
            jsonString = objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValueAsString(jsonMap);
        } catch (JsonProcessingException je) {
            System.out.println(je.getMessage());
        }

        return jsonString;
    }

    @Override
    public MemberDto login(MemberDto memberDto) {
        int userIdCheck = memberMapper.userIdCheck(memberDto.getUserId());

        if(userIdCheck == 0){
            throw new RuntimeException("idNotExist");
        }

        MemberDto loginMember = memberMapper.login(memberDto);

        if(loginMember == null){
            throw new RuntimeException("wrongPassword");
        }

        return loginMember;
    }
}

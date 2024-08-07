package com.nextpin.app.mapper;

import com.nextpin.app.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MemberMapper {
    void signUp(MemberDto memberDto);
    List<MemberDto> getMembers();
    MemberDto getMemberByUserId(String userId);
    int userIdCheck(String userId);
    int userNicknameCheck(String userNickname);
    MemberDto login(MemberDto memberDto);
    MemberDto logout(MemberDto memberDto);
}

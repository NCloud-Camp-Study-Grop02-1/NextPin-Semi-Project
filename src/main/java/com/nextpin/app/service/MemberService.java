package com.nextpin.app.service;

import com.nextpin.app.dto.MemberDto;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MemberService {
    void signUp(MemberDto memberDto);

    List<MemberDto> getMembers();

    MemberDto getMemberByUserId(MemberDto memberDto);

    String userIdCheck(String userId);

    String userNicknameCheck(String nickname);

    MemberDto login(MemberDto memberDto);

    void logout(HttpSession session);
}

package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginSignupController {
    private MemberService memberService;
    private Logger logger = (Logger) LoggerFactory.getLogger(LoginSignupController.class);

    @Autowired
    public LoginSignupController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 로그인 페이지 화면에 출력
    @GetMapping("/login")
    public ModelAndView loginView(MemberDto memberDto, Model model, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/login");
        return mav;
    }

    // 로그인 기능 처리
    @PostMapping("/login")
    public void login(MemberDto memberDto, HttpServletResponse response, HttpSession session) throws IOException {
        MemberDto loginMember = memberService.login(memberDto);

        // 로그인 성공 시 세션에 사용자 정보 저장
        session.setAttribute("loginMember", loginMember);
<<<<<<< HEAD
        session.setAttribute("userId", loginMember.getUserId());
        session.setAttribute("nickname", loginMember.getNickname());
=======
>>>>>>> origin/backend/jangho

        ModelAndView mav = new ModelAndView();
        mav.setViewName("/main");
        response.sendRedirect("/main");
//        System.out.println("로그인 성공");
    }

    // 회원가입 페이지 화면에 출력
    @GetMapping("/signUp")
    public ModelAndView signUpView() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/signUp");

        logger.debug("signUp페이지 이동");
        return mav;
    }

    // 회원가입 처리
    @PostMapping("/signUp")
    public void signUp(MemberDto memberDto, HttpServletResponse response) throws IOException {
//        System.out.println(memberDto);
        memberService.signUp(memberDto);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/login");
        response.sendRedirect("/login");
    }

    @PostMapping("loginSignUp/userIdCheck.do")
    @ResponseBody
    public String userIdCheck(MemberDto memberDto){
//        System.out.println(memberDto);
        return memberService.userIdCheck(memberDto.getUserId());
    }

    @PostMapping("loginSignUp/userNicknameCheck.do")
    @ResponseBody
    public String userNicknameCheck(MemberDto memberDto){
        return memberService.userNicknameCheck(memberDto.getNickname());
    }

    // 로그아웃
    @GetMapping("/logout.do")
    public void logout( HttpServletResponse response,HttpSession session) throws IOException {
        // 세션에 있는 내용 모두 초기화
        memberService.logout(session);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/main");
        response.sendRedirect("/main");
    }

    // 로그인 상태 + 사용자의 정보 추적
    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getMemberInfo(HttpSession session) {
        Map<String, Object> response = new HashMap<String, Object>();
        MemberDto loginMember = (MemberDto) session.getAttribute("loginMember");

        if(loginMember == null) {
            response.put("isLoggedIn", false);
        } else {
            response.put("isLoggedIn", true);
            response.put("userId", loginMember.getUserId()); // userId 추가
            response.put("nickname", loginMember.getNickname());
        }
        return ResponseEntity.ok(response);
    }
}

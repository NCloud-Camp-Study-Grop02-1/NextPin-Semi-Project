package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class LoginSignupController {
    private MemberService memberService;
    private Logger logger = (Logger) LoggerFactory.getLogger(LoginSignupController.class);

    @Autowired
    public LoginSignupController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login")
    public ModelAndView login(MemberDto memberDto, Model model, HttpSession session) {
        ModelAndView mav = new ModelAndView();
        try {
            MemberDto loginMember = memberService.login(memberDto);

            loginMember.setPassword("");

            session.setAttribute("loginMember", loginMember);

            mav.setViewName("loginSignUp/login");

            logger.debug("login페이지 이동");
        } catch (Exception e) {
            model.addAttribute("loginFailMsg", e.getMessage());
            mav.setViewName("loginSignUp/login");
        }
        return mav;
    }
    
    // 회원가입 화면으로 이동
    @GetMapping("/signUp")
    public ModelAndView signUp() {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSignUp/signUp");

        logger.debug("signUp페이지 이동");
        return mav;
    }

    // 회원가입 처리
    @PostMapping("/signUp")
    public String signUp(MemberDto memberDto) {
        memberService.signUp(memberDto);
        return "redirect:/login";
    }

    @PostMapping("loginSignUp/userIdCheck.do")
    @ResponseBody
    public String userIdCheck(MemberDto memberDto){
        System.out.println(memberDto);
        return memberService.userIdCheck(memberDto.getUserId());
    }

    @PostMapping("loginSignUp/userNicknameCheck.do")
    @ResponseBody
    public String userNicknameCheck(MemberDto memberDto){
        return memberService.userNicknameCheck(memberDto.getNickname());
    }
}

package com.nextpin.app.controller;

import ch.qos.logback.classic.Logger;
import com.nextpin.app.dto.MemberDto;
import com.nextpin.app.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.net.http.HttpResponse;

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
        try {
            MemberDto loginMember = memberService.login(memberDto);

//            loginMember.setPassword("");

            session.setAttribute("loginMember", loginMember);

            mav.setViewName("loginSignUp/login");

            logger.debug("login페이지 이동");
        } catch (Exception e) {
            model.addAttribute("loginFailMsg", e.getMessage());
            mav.setViewName("loginSignUp/login");
        }
        return mav;
    }

    // 로그인 기능 처리
    @PostMapping("/login")
    public String login(MemberDto memberDto, Model model, HttpSession session) {
        try {
            MemberDto loginMember = memberService.login(memberDto);

//            loginMember.setPassword("");

            session.setAttribute("loginMember", loginMember);

            // 다시 작성해서 만들기 로그인했을 시 다시 로그인 화면으로 돌아감
            return "redirect:/";
        } catch (Exception e) {
            model.addAttribute("loginFailMsg", e.getMessage());
            return "loginSignUp/login";
        }
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
        System.out.println(memberDto);
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
    @GetMapping("/logiout.do")
    public String logout(HttpSession session) {
        // 세션에 있는 내용 모두 초기화
        session.invalidate();

        return "redirect:/loginSignUp/login";
    }
}

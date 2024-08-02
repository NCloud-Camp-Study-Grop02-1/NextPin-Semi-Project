package com.nextpin.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberDto {
    private String userId;
    private String nickname;
    private String pwd;
    private String pwdChk;

}

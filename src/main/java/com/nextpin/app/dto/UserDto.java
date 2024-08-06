package com.nextpin.app.dto;

@Getter
@Setter
@ToString
public class UserDto {
    private String userId;
    private String nickname;
    private String message;
    private String profileURL;

    // Constructors
    public UserDto() {}

    public UserDto(String nickname, String message, String profileURL) {
        this.nickname = nickname;
        this.message = message;
        this.profileURL = profileURL;
    }
}


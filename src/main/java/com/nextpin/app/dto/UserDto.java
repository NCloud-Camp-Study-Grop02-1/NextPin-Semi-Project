package com.nextpin.app.dto;


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

    @Override
    public String toString() {
        return "UserDto{" +
                "userId='" + userId + '\'' +
                ", nickname='" + nickname + '\'' +
                ", message='" + message + '\'' +
                ", profileURL='" + profileURL + '\'' +
                '}';
    }

    // Getters and Setters

    public String getUserId() {return userId;}

    public void setUserId(String userId) {this.userId = userId;}

    public String getNickname() {return nickname;}

    public void setNickname(String nickname) {this.nickname = nickname;}

    public String getMessage() {return message;}

    public void setMessage(String message) {this.message = message;}

    public String getProfileURL() {return profileURL;}

    public void setProfileURL(String profileURL) {this.profileURL = profileURL;}
}

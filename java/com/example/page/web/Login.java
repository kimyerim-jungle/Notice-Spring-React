package com.example.page.web;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Login {
    private String userId;
    private String userPW;
    private String userName;

    @Builder
    public Login(String id, String pw){
        this.userId = id;
        this.userPW = pw;
    }

    @Builder
    public Login(String id, String pw, String name){
        this.userId = id;
        this.userPW = pw;
        this.userName = name;
    }
}

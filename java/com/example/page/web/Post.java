package com.example.page.web;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Getter
@ToString
@NoArgsConstructor
public class Post {
    private Long index;
    private String title;
    private String content;
    private String date;
    private String userid;
    private String userName;

    @Builder
    // 클라->서버 등록시에는 index를 알지못함
    public Post(String title, String content, String date, String userName){
        this.title = title;
        this.content = content;
        this.date = date;
        this.userName = userName;
    }

    @Builder
    // 서버->클라 조회 요청시에는 index를 알고있음 & DB 등록시 사용할 생성자
    public Post(Long index, String title, String content, String date, String userid){
        this.index = index;
        this.title = title;
        this.content = content;
        this.date = date;
        this.userid = userid;
    }
}

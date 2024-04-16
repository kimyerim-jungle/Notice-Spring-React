package com.example.page.web;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
public class Comment {
    private String userId;
    private String userName;
    private String comment;
    private String date;

    @Builder
    public Comment(String userId, String userName, String comment, String date){
        this.userId = userId;
        this.userName = userName;
        this.comment = comment;
        this.date = date;
    }
}

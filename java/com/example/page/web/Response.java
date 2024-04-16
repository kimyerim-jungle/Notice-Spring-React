package com.example.page.web;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Response {
    private String code;
    private String name;
    private String id;

    @Builder
    // login 성공 후, code와 username을 반환
    public Response(String code, String name, String id){
        this.code = code;
        this.name = name;
        this.id = id;
    }

}

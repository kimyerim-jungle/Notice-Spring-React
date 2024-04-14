package com.example.page.JWT;

import lombok.AllArgsConstructor;
import lombok.Builder;

//@Data
@Builder
@AllArgsConstructor
public class JwtToken {
    private String grantType; // 인증타입 - Bearer
    private String accessToken;
    private String refreshToken;
}

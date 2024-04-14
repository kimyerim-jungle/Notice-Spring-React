package com.example.page.JWT;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class SHA256 {
    public SHA256(){

    }
    public static String createSalt(String plainText) throws NoSuchAlgorithmException {
        SecureRandom random = SecureRandom.getInstance("SHA1PRNG");
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);

        String salt = new String(Base64.getEncoder().encode(bytes));

        return salt;
    }

    public static String encrypt(String plainText, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            String rawAndSalt = plainText + salt;

            // 메소드 호출마다 객체 내에 저장된 값이 갱신
            md.update(rawAndSalt.getBytes());

            // 해시 반환
            byte[] byteData = md.digest();

            // 해시가 음수일 경우, 양수로 변환하기 위한 작업
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < byteData.length; ++i){
                String hex = Integer.toHexString(255 & byteData[i]);
                if (hex.length() == 1){
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        }catch (Exception var7) {
            var7.printStackTrace();
            throw new RuntimeException();
        }
    }
}

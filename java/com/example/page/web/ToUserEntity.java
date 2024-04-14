package com.example.page.web;
import com.example.page.DB.UserEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@NoArgsConstructor
@ToString
public class ToUserEntity {

    private String userId;
    private String userPW;
    private String userName;

    public static UserEntity toUserEntity(Login user){
        UserEntity newUser;
        newUser = UserEntity.builder()
                .userId(user.getUserId())
                .userPW(user.getUserPW())
                .userName(user.getUserName()).build();
        return newUser;
    }

}

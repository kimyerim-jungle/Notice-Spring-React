package com.example.page.DB;
import com.example.page.web.Login;

import jakarta.persistence.*;
import lombok.*;



@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Member")
public class UserEntity{

    @Id
    private String userId;

    @Column
    private String userPW; // 암호화된 PW

    @Column
    private String userName;

    @Column
    private String userSalt;

    public String getUserId(){
        return this.userId;
    }
    public String getUserPW() { return this.userPW; }
    public String getUserName(){
        return this.userName;
    }
    public String getUserSalt() { return this.userSalt; }

}
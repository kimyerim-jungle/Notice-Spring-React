package com.example.page.DB;
import com.example.page.JWT.SHA256;
import com.example.page.web.Response;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserTable userRepo;

    //public UserService(UserTable userRepo){
    //    this.userRepo = userRepo;
    //}
    public boolean validateUser(UserEntity user){
        Optional<UserEntity> vaild = userRepo.findById(user.getUserId());
        return !vaild.isPresent();
    }
    public String signUp(UserEntity user) throws NoSuchAlgorithmException {
        //  중복확인
        boolean vaild = validateUser(user);
        if (vaild){
            String newSalt = new SHA256().createSalt(user.getUserPW());
            String encryptPW = new SHA256().encrypt(user.getUserPW(), newSalt);
            // salt를 추가한 새 엔티티 생성
            UserEntity newUser = UserEntity.builder()
                    .userId(user.getUserId())
                    .userPW(encryptPW)
                    .userName(user.getUserName())
                    .userSalt(newSalt)
                    .build();
            userRepo.save(newUser);
            return newUser.getUserName();
        }
        else
            return "duplicate error";
    }
    public Response login(UserEntity user) {
        UserEntity getUser = findUserById(user.getUserId());
        if (getUser == null){
            return Response.builder()
                    .code("501")
                    .build();
        }

        String salt = getUser.getUserSalt();
        String auth = new SHA256().encrypt(user.getUserPW(), salt);
        log.info("salt: " + salt);
        log.info("auth: " + auth);
        // PW & ID가 모두 일치할 경우 - Id 불일치 검사를 해야 하는가?
        if (getUser.getUserPW().equals(auth) && getUser.getUserId().equals(getUser.getUserId())){
            return Response.builder()
                    .code("101")
                    .name(getUser.getUserName())
                    .build();
        }
        else {
            // PW 불일치
            return Response.builder()
                    .code("502")
                    .build();
        }
    }


    public UserEntity findUserById(String userId){
        Optional<UserEntity> findUser = userRepo.findById(userId);
        if (findUser.isPresent())
            return findUser.get();
        else
            return null;
        //throw new EntityNotFoundException("Not Found User");
    }
    public UserEntity findUserByName(String userName){
        Optional<UserEntity> findUser = userRepo.findByUserName(userName);
        if (findUser.isPresent())
            return findUser.get();
        else
            return null;
        //throw new EntityNotFoundException("Not Found User");
    }
}

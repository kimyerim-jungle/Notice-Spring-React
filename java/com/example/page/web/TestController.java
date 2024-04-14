package com.example.page.web;

import com.example.page.DB.PostService;
import com.example.page.DB.UserEntity;
import com.example.page.DB.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;


@RestController
@RequiredArgsConstructor
public class TestController {
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    //private final UserTable repository;
    //@Autowired
    private final UserService userService;
    private final PostService postService;


    @PostMapping(value = "/login/welcome")
    public Response login(@RequestBody Login user) {
        UserEntity newUser;
        newUser = ToUserEntity.toUserEntity(user);
        Response code = userService.login(newUser);
        log.info("{}, userLogin={}", code, user);
        return code;
    }

    @PostMapping(value = "/signup/welcome")
    public String signup(@RequestBody Login user) throws NoSuchAlgorithmException {
        UserEntity newUser;
        newUser = ToUserEntity.toUserEntity(user);
        String name = userService.signUp(newUser);

        if (name.equals(user.getUserName())){
            log.info("code=102, userSignup={}", user);
            return "102";
        }
        else{
            log.error("code=510, duplicate error");
            return "510";
        }
    }

    @PostMapping(value = "/write/send")
    public String upload(@RequestBody Post post) {
        // 인가된 사용자 체크 -> id 체크해서 있는 유저인지 확인 필요
        log.info("post={}", post);
        UserEntity user = userService.findUserByName(post.getUserName());
        if (user == null)
            log.warn("NULL");
        if (userService.validateUser(user)){
            postService.postUpload(post, user.getUserId());
            log.info("post succ");
            return "130";
        }
        else{
            log.warn("fail");
            return "530";
        }
    }
}

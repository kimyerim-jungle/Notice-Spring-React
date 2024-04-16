package com.example.page.web;


import com.example.page.DB.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class TestController {
    private final Logger log = LoggerFactory.getLogger(this.getClass().getSimpleName());

    //private final UserTable repository;
    //@Autowired
    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;

    @GetMapping(value = "/main")
    public List<PostEntity> readPostAll(HttpServletRequest request, HttpSession session, Model model){
//        if (session != null && session.getAttribute("loginUser") != null){
//            String userId = (String) session.getAttribute("loginUser");
//        }
        return postService.getAllPost();
    }

    // 게시글 조회
    @GetMapping(value = "/{index}")
    public PostEntity readPostOne(@PathVariable Long index) {
        return postService.postFind(index);
    }
    // 한 게시물에 대한 댓글 조회
    @GetMapping(value = "/{index}/getCmt")
    public List<CommentEntity> readComment(@PathVariable Long index) {
        return commentService.getAllComment(index);
    }

    @PostMapping(value = "/login/welcome")
    public Response login(@RequestBody Login user, HttpServletRequest request, HttpSession session, Model model) {
        UserEntity newUser;
        newUser = ToUserEntity.toUserEntity(user);
        Response code = userService.login(newUser);
        log.info("{}, userLogin={}", code, user);

        if (code.equals("101")){
            session = request.getSession();
            session.setAttribute("loginUser", newUser.getUserId());
            model.addAttribute("user", newUser.getUserName());
        }

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

    @PostMapping(value = "/{index}/sendCmt")
    public String commentSave(@PathVariable Long index, @RequestBody Comment comment) {
        UserEntity user = userService.findUserByName(comment.getUserName());
        if (userService.validateUser(user)){
            commentService.commentUpload(comment, index, user.getUserId());
            log.info("cmt={}", comment);
            return "140";
        }
        else{
            log.warn("cmt vaild fail");
            return "540";
        }
    }


}

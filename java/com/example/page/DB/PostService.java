package com.example.page.DB;

import com.example.page.web.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {
    private final PostTable postRepo;

    // post 등록
    public void postUpload(Post post, String id){
        Long newindex = postRepo.count();
        PostEntity newPost = PostEntity.builder()
                .postIndex(newindex)
                .postTitle(post.getTitle())
                .postContent(post.getContent())
                .postDate(post.getDate())
                .userId(id)
                .build();
        postRepo.save(newPost);
        log.info("upload={}", newPost);
    }

    // post 조회
    public void postFind(Long index){

    }
    // 전체 post 조회
    public void postFindAll(){

    }

    // post 수정
    public void postUpdate(Post post){

    }

    // post 삭제
    public void postDelete(Long index){

    }

}
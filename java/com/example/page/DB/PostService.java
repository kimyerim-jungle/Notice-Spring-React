package com.example.page.DB;

import com.example.page.web.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {
    private final PostTable postRepo;

    // post 등록
    public void postUpload(Post post, String id){
        // Long newindex = postRepo.count()+1;
        Long newindex = 1L;
        if (postRepo.count() > 0)
            newindex = postRepo.findTopByOrderByPostIndexDesc().get().getPostIndex() + 1;
        PostEntity newPost = PostEntity.builder()
                .postIndex(newindex)
                .postTitle(post.getTitle())
                .postContent(post.getContent())
                .postDate(post.getDate())
                .userId(id)
                .userName(post.getUserName())
                .build();
        postRepo.save(newPost);
        log.info("upload={}", newPost);
    }

    // post 조회
    public PostEntity postFind(Long index){ return postRepo.findById(index).get(); }
    // 전체 post 조회
    public List<PostEntity> getAllPost(){
        return postRepo.findAll();
    }

    // post 수정
    public void postModify(Post post, Long index){
        PostEntity modify = postRepo.findById(index).get();
        if (modify != null) {
            modify.setContent(post.getContent());
            modify.setTitle(post.getTitle());
        }

        postRepo.save(modify);
        log.info("modify={}", modify);
    }

    // post 삭제
    public void postDelete(Long index){
        postRepo.deleteById(index);
    }

}

package com.example.page.DB;

import com.example.page.web.Comment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentTable cmtRepo;

    // comment 등록
    public void commentUpload(Comment comment, Long postIndex, String id){
        Long newindex = cmtRepo.count()+1;
        CommentEntity newComment = CommentEntity.builder()
                .cmtIndex(newindex)
                .postIndex(postIndex)
                .userId(id)
                .userName(comment.getUserName())
                .comment(comment.getComment())
                .cmtDate(comment.getDate())
                .build();
        cmtRepo.save(newComment);
    }

    // 한 게시글에 대한 comment 조회
    public List<CommentEntity> getAllComment(Long postIndex) {
        return cmtRepo.findAllByPostIndex(postIndex);
    }

    // comment 삭제
}

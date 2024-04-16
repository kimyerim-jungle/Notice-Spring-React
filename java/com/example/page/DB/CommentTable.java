package com.example.page.DB;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentTable extends JpaRepository<CommentEntity, Long> {
    List<CommentEntity> findAllByPostIndex(Long postIndex);
}

package com.example.page.DB;

import com.example.page.web.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostTable extends JpaRepository<PostEntity, Long> {
    Optional<PostEntity> findTopByOrderByPostIndexDesc();
}

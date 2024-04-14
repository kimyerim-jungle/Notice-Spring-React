package com.example.page.DB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostTable extends JpaRepository<PostEntity, Long> {
}

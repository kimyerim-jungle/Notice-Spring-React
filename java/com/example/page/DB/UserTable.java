package com.example.page.DB;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserTable extends JpaRepository<UserEntity, String>
{

    Optional<UserEntity> findByUserName(String userName);
}

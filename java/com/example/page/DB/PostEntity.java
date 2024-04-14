package com.example.page.DB;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Cleanup;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="PostList")
public class PostEntity {

    @Id Long postIndex;

    @Column
    private String postTitle;
    @Column
    private String postContent;
    @JoinColumn(name = "userId")
    private String userId;
    @Column
    private String postDate;

    public Long getPostIndex() { return this.postIndex; }
    public String getPostTitle() { return this.postTitle; }
    public String getPostContent() { return this.postContent; }
    public String getUserId() { return this.userId; }
    public String getPostDate() { return this.postDate; }
}

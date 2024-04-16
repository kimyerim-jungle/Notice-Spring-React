package com.example.page.DB;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Comment")
public class CommentEntity {
    @Id
    private Long cmtIndex;

    @JoinColumn(name="postIndex")
    private Long postIndex;

    @JoinColumn(name="userId")
    private String userId;

    @Column
    private String userName;
    @Column
    private String comment;
    @Column
    private String cmtDate;

    public Long getCmtIndex() { return this.cmtIndex; }
    public Long getPostIndex() { return this.postIndex; }
    public String getUserId() { return this.userId; }
    public String getUserName() { return this.userName; }
    public String getComment() { return this.comment; }
    public String getCmtDate() { return this.cmtDate; }
}

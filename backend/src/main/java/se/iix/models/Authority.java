package se.iix.models;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority {

    public static final String ROLE_USER = "ROLE_USER";

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String authority;

    public Authority(
            final String username,
            final String authority
    ) {
        this.username = username;
        this.authority = authority;
    }
}

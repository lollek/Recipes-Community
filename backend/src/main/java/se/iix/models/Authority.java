package se.iix.models;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority implements GrantedAuthority {

    static final String ROLE_USER = "ROLE_USER";

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private  String username;

    @Column(nullable = false)
    private String authority;

    @SuppressWarnings("unused")
    private Authority() {}

    Authority(
            final String username,
            final String authority
    ) {
        this.username = username;
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    @SuppressWarnings("unused")
    public String getUsername() {
        return username;
    }

    @SuppressWarnings("unused")
    public Long getId() {
        return id;
    }
}

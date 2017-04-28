package se.iix.models;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "authorities")
public class Authority implements GrantedAuthority {

    public static final String ROLE_USER = "ROLE_USER";

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false)
    public String username;

    @Column(nullable = false)
    public String authority;

    private Authority() {}

    public Authority(
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
}

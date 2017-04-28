package se.iix.models;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.IOException;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "users")
@JsonSerialize(using = UserSerializer.class)
public class User implements Serializable, UserDetails {

    @Id
    @GeneratedValue
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false)
    public String password;

    @Column(nullable = false)
    public String facebookId;

    @Column
    public Boolean enabled;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<Authority> authorities;

    private User() {}

    public User(
            final String username,
            final String facebookId
    ) {
        this.username = username;
        this.password = UUID.randomUUID().toString();
        this.facebookId = facebookId;
        this.authorities = new HashSet<>();
        this.authorities.add(new Authority(this.username, Authority.ROLE_USER));
        this.enabled = true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }
}

class UserSerializer extends JsonSerializer<User> {

    @Override
    public void serialize(
            final User user,
            final JsonGenerator jsonGenerator,
            final SerializerProvider serializerProvider
    ) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", user.id);
        jsonGenerator.writeStringField("username", user.username);
        jsonGenerator.writeEndObject();
    }
}

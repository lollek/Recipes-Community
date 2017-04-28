package se.iix.models;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class UserAuthentication implements Authentication {

    private User user;
    private boolean forceUnauthorized;

    public UserAuthentication(
            final User user
    ) {
        this.user = user;
        this.forceUnauthorized = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.user.getAuthorities();
    }

    @Override
    public Object getCredentials() {
        return this.user.facebookId;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return this.user;
    }

    @Override
    public boolean isAuthenticated() {
        return !this.forceUnauthorized;
    }

    @Override
    public void setAuthenticated(boolean b) throws IllegalArgumentException {
        this.forceUnauthorized = true;
    }

    @Override
    public String getName() {
        return this.user.username;
    }
}

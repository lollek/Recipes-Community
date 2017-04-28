package se.iix.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import se.iix.models.User;
import se.iix.services.da.UserDAService;

@Component
public class UserService {

    private final UserDAService userDAService;

    @Autowired
    public UserService(UserDAService userDAService) {
        this.userDAService = userDAService;
    }

    public User currentUser() {
        final String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userDAService
                .findByUsername(username)
                .orElse(null);
    }
}

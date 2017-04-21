package se.iix.services.da;

import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Component;
import se.iix.models.User;

import java.util.Optional;

@Component
public interface UserDAService extends Repository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    User save(User userModel);

    void deleteById(Long id);
}

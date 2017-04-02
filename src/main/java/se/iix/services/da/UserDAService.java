package se.iix.services.da;

import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Component;
import se.iix.models.UserModel;

import java.util.Optional;

@Component
public interface UserDAService extends Repository<UserModel, Long> {

    Optional<UserModel> findByUsername(String username);

    Optional<UserModel> findById(Long id);

    UserModel save(UserModel userModel);

    void deleteById(Long id);
}

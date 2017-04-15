package se.iix.services.da;

import org.springframework.data.repository.Repository;
import org.springframework.stereotype.Component;
import se.iix.models.Authority;

import java.util.List;

@Component
public interface AuthorityDAService extends Repository<Authority, Long> {

    List<Authority> findByUsername(String username);

    Authority save(Authority authority);

    void delete(Authority authority);
}

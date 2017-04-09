package se.iix.services.da;

import org.springframework.data.repository.Repository;
import se.iix.models.Recipe;
import se.iix.models.User;

import java.util.List;
import java.util.Optional;

public interface RecipeDAService extends Repository<Recipe, Long> {

    List<Recipe> findAll();
    List<Recipe> findAllByTitleContainingIgnoreCase(String title);

    Optional<Recipe> findById(Long id);
    Optional<Recipe> findByAuthor(User author);

    Recipe save(Recipe recipe);
}

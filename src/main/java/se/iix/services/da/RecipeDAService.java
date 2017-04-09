package se.iix.services.da;

import org.springframework.data.repository.Repository;
import se.iix.models.RecipeModel;
import se.iix.models.UserModel;

import java.util.List;
import java.util.Optional;

public interface RecipeDAService extends Repository<RecipeModel, Long> {

    List<RecipeModel> findAll();
    List<RecipeModel> findAllByTitleContainingIgnoreCase(String title);

    Optional<RecipeModel> findById(Long id);
    Optional<RecipeModel> findByAuthor(UserModel author);

    RecipeModel save(RecipeModel recipe);
}

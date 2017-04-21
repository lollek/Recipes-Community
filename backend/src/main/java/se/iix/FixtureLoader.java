package se.iix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import se.iix.models.Ingredient;
import se.iix.models.Recipe;
import se.iix.models.User;
import se.iix.services.da.RecipeDAService;
import se.iix.services.da.UserDAService;

import java.util.ArrayList;
import java.util.List;

@Component
public class FixtureLoader implements ApplicationRunner {

    @Autowired
    private RecipeDAService recipeDAService;

    @Autowired
    private UserDAService userDAService;

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        final User testUser = userDAService.findById(1L).get();

        final List<Ingredient> ingredients = new ArrayList<>();
        ingredients.add(new Ingredient("Panda", 1, "st"));
        ingredients.add(new Ingredient("Katt", 1, "st"));
        final Recipe pannkaka = new Recipe("Pannkaka", ingredients, "Laga bara", testUser);
        recipeDAService.save(pannkaka);

    }
}

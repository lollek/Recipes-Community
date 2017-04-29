package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import se.iix.models.Recipe;
import se.iix.models.User;
import se.iix.services.UserService;
import se.iix.services.da.RecipeDAService;
import se.iix.services.da.UserDAService;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.Objects;
import java.util.logging.Logger;

@Controller
@Path("/recipe")
public class RecipeController extends BaseController {

    private static Logger logger = Logger.getLogger(RecipeController.class.getName());

    private final RecipeDAService recipeDAService;
    private final UserDAService userDAService;
    private final UserService userService;

    @Autowired
    public RecipeController(
            final RecipeDAService recipeDAService,
            final UserDAService userDAService,
            final UserService userService) {
        this.recipeDAService = recipeDAService;
        this.userDAService = userDAService;
        this.userService = userService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listRecipes() {
        return Response.ok(recipeDAService.findAll()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response getRecipeById(
            @PathParam("id") final long id
    ) {
        final Recipe recipe = recipeDAService
                .findById(id)
                .orElseThrow(BaseController::notFoundException);
        return Response.ok(recipe).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/newest")
    public Response getNewestRecipes() {
        return Response.ok(recipeDAService.findTop10ByOrderByIdDesc()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/popular")
    public Response getPopularRecipes() {
        return Response.ok(recipeDAService.findTop10ByOrderByIdAsc()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/search/{searchString}")
    public Response getRecipeByTitle(
            @PathParam("searchString") final String searchString
    ) {
        return Response.ok(recipeDAService.findAllByTitleContainingIgnoreCase(searchString)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public Response getRecipeByAuthor(
            @PathParam("id") final long id
    ) {
        final User author = userDAService
                .findById(id)
                .orElseThrow(BaseController::notFoundException);
        return Response.ok(recipeDAService.findAllByAuthor(author)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response updateRecipe(
            @PathParam("id") final long id,
            Recipe recipe
    ) {
        if (recipe == null || recipe.author == null) {
            throw badRequestException();
        }

        if (!Objects.equals(recipe.author.getId(), this.userService.currentUser().getId())) {
            throw forbiddenException();
        }

        if (!recipe.validateForSave()) {
            throw badRequestException();
        }

        return Response.ok(recipeDAService.save(recipe)).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(
            Recipe recipe
    ) {
        if (recipe == null) {
            throw badRequestException();
        }

        recipe.author = this.userService.currentUser();
        if (!recipe.validateForSave()) {
            throw badRequestException();
        }
        return Response.ok(recipeDAService.save(recipe)).build();
    }
}

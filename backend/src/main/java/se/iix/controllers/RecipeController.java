package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import se.iix.models.Recipe;
import se.iix.models.User;
import se.iix.services.da.RecipeDAService;
import se.iix.services.da.UserDAService;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@Path("/recipe")
public class RecipeController extends BaseController {

    private static Logger logger = Logger.getLogger(RecipeController.class.getName());

    private final RecipeDAService recipeDAService;
    private final UserDAService userDAService;

    @Autowired
    public RecipeController(
            final RecipeDAService recipeDAService,
            final UserDAService userDAService
    ) {
        this.recipeDAService = recipeDAService;
        this.userDAService = userDAService;
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
            final Recipe jsonRecipe
    ) {
        if (jsonRecipe == null || !jsonRecipe.validateForSave()) {
            throw badRequestException();
        }

        try {
            return Response.ok(recipeDAService.save(jsonRecipe)).build();
        }
        catch (DataIntegrityViolationException exc) {
            logger.log(Level.WARNING, "Unhandled SAVE", exc);
            throw forbiddenException();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(
            final Recipe jsonRecipe,
            @Context final UriInfo context
    ) {
        SecurityContextHolder.getContext().getAuthentication();
        if (jsonRecipe == null || !jsonRecipe.validateForSave()) {
            throw badRequestException();
        }

        Recipe recipe;
        try {
            recipe = recipeDAService.save(jsonRecipe);
        }
        catch (DataIntegrityViolationException exc) {
            logger.log(Level.WARNING, "Unhandled SAVE", exc);
            throw forbiddenException();
        }

        final URI uri = UriBuilder.fromUri(context.getAbsolutePath()).path(Long.toString(recipe.id)).build();
        return Response.created(uri).build();
    }
}

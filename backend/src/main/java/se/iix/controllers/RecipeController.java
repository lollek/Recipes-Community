package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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

    @Autowired
    private RecipeDAService recipeDAService;

    @Autowired
    private UserDAService userDAService;

    private static Logger logger = Logger.getLogger(RecipeController.class.getName());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response listRecipes() {
        return Response.ok(recipeDAService.findAll()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response getRecipeById(
            @PathParam("id") long id
    ) {
        final Recipe recipe = recipeDAService.findById(id).orElseThrow(BaseController::notFoundException);
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
            @PathParam("searchString") String searchString
    ) {
        return Response.ok(recipeDAService.findAllByTitleContainingIgnoreCase(searchString)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/user/{id}")
    public Response getRecipeByAuthor(
            @PathParam("id") long id
    ) {
        final User author = userDAService.findById(id).orElseThrow(BaseController::notFoundException);
        return Response.ok(recipeDAService.findAllByAuthor(author)).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response updateRecipe(
            @PathParam("id") long id,
            Recipe jsonRecipe
    ) {
        if (jsonRecipe == null || !jsonRecipe.validateForSave()) {
            throw badRequestException();
        }

        try {
            jsonRecipe = recipeDAService.save(jsonRecipe);
        }
        catch (DataIntegrityViolationException exc) {
            logger.log(Level.WARNING, "Unhandled SAVE", exc);
            throw forbiddenException();
        }

        return Response.ok(jsonRecipe).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response create(
            Recipe jsonRecipe,
            @Context UriInfo context
    ) {
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

package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;
import se.iix.models.RecipeModel;
import se.iix.services.da.RecipeDAService;

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

    private static Logger logger = Logger.getLogger(RecipeController.class.getName());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Response getRecipeById(@PathParam("id") long id) {
        final RecipeModel recipe = recipeDAService.findById(id).orElseThrow(BaseController::notFoundException);
        return Response.ok(recipe).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/")
    public Response create(RecipeModel jsonRecipe, @Context UriInfo context) {
        if (jsonRecipe == null || !jsonRecipe.validateForSave()) {
            throw badRequestException();
        }

        RecipeModel recipe;
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

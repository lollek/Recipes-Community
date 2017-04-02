package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import se.iix.models.UserModel;
import org.springframework.stereotype.Component;
import se.iix.services.da.UserDAService;

import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@Path("/auth")
public class AuthenticationController extends BaseController {

    @Autowired
    private UserDAService userDAService;

    private static Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/create")
    public Response create(UserModel jsonUser) {
        if (jsonUser == null || !jsonUser.validateForSave()) {
            throw badRequestException();
        }

        UserModel user;
        try {
            user = userDAService.save(jsonUser);
        }
        catch (DataIntegrityViolationException exc) {
            logger.log(Level.WARNING, "Unhandled SAVE", exc);
            throw forbiddenException();
        }
        return Response.ok().entity(user).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response login(UserModel jsonUser) {
        if (jsonUser == null || jsonUser.username == null || jsonUser.password == null) {
            throw badRequestException();
        }

        UserModel user = userDAService.findByUsername(jsonUser.username).orElseThrow(BaseController::forbiddenException);

        if (!user.password.equals(jsonUser.password)) {
            throw forbiddenException();
        }
        return Response.ok(user).build();
    }
}

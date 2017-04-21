package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import se.iix.models.Authority;
import se.iix.models.User;
import org.springframework.stereotype.Component;
import se.iix.services.da.AuthorityDAService;
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

    @Autowired
    private AuthorityDAService authorityDAService;

    private static Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/create")
    public Response create(User user) {
        if (user == null || !user.validateForSave()) {
            throw badRequestException();
        }

        try {
            user.enabled = true;
            user = userDAService.save(user);
            authorityDAService.save(new Authority(user.username, Authority.ROLE_USER));
        }
        catch (DataIntegrityViolationException exc) {
            logger.log(Level.WARNING, "Unhandled SAVE", exc);
            throw forbiddenException();
        }
        return Response.ok().build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response login() {
        return Response.ok().build();
    }
}

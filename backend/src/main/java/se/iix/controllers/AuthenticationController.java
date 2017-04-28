package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import se.iix.models.User;
import org.springframework.stereotype.Component;
import se.iix.services.da.UserDAService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@Path("/auth")
public class AuthenticationController extends BaseController {

    private static final Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    private final UserDAService userDAService;

    @Autowired
    public AuthenticationController(UserDAService userDAService) {
        this.userDAService = userDAService;
    }

    // For "/login", see JWTLoginFilter

    @POST
    @Path("/logout")
    public Response logout(
            @Context final HttpServletRequest request
    ) {
        try {
            request.logout();
        } catch (ServletException e) {
            logger.log(Level.WARNING, "logout: Failed to log out", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
        return Response.ok().build();
    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/me")
    public Response me() {
        final String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        final User user = this.userDAService
                .findByUsername(username)
                .orElseThrow(BaseController::notFoundException);
        return Response.ok(user).build();
    }

}

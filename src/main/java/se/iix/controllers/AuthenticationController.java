package se.iix.controllers;

import se.iix.models.UserModel;
import org.springframework.stereotype.Component;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Component
@Path("/auth")
public class AuthenticationController {

    @POST
    @Produces("application/json")
    @Path("/login")
    public UserModel login() {
        return new UserModel("username", "email", "password");
    }
}

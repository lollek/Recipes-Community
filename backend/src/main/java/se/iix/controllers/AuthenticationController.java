package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.ResourceNotFoundException;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.support.OAuth2Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import se.iix.models.Authority;
import se.iix.models.User;
import org.springframework.stereotype.Component;
import se.iix.services.da.AuthorityDAService;
import se.iix.services.da.UserDAService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Optional;
import java.util.logging.Logger;

@Component
@Path("/auth")
public class AuthenticationController extends BaseController {

    @Autowired
    private FacebookConnectionFactory facebookConnectionFactory;

    @Autowired
    UserDAService userDAService;

    @Autowired
    AuthorityDAService authorityDAService;

    private static Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response login(
            @QueryParam(value = "token") String token
    ) {
        AccessGrant accessGrant = new AccessGrant(token);
        try {
            final Connection<Facebook> connection = facebookConnectionFactory.createConnection(accessGrant);
            final User user = OAuth2Connection2User((OAuth2Connection<Facebook>) connection);
            return Response.ok(user).build();
        } catch (ResourceNotFoundException exc) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private User OAuth2Connection2User(OAuth2Connection<Facebook> connection) {
        final String facebookId = connection.getKey().getProviderUserId();
        final Optional<User> maybeUser = userDAService.findByFacebookId(facebookId);
        if (maybeUser.isPresent()) {
            return maybeUser.get();
        }

        final String name = connection.getDisplayName();
        final User user = userDAService.save(new User(name, facebookId));
        authorityDAService.save(new Authority(name, Authority.ROLE_USER));
        return user;
    }
}

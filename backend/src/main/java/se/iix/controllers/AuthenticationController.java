package se.iix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.social.InvalidAuthorizationException;
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
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@Path("/auth")
public class AuthenticationController extends BaseController {

    private static final Logger logger = Logger.getLogger(AuthenticationController.class.getName());

    private final FacebookConnectionFactory facebookConnectionFactory;
    private final UserDAService userDAService;
    private final AuthorityDAService authorityDAService;

    @Autowired
    public AuthenticationController(
            final FacebookConnectionFactory facebookConnectionFactory,
            final UserDAService userDAService,
            final AuthorityDAService authorityDAService
    ) {
        this.facebookConnectionFactory = facebookConnectionFactory;
        this.userDAService = userDAService;
        this.authorityDAService = authorityDAService;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response login(
            @QueryParam(value = "token") final String token
    ) {
        final AccessGrant accessGrant = new AccessGrant(token);
        try {
            final Connection<Facebook> connection = facebookConnectionFactory.createConnection(accessGrant);
            final User user = connection2User((OAuth2Connection<Facebook>) connection);
            return Response.ok(user).build();
        } catch (ResourceNotFoundException | InvalidAuthorizationException exc) {
            return Response.status(Response.Status.FORBIDDEN).build();
        } catch (Exception exc) {
            logger.log(Level.WARNING, "login: Error exchanging token for user", exc);
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    private User connection2User(
            final OAuth2Connection<Facebook> connection
    ) {
        final String facebookId = connection.getKey().getProviderUserId();
        return userDAService
                .findByFacebookId(facebookId)
                .orElseGet(() -> createUser(connection.getDisplayName(), facebookId));
    }

    private User createUser(
            final String username,
            final String facebookId
    ) {
        final User user = userDAService.save(new User(username, facebookId));
        authorityDAService.save(new Authority(username, Authority.ROLE_USER));
        return user;
    }
}

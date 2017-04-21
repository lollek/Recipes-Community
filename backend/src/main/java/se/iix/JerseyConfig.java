package se.iix;

import se.iix.controllers.AuthenticationController;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;
import se.iix.controllers.RecipeController;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/api")
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(AuthenticationController.class);
        register(RecipeController.class);
    }
}

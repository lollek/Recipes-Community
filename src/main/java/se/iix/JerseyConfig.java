package se.iix;

import se.iix.controllers.AuthenticationController;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;

@Component
@ApplicationPath("/restapi")
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(AuthenticationController.class);
    }
}

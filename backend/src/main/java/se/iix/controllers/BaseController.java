package se.iix.controllers;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

public abstract class BaseController {

    static WebApplicationException badRequestException() {
        return new WebApplicationException(
                Response.status(Response.Status.BAD_REQUEST).build()
        );
    }

    static WebApplicationException forbiddenException() {
        return new WebApplicationException(
                Response.status(Response.Status.FORBIDDEN).build()
        );
    }

    static WebApplicationException notFoundException() {
        return new WebApplicationException(
                Response.status(Response.Status.NOT_FOUND).build()
        );
    }
}

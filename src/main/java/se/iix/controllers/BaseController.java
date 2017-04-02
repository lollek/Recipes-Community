package se.iix.controllers;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

public abstract class BaseController {

    public static WebApplicationException badRequestException() {
        return new WebApplicationException(
                Response.status(Response.Status.BAD_REQUEST).build()
        );
    }

    public static WebApplicationException forbiddenException() {
        return new WebApplicationException(
                Response.status(Response.Status.FORBIDDEN).build()
        );
    }

    public static WebApplicationException notFoundException() {
        return new WebApplicationException(
                Response.status(Response.Status.NOT_FOUND).build()
        );
    }
}

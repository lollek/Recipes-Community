package se.iix.filters;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import se.iix.models.User;
import se.iix.services.JWTService;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class JWTAuthenticationFilter implements Filter {

    private final JWTService jwtService;

    public JWTAuthenticationFilter(
            final JWTService jwtService
    ) {
        this.jwtService = jwtService;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void doFilter(
            final ServletRequest servletRequest,
            final ServletResponse servletResponse,
            final FilterChain filterChain
    ) throws IOException, ServletException {
        try {
            final User user = this.jwtService.toUser(this.jwtService.getJwtToken((HttpServletRequest) servletRequest));
            final Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    user.getPassword(),
                    user.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception ignored) {
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() { }
}

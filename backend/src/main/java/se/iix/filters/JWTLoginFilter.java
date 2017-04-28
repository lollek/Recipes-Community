package se.iix.filters;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import se.iix.models.User;
import se.iix.services.JWTService;
import se.iix.services.da.UserDAService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    private final JWTService jwtService;
    private final FacebookConnectionFactory facebookConnectionFactory;
    private final UserDAService userDAService;

    public JWTLoginFilter(
        final String url,
        final AuthenticationManager authManager,
        final FacebookConnectionFactory facebookConnectionFactory,
        final UserDAService userDAService,
        final JWTService jwtService
    ) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.facebookConnectionFactory = facebookConnectionFactory;
        this.userDAService = userDAService;
        this.jwtService = jwtService;
    }

    @Override
    public Authentication attemptAuthentication(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse
    ) throws AuthenticationException, IOException, ServletException {

        Map<String, String[]> params = httpServletRequest.getParameterMap();
        try {
            final String token = params.get("token")[0];
            final AccessGrant accessGrant = new AccessGrant(token);
            final Connection<Facebook> connection = this.facebookConnectionFactory.createConnection(accessGrant);
            final String facebookId = connection.getKey().getProviderUserId();
            final User user = this.userDAService
                    .findByFacebookId(facebookId)
                    .orElseGet(() -> this.userDAService.save(new User(connection.getDisplayName(), facebookId)));
            final Authentication authentication = new UsernamePasswordAuthenticationToken(
                    user.getUsername(), user.getPassword(), user.getAuthorities());
            return getAuthenticationManager().authenticate(authentication);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    protected void successfulAuthentication(
            final HttpServletRequest httpServletRequest,
            final HttpServletResponse httpServletResponse,
            final FilterChain filterChain,
            final Authentication authentication
    ) throws IOException, ServletException {
        SecurityContextHolder.getContext().setAuthentication(authentication);
        this.jwtService.setJwtToken(httpServletResponse, (UserDetails) authentication.getPrincipal());
    }
}

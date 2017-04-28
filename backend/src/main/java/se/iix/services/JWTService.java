package se.iix.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.TextCodec;
import io.jsonwebtoken.impl.crypto.MacProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import se.iix.models.User;
import se.iix.services.da.UserDAService;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class JWTService {

    final UserDAService userDAService;

    private final SecretKey key = MacProvider.generateKey();
    final String AUTHORIZATION_HEADER = "Authorization";
    final String AUTHORIZATION_PREFIX = "Bearer ";

    @Autowired
    public JWTService(UserDAService userDAService) {
        this.userDAService = userDAService;
    }

    public String getJwtToken(
            final HttpServletRequest request
    ) {
        String authData = request.getHeader(AUTHORIZATION_HEADER);
        if (authData == null || !authData.startsWith(AUTHORIZATION_PREFIX)) {
            return null;
        }
        return authData.substring(AUTHORIZATION_PREFIX.length());
    }

    public void setJwtToken(
            final HttpServletResponse response,
            final UserDetails user
    ) {
        response.setHeader(AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX + this.generateToken(user));
    }

    public String generateToken(
            final UserDetails user
    ) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .signWith(SignatureAlgorithm.HS512, TextCodec.BASE64.encode(key.getEncoded()))
                .compact();
    }

    public boolean validateToken(
            final String token
    ) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public User toUser(
            final String token
    ) {
        if (token == null) {
            return null;
        }

        try {
            final String name = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody().getSubject();
            return this.userDAService.findByUsername(name).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }
}

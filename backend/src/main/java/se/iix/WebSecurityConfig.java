package se.iix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import se.iix.filters.CORSFilter;
import se.iix.filters.JWTAuthenticationFilter;
import se.iix.filters.JWTLoginFilter;
import se.iix.services.JWTService;
import se.iix.services.da.UserDAService;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final FacebookConnectionFactory facebookConnectionFactory;
    private final UserDAService userDAService;
    private final JWTService jwtService;
    private final DataSource dataSource;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public WebSecurityConfig(
            final DataSource dataSource,
            final FacebookConnectionFactory facebookConnectionFactory,
            final UserDAService userDAService,
            final JWTService jwtService) {
        this.dataSource = dataSource;
        this.facebookConnectionFactory = facebookConnectionFactory;
        this.userDAService = userDAService;
        this.jwtService = jwtService;
    }

    @Override
    public void configure(
            final WebSecurity webSecurity
    ) throws Exception {
        webSecurity
                .ignoring()
                .antMatchers("/h2-console/**");
    }


    @Override
    protected void configure(
            final HttpSecurity http
    ) throws Exception {
        final JWTLoginFilter jwtLoginFilter = new JWTLoginFilter("/api/auth/login",
                authenticationManager(),
                this.facebookConnectionFactory,
                this.userDAService,
                this.jwtService);
        final JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(this.jwtService);

        http
                .addFilterBefore(jwtLoginFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and().headers().frameOptions().disable()
            .and().authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers(HttpMethod.GET, "/api/recipe/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/auth/login").permitAll()
                .antMatchers("/api/**").authenticated()
                .anyRequest().denyAll();
    }

    @Autowired
    public void configureGlobal(
            final AuthenticationManagerBuilder auth
    ) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource);
    }

    @Bean
    public FilterRegistrationBean CORSFilterRegistration(
            final CORSFilter filter
    ) {
        FilterRegistrationBean registration = new FilterRegistrationBean();
        registration.setFilter(filter);
        registration.setOrder(-200);
        return registration;
    }
}

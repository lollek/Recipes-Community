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
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import se.iix.filters.CORSFilter;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final DataSource dataSource;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public WebSecurityConfig(
            final DataSource dataSource
    ) {
        this.dataSource = dataSource;
    }

    @Override
    public void configure(
            final WebSecurity webSecurity
    ) throws Exception {
        webSecurity
                .ignoring()
                .antMatchers("/**");
    }


    @Override
    protected void configure(
            final HttpSecurity http
    ) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers(HttpMethod.GET, "/api/recipe/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/auth/login").permitAll()
                .antMatchers("/api").authenticated()
                .anyRequest().denyAll()
                .and().logout().logoutUrl("/api/auth/logout").permitAll()
                .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and().headers().frameOptions().disable();
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

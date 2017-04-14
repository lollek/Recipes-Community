package se.iix;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;


    @Override
    public void configure(WebSecurity webSecurity) throws Exception
    {
        webSecurity
                .ignoring()
                .antMatchers(HttpMethod.OPTIONS)
                .antMatchers("/h2-console/**");
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                    .antMatchers("/h2-console").hasRole("ADMIN")
                    .antMatchers(HttpMethod.GET, "/api/recipe/**").permitAll()
                    .anyRequest().authenticated()
                .and().httpBasic()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().headers().frameOptions().disable();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
                .withUser("user").password("password").roles("USER");
    }
}

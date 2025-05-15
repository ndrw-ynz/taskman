package com.taskman.backend.security;

import com.taskman.backend.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filter class implementing JWT authentication filter logic.
 */
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final Jwt jwt;

    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public JwtAuthenticationFilter(Jwt jwt, CustomUserDetailsService customUserDetailsService) {
        this.jwt = jwt;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = jwt.extract(request);
        if (StringUtils.isNotEmpty(token) && jwt.verify(token)) {
            try {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(jwt.getSubject(token));
                JwtAuthenticationToken authenticated = JwtAuthenticationToken.authenticated(userDetails, token, userDetails.getAuthorities());
                authenticated.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticated);
            } catch (Exception e) {
                System.out.println(e);
            }
        }
        filterChain.doFilter(request, response);
    }
}

package com.taskman.backend.service;

import com.taskman.backend.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Service class handling authentication logic.
 */
@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    /**
     * Authenticates a user with the username and password.
     * @param username The user's username.
     * @param password The user's raw password.
     * @return Authenticated user's username.
     */
    public String authenticate(String username, String password) {
        try {
            Authentication authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(username, password);
            Authentication authenticationResponse = this.authenticationManager.authenticate(authenticationRequest);

            SecurityContext securityContext =  SecurityContextHolder.getContext();
            securityContext.setAuthentication(authenticationResponse);

            CustomUserDetails user = (CustomUserDetails) authenticationResponse.getPrincipal();
            return user.getUsername();
        } catch (AuthenticationException ex) {
            System.out.println("AUTHENTICATION ERROR: " + ex.getMessage());
            throw ex;
        }
    }
}

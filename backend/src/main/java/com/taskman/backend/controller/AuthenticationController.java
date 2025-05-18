package com.taskman.backend.controller;

import com.taskman.backend.dto.LoginRequest;
import com.taskman.backend.security.Jwt;
import com.taskman.backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for authentication-related requests.
 */
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final Jwt jwt;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, Jwt jwt) {
        this.authenticationService = authenticationService;
        this.jwt = jwt;
    }

    /**
     * Authenticates a login request.
     * @param request The Http request.
     * @param response The Http response.
     * @param loginRequest The login request of a client.
     * @return The login authentication result.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login (HttpServletRequest request, HttpServletResponse response, @RequestBody LoginRequest loginRequest) {
        try {
            String username = authenticationService.authenticate(loginRequest.username(), loginRequest.password());
            jwt.makeToken(request, response, username);

            return ResponseEntity.ok("Login successful");
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

}

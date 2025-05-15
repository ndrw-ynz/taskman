package com.taskman.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * Component class handling JSON Web Token (JWT) creation,
 * extraction, and verification logic.
 */
@Component
public class Jwt {

    private final String secret;
    private final int expirationMin;
    private final String cookieName;

    private final JWTVerifier verifier;

    @Autowired
    public Jwt(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration-min}") int expirationMin,
            @Value("${jwt.cookie-name}") String cookieName
    ) {
        this.verifier = JWT.require(Algorithm.HMAC256(secret)).build();
        this.secret = secret;
        this.expirationMin = expirationMin;
        this.cookieName = cookieName;
    }

    public String extract(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, cookieName);
        if (cookie != null) {
            return cookie.getValue();
        } else {
            return null;
        }
    }

    public Boolean verify(String token) {
        try {
            verifier.verify(token);
            return Boolean.TRUE;
        } catch (JWTVerificationException e) {
            return Boolean.FALSE;
        }
    }

    public String getSubject(String token) {
        return JWT.decode(token).getSubject();
    }

    public String create(String userIdentify) {
        return JWT.create()
                .withSubject(String.valueOf(userIdentify))
                .withIssuedAt(new Date())
                .withExpiresAt(
                        Date.from(
                                LocalDateTime.now()
                                        .plusMinutes(expirationMin)
                                        .atZone(ZoneId.systemDefault())
                                        .toInstant()))
                .sign(Algorithm.HMAC256(secret));
    }

    private Cookie buildJwtCookiePojo(HttpServletRequest request, String userIdentify) {
        String contextPath = request.getContextPath();
        String cookiePath = StringUtils.isNotEmpty(contextPath) ? contextPath : "/";
        Cookie cookie = new Cookie(cookieName, create(userIdentify));
        cookie.setPath(cookiePath);
        cookie.setMaxAge(expirationMin * 60);
        cookie.setSecure(request.isSecure());
        cookie.setHttpOnly(true);
        return cookie;
    }

    public void makeToken(
            HttpServletRequest request, HttpServletResponse response, String userIdentify) {
        response.addCookie(buildJwtCookiePojo(request, userIdentify));
    }
}

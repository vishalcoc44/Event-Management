package com.eventmanagement.eventmanagementsystem.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;
import com.eventmanagement.eventmanagementsystem.security.jwtUtil;
import java.io.IOException;
import java.util.Collections;


public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Override

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = getJwtFromRequest(request);

        System.out.println("JWT from request: " + jwt);

        if (jwt != null && jwtUtil.validateToken(jwt)) {
            System.out.println("JWT Validation Passed");
            // ... rest of the filter logic
        } else {
            System.out.println("JWT Validation Failed");
        }
        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    private boolean validateJwt(String jwt) {
        // Add logic for validating the JWT
        return true; // Simplified for now
    }

    private Authentication getAuthentication(String jwt) {
        // Convert JWT to Authentication object, e.g., using user details
        return new UsernamePasswordAuthenticationToken(jwt, null, Collections.emptyList());
    }
}

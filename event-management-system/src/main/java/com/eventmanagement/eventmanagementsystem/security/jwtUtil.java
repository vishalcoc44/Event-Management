package com.eventmanagement.eventmanagementsystem.security;



import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class jwtUtil {

    @Value("${jwt.secret}") // Inject the secret key from application.properties
    private static String secret;

    @Value("${jwt.expiration}") //Inject the expiration time
    private long expiration;

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // Set token expiration time
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            System.out.println("Token is valid: " + token); // Log if valid
            return true;
        } catch (ExpiredJwtException ex) {
            System.err.println("Token Expired: " + ex.getMessage());
            return false;
        } catch (SignatureException ex) {
            System.err.println("Invalid JWT Signature: " + ex.getMessage()); // Crucial check
            return false;
        } catch (MalformedJwtException ex) {
            System.err.println("Malformed JWT: " + ex.getMessage());
            return false;
        } catch (UnsupportedJwtException ex) {
            System.err.println("Unsupported JWT: " + ex.getMessage());
            return false;
        } catch (IllegalArgumentException ex) {
            System.err.println("JWT claims string is empty: " + ex.getMessage());
            return false;
        } catch (Exception e) {
            System.err.println("JWT Validation Failed: " + e.getMessage()); // Catch all for other exceptions
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
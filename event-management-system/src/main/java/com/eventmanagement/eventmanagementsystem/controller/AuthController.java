package com.eventmanagement.eventmanagementsystem.controller;

import com.eventmanagement.eventmanagementsystem.model.User;
import com.eventmanagement.eventmanagementsystem.service.UserService;
import com.eventmanagement.eventmanagementsystem.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private com.eventmanagement.eventmanagementsystem.security.jwtUtil jwtUtil; // Inject JwtUtil

    // Register user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email is already taken.", HttpStatus.BAD_REQUEST);
        }

        userService.registerUser(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        if (!isAuthenticated) {
            return new ResponseEntity<>("Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }

        User user = userService.findUserByEmail(loginRequest.getEmail()).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found after authentication.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String token = jwtUtil.generateToken(user.getEmail());

        System.out.println("Generated Token: " + token); // Check the token value

        return ResponseEntity.ok(new AuthResponse(token));
    }

    //Inner class for the response
    private record AuthResponse(String token){}

}
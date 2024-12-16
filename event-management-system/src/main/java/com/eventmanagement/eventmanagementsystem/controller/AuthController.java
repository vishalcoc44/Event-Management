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

    // Register user
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Check if the email already exists in the system
        if (userService.findUserByEmail(user.getEmail()) != null) {
            return new ResponseEntity<>("Email is already taken.", HttpStatus.BAD_REQUEST);
        }

        // Register the user
        userService.registerUser(user);
        return new ResponseEntity<>("User registered successfully!", HttpStatus.CREATED);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        // Check if the user exists
        User user = userService.findUserByEmail(loginRequest.getEmail());
        if (user == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }

        // Check if the password matches
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return new ResponseEntity<>("Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>("Login successful.", HttpStatus.OK);
    }
}

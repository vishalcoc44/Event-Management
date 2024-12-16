package com.eventmanagement.eventmanagementsystem.service;




import com.eventmanagement.eventmanagementsystem.model.User;
import com.eventmanagement.eventmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register user
    public User registerUser(User user) {
        // Check if the user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already taken.");
        }
        return userRepository.save(user);
    }

    // Find user by email
    public User findUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    }
}

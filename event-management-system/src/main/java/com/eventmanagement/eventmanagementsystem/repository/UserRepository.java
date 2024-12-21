package com.eventmanagement.eventmanagementsystem.repository;

import com.eventmanagement.eventmanagementsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // Return an Optional instead of User
}

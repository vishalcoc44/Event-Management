package com.eventmanagement.eventmanagementsystem.repository;



import com.eventmanagement.eventmanagementsystem.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}

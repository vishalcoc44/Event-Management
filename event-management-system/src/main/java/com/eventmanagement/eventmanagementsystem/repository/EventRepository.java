package com.eventmanagement.eventmanagementsystem.repository;



import com.eventmanagement.eventmanagementsystem.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategory(String category);
}

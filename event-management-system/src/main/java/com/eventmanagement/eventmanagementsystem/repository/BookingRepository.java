package com.eventmanagement.eventmanagementsystem.repository;



import com.eventmanagement.eventmanagementsystem.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
}

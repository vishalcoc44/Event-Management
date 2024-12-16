package com.eventmanagement.eventmanagementsystem.controller;


import com.eventmanagement.eventmanagementsystem.model.Booking;
import com.eventmanagement.eventmanagementsystem.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/book")
    public Booking bookEvent(@RequestBody Booking booking) {
        return bookingService.bookEvent(booking);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingService.getBookingsByUser(userId);
    }
}

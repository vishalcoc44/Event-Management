package com.eventmanagement.eventmanagementsystem.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;
    private String venueName;
    private String venueType;
    private String location;
    private int ticketsAvailable;
    private double ticketPrice;
    private String startTime;
    private String endTime;
    private String imageUrl; // Updated to handle image URL

    // Getters and Setters
}

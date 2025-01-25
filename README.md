The Event Management System is a full-stack application designed to manage events, bookings, categories, and users. It is built using a combination of modern technologies including TypeScript for the frontend and Spring Boot for the backend. The application supports both administrative and customer functionalities.

Folder Structure :

Root Directory

frontend: Contains the TypeScript frontend application.

gradle: Contains Gradle build files for the project.

src: Contains the backend Java files for the Spring Boot application.

Frontend

Located in the frontend folder:

public

Contains static assets such as images, favicon, etc.

src

Contains the source code for the TypeScript application.

app

admin: Contains administrative pages such as bookings, categories, customers, and events.

bookings/page.tsx: Manages booking-related functionalities.

categories/page.tsx: Manages category-related functionalities.

category/page.tsx: Handles specific category details.

customers/page.tsx: Manages customer-related functionalities.

event/page.tsx: Handles individual event details.

events/page.tsx: Manages all events.

register/page.tsx: Handles admin registration.

customer: Contains customer-specific pages.

bookings/page.tsx: Manages customer bookings.

globals.css: Contains global CSS styles.

layout.tsx: Defines the layout for the application.

page.tsx: Main entry page for the application.

components

ui: Contains reusable UI components.

AuthModal.tsx: Authentication modal.

EventList.tsx: Event listing component.

EventSearch.tsx: Event search component.

Footer.tsx: Footer component.

Header.tsx: Header component.

contexts

AuthContext.tsx: Context for authentication.

BookingContext.tsx: Context for booking management.

CategoryContext.tsx: Context for category management.

CustomerContext.tsx: Context for customer-related data.

EventContext.tsx: Context for event management.

lib

utils.ts: Utility functions for the frontend.

Backend

Located in the src folder:

libs

mysql-connector-j-8.4.0.jar: MySQL connector for database integration.

main

java

com.eventmanagement.eventmanagementsystem

config

SecurityConfig.java: Configures application security.

controller

AuthController.java: Handles authentication endpoints.

BookingController.java: Manages booking-related endpoints.

CategoryController.java: Handles category management endpoints.

EventController.java: Manages event-related endpoints.

dto

LoginRequest.java: Data transfer object for login requests.

model

Booking.java: Entity for booking.

Category.java: Entity for category.

Event.java: Entity for event.

User.java: Entity for user.

repository

BookingRepository.java: Repository for bookings.

CategoryRepository.java: Repository for categories.

EventRepository.java: Repository for events.

UserRepository.java: Repository for users.

service

EventManagementService.java: Service layer for business logic.

EventManagementSystemApplication.java: Main application class.

resources
Contains application configuration files.

test

Contains test files for the backend application.

How to Run

Prerequisites

Node.js and npm (for the frontend)

Java 11 or higher (for the backend)

MySQL (for the database)

Gradle (for backend build management)

Frontend

Navigate to the frontend directory.

Install dependencies:

npm install

Start the development server:

npm start

Backend

Navigate to the src directory.

Build the application using Gradle:

gradle build

Run the application:

java -jar build/libs/event-management-system-0.0.1-SNAPSHOT.jar

Database Setup

Ensure MySQL is running.

Create a database named event_management.

Configure database connection in application.properties (located in src/main/resources).

Features

Admin Panel: Manage events, categories, bookings, and customers.

Customer Interface: View and book events.

Authentication: Secure login for admin and customers.

Event Search: Search and filter events easily.

Responsive UI: User-friendly interface designed for various devices.

Technologies Used

Frontend: TypeScript, CSS

Backend: Spring Boot

Database: MySQL

Build Tools: Gradle



# Event Management System

A comprehensive event management platform built with Next.js for the frontend and Spring Boot for the backend. This system allows users to browse events, make bookings, and provides administrators with tools to manage events, categories, and users.

## Features

### Customer Features
- Browse events with search and filter capabilities
- View event details including venue, time, and ticket availability
- Register and login to user accounts
- Book tickets for events
- View booking history

### Admin Features
- Manage event categories (add, edit, delete)
- Create and manage events
- View all bookings
- View customer information
- Register new admin users

## Tech Stack

### Frontend
- **Next.js 14** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **Framer Motion** - Animation library
- **Context API** - State management

### Backend
- **Spring Boot** - Java-based backend framework
- **Spring Security** - Authentication and authorization
- **JPA/Hibernate** - ORM for database operations
- **JWT** - Token-based authentication

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── app/                  # Next.js pages and layouts
│   │   ├── admin/            # Admin-specific pages
│   │   ├── customer/         # Customer-specific pages
│   │   ├── layout.tsx        # Root layout with providers
│   │   └── page.tsx          # Home page
│   ├── components/           # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Page footer
│   │   └── ...
│   └── contexts/             # React context providers
│       ├── AuthContext.tsx   # Authentication state
│       ├── EventContext.tsx  # Event management
│       └── ...
```

### Backend
```
src/main/java/com/eventmanagement/eventmanagementsystem/
├── config/                   # Configuration classes
├── controller/               # REST API endpoints
├── dto/                      # Data transfer objects
├── model/                    # Entity classes
├── repository/               # Data access layer
├── security/                 # Security configuration
└── service/                  # Business logic
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Java JDK 17+
- Maven
- MySQL or PostgreSQL

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Access the application at http://localhost:3000

### Backend Setup
1. Configure database connection in `application.properties`

2. Build the application:
   ```
   mvn clean install
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

4. The API will be available at http://localhost:8080

## User Flows

### Customer Flow
1. Browse events on the homepage
2. Register/login to create an account
3. Select an event and purchase tickets
4. View booking history in the customer dashboard

### Admin Flow
1. Login with admin credentials
2. Manage categories and events
3. View all bookings and customer information
4. Register new admin users if needed

## Authentication

The system uses JWT-based authentication:
- Tokens are generated upon successful login
- Protected routes require valid tokens
- Different permissions for admin and customer roles

## Data Models

### User
- Personal information (name, email, contact)
- Authentication details (password)
- Role (admin/customer)

### Event
- Event details (title, description, venue)
- Ticket information (price, availability)
- Scheduling (start/end time)

### Booking
- Event reference
- Customer information
- Ticket quantity and total price

### Category
- Title and description for event categorization

## Future Enhancements

- Payment gateway integration
- Email notifications
- Event reviews and ratings
- Advanced search and filtering
- Mobile application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# WEB-II
A microservices-based application for ticket sales management, featuring user management, event registration, and sales processing. The project is built with Spring Boot and utilizes a Netflix Eureka naming server for service discovery and a gateway for request routing.

# Ticket Sales Management System

This is a microservices-based application for managing ticket sales. The system is composed of the following services:

* **User Service**: Manages user data, including authentication and user information.
* **Sales Service**: Handles event registration and ticket sales.
* **Naming Server**: A Netflix Eureka server for service registration and discovery.
* **Gateway**: A gateway service that routes requests to the appropriate microservice.

## Architecture

The application follows a microservices architecture, where each service is responsible for a specific business domain. The services are registered with the Naming Server, which allows them to discover and communicate with each other. The Gateway service acts as a single entry point for all client requests, routing them to the appropriate service based on the request path.

## Getting Started

To run the application, you will need to have Docker and Docker Compose installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ticket-sales.git](https://github.com/your-username/ticket-sales.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd ticket-sales
    ```

3.  **Run the application using Docker Compose:**
    ```bash
    docker-compose -f docker-compose-dev.yaml up --build
    ```
    This will start all the services and the PostgreSQL database. The application will be available at `http://localhost:8123`.

## Endpoints

### User Service

The User Service provides the following endpoints for managing users:

* **GET /users/status**: Checks the status of the service.
* **GET /users**: Retrieves a list of all users.
* **POST /users**: Creates a new user.
* **GET /users/{userId}**: Retrieves a user by their ID.
* **GET /users/byname/{name}**: Retrieves a list of users by their name.
* **PUT /users**: Updates an existing user.
* **PUT /users/password**: Updates the password of a user.
* **DELETE /users/remove**: Deletes a user.
* **PUT /users/creditcard**: Updates the credit card information of a user.

### Sales Service

The Sales Service provides the following endpoints for managing events and sales:

* **POST /events**: Creates a new event.
* **GET /events**: Retrieves a list of all events.
* **GET /events/{id}**: Retrieves an event by its ID.
* **PUT /events/{id}**: Updates an existing event.
* **DELETE /events/{id}**: Deletes an event.
* **POST /sales**: Creates a new sale.
* **GET /sales/{id}**: Retrieves a sale by its ID.
* **DELETE /sales/{id}**: Deletes a sale.

Stock Tracker App

A stock tracking application built with a Java Spring Boot backend and a React.js frontend. The app allows users to manage stock positions, view real-time stock prices, and track the performance of their stock portfolio.

Features
- Add, update, and delete stock positions.
- Fetch real-time stock prices for each position.
- Calculate current portfolio value based on stock prices.
- View profit/loss on individual positions.

Tech Stack

Backend:
- Java (Spring Boot)
- MySQL (Database)
- ModelMapper (DTO to entity mapping)
- REST API (CRUD operations)

Frontend: 
- React.js
- Axios (HTTP requests)
- Bootstrap (UI styling)
- React Router (navigation)

Installation:

Prerequisites:
- Java 11+ and Maven
- Node.js and npm
- MySQL

Backend setup:
- Clone the repository
- Configure MySQL
  - Create a database named stocktracker
  - Update application.properties with your MySQL credentials
- Build and run Spring Boot application
  - mvn clean install
  - mvn spring-boot:run

Frontend setup:
- Navigate to stocktracker-frontend
- Install dependencies:
  - npm install
- Start the React server:
  - npm start

Future improvements:
- User authentication and session management
- Real-time updates using WebSockets
- Data visualization for better stock performance tracking

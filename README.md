
A backend airline management project built with **Node.js, Express.js, MySQL, and Sequelize**, using a microservices architecture.

## Features

- User registration, login, and JWT authentication
- Flight, city, and airport management
- Booking management
- API Gateway with authentication checks and rate limiting
- RabbitMQ-based booking notifications
- Email reminders using Nodemailer and Google OAuth

## Tech Stack

Node.js · Express.js · MySQL · Sequelize · JWT · bcryptjs · RabbitMQ · Axios · Nodemailer

## Project Structure

```text
Airline-Management/
├── API_Gateway/
├── AUTHSERVICE/
├── BOOKINGSERVICE/
├── FLIGHTANDSEARCHSERVICE/
└── REMINDERSERVICE/
```

## Getting Started

**Prerequisites:** Node.js, MySQL, and RabbitMQ.

1. Clone the repository:

   ```bash
   git clone https://github.com/ayushjagtap2022/Airline-Management.git
   cd Airline-Management
   ```

2. Install dependencies in each service:

   ```bash
   cd API_Gateway && npm install
   cd ../AUTHSERVICE && npm install
   cd ../BOOKINGSERVICE && npm install
   cd ../FLIGHTANDSEARCHSERVICE && npm install
   cd ../REMINDERSERVICE && npm install
   ```

3. Configure the database and environment variables for each service. Set the required MySQL credentials, JWT secret, RabbitMQ connection, and (for email reminders) Google OAuth credentials. Keep secrets out of Git.

4. Start each service in a separate terminal:

   | Service | Command |
   |---|---|
   | API Gateway | `cd API_Gateway && npm start` |
   | Auth Service | `cd AUTHSERVICE && npm start` |
   | Booking Service | `cd BOOKINGSERVICE && npm start` |
   | Flight & Search Service | `cd FLIGHTANDSEARCHSERVICE && npm run dev` |
   | Reminder Service | `cd REMINDERSERVICE && npm start` |

   Start MySQL and RabbitMQ before the dependent services. The API Gateway listens on port **3005**; check each service's configuration for its port and database settings.

## Architecture

```text
Client
  |
API Gateway
  |
  +--> Auth Service
  +--> Booking Service ------> RabbitMQ ------> Reminder Service
  +--> Flight & Search Service
```

## Author

**Ayush Jagtap** · [GitHub](https://github.com/ayushjagtap2022)

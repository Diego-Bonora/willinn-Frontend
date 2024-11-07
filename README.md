# Willinn Technical Test Project

This is a technical test project for Willinn, built using [Next.js](https://nextjs.org). The project features a complete user management system, including login functionality, listing users in a table with pagination, user creation, modification, and deletion. Additionally, the project includes a Dockerfile and docker-compose setup for easy containerization.

The project is also deployed on Vercel. You can access it [here](https://willinn-frontend.vercel.app/).

## Getting Started

### Clone the Repository

To get started, first clone the repository:

```bash
git clone https://github.com/Diego-Bonora/willinn-Frontend
cd willinn-Frontend
```

### Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Run the Development Server

Once the dependencies are installed, you can start the development server with the following command:

```bash
npm run dev
```

This will run the application on [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- **Login**: Fully functional login system.
- **User Listing**: Display a list of users in a table with pagination.
- **User Management**: Ability to create, modify, and delete users.
- **Docker Support**: Includes a Dockerfile and docker-compose for containerization.

## Docker Support

This project also includes Docker and docker-compose configurations for easy deployment. To build and run the project in a containerized environment, you can use:

```bash
docker-compose up --build
```

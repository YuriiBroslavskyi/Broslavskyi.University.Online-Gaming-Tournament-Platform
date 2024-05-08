# #24 - Online Gaming Tournament Platform

## Author
Yurii Broslavskyi
FeP-21

https://t.me/Yura_ne_yura

broslav25@gmail.com

## Description: 
The Online Gaming Tournament Platform is a web-based application designed to provide gamers with a platform to compete in tournaments, join leagues, and connect with fellow gaming enthusiasts. With features like OAuth 2.0 integration, Azure deployment, and continuous delivery, it offers a seamless experience for gamers to engage in competitive gaming.

## Project Architecture Documentation

**Folder Structure:**

1. **Client:**
   - **Public:** Contains static assets like HTML files, images, and favicon.
   - **Src:**
     - **App:** Main application component responsible for rendering routes and managing state.
     - **Components:** Reusable UI components used throughout the application.
     - **Context:** Context providers for managing global state using React Context API.
     - **Css:** Stylesheets for styling components and pages.
     - **Pages:** React components representing different pages of the application.

2. **Server:**
   - **Config:** Configuration files for the server, such as environment variables and database configurations.
   - **Src:**
     - **Controllers:** Handlers for processing incoming requests and generating responses.
     - **Models:** Database schema definitions using Mongoose.
     - **Routes:** Express.js route definitions for handling API endpoints.
     - **Utils:** Utility functions used across the server-side codebase.

**Backend Architecture:**
- The server-side architecture is based on the Express.js framework, providing a robust and flexible foundation for building web applications.
- Routes defined in the `routes` directory handle incoming HTTP requests and delegate processing to appropriate controller functions.
- Controller functions interact with database models defined in the `models` directory to perform CRUD operations and business logic.
- Middleware functions can be utilized for tasks such as request validation, authentication, and error handling.

**Frontend Architecture:**
- The frontend is built using React.js, a popular JavaScript library for building user interfaces.
- Components in the `components` directory encapsulate UI elements and can be reused across different pages.
- Context providers defined in the `context` directory manage global state, enabling communication between components.
- CSS stylesheets in the `css` directory provide styling for components and pages, following modular and responsive design principles.

**Authentication:**
- Authentication is implemented using Passport.js middleware, providing authentication strategies for various providers (OAuth).
- User authentication state is managed using JSON Web Tokens (JWT) stored in local storage.

**Database Schema:**
- Database schema definitions are created using Mongoose, an Object Data Modeling (ODM) library for MongoDB.
- Schemas defined in the `models` directory represent different data entities and define their structure, validation rules, and relationships.

**Deployment:**
- Deployment configuration and environment variables are stored in the `config` directory, facilitating seamless deployment to various hosting platforms.

**Notification System** 
- After creating tournament or changing any league, all users will be informed about its creation in latest event tab.

**Feedback Mechanism**
- Users can provide feedback on tournaments, leagues, and overall platform experience to help improve future events. For better filtering of feedbacks, users can select a topic(e.g league issue, tournament issue etc.).

## Development Plan on a Weekly Basis

- ### Week 1:
  - Implement feature: User Registration with Google OAuth 2.0.✅
  - Set up Azure deployment environment.✅
  - Create basic project structure on GitHub repository.✅
  - Write getting started documentation for local setup.✅
  - Create initial architecture diagram.✅

- ### Week 2:
  - Implement feature: Tournament Creation functionality.✅
  - Configure continuous integration/continuous delivery pipeline.✅
  - Develop Postman collection for testing endpoints.
  - Write documentation for project architecture.✅
  - Define tasks decomposition for ongoing development.✅

- ### Week 3:
  - Implement feature: League Joining capability.✅
  - Set up unit tests for key services.
  - Refine documentation based on feedback.✅
  - Conduct initial testing of deployed application.✅
  - Plan for next sprint based on project tasks decomposition.✅

- ### Week 4:
  - Implement feature: Profile Management for users.
  - Fine-tune Azure deployment settings.
  - Enhance unit test coverage for improved reliability.
  - Review and update project tasks decomposition.✅
  - Prepare for upcoming feature implementations.✅

- ### Week 5:
  - Implement feature: Matchmaking algorithm.
  - Optimize Azure deployment for scalability.
  - Perform code review and address any issues.✅
  - Update documentation with latest changes.✅
  - Test matchmaking functionality thoroughly.

- ### Week 6:
  - Implement feature: Live Chat integration.
  - Monitor Azure deployment for performance.
  - Conduct load testing on live chat system.
  - Update documentation with live chat setup instructions.
  - Plan for upcoming feature enhancements.✅
  - 
- ### Week 7:
  - Implement feature: Leaderboards display.
  - Fine-tune Azure security settings.
  - Perform security audit on the platform.
  - Update documentation with security measures.
  - Test leaderboard functionality across different scenarios.

- ### Week 8:
  - Implement feature: Notification System.✅
  - Monitor and optimize Azure costs.
  - Conduct user acceptance testing (UAT) on notification features.✅
  - Update documentation with notification setup guide.✅
  - Plan for further user engagement features.✅
    
- ### Week 11:
  - Implement feature: Feedback Mechanism for users.✅
  - Perform final round of testing on feedback mechanism.✅
  - Update documentation with feedback mechanism details.✅
  - Prepare for project deployment.✅
  - Ensure all tasks are completed for successful deployment.✅

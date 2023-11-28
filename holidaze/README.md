# Holidaze

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API](#API)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Scripts](#scripts)
- [Linting](#linting)
- [Deployment](#deployment)
- [GitHub Repository](#github-repository)
- [Style Guide](#style-guide)
- [Design Prototype](#prototype)
- [Acknowledgments](#acknowledgments)

## Introduction

Holidaze is a web application designed to provide users with a seamless experience for managing venues and bookings. Whether you're a venue manager or a user looking to book a space, Holidaze offers a user-friendly interface to meet your needs.

## Features

1. User Authentication: Allow users to create accounts, log in, and manage their profiles.

2. Venue Management: For venue managers, provide the ability to add, edit, and delete venues.

3. Booking System: Enable users to browse venues and make bookings for specific dates.

4. Profile Management: Users and venue managers can update their role (venue manager/ user) and avatars.

5. Responsive Design: Ensure a seamless user experience across various devices and screen sizes.

6. Search and Filters: Allow users to search for venues based on location and venue-names.

7. Venue managers: Provide venue managers with a dashboard to view bookings, create and manage venues

## Technologies

- **React**: ^18.2.0, [Documentation](https://reactjs.org/)
- **React Router DOM**: ^6.17.0, [Documentation](https://reactrouter.com/)
- **Styled Components**: ^6.1.0, [Documentation](https://styled-components.com/)
- **Bootstrap**: ^5.3.2, [Documentation](https://getbootstrap.com/)
- **Font Awesome**: ^6.4.2, [Documentation](https://fontawesome.com/)
- **Axios**: ^1.6.0, [Documentation](https://axios-http.com/)
- **React Datepicker**: ^4.23.0, [GitHub](https://github.com/Hacker0x01/react-datepicker)
- **React Modal**: ^3.16.1, [GitHub](https://github.com/reactjs/react-modal)
- **Classnames**: ^2.3.2, [GitHub](https://github.com/JedWatson/classnames)
- **React Scripts**: 5.0.1, [GitHub](https://github.com/facebook/create-react-app)
- **Testing Libraries**:
  - **Jest DOM**: ^5.17.0, [GitHub](https://github.com/testing-library/jest-dom)
  - **React Testing Library**: ^13.4.0, [Documentation](https://testing-library.com/docs/react-testing-library/intro/)
  - **User Event**: ^13.5.0, [GitHub](https://github.com/testing-library/user-event)
- **Babel Plugin Proposal Private Property In Object**: ^7.21.11, [GitHub](https://github.com/babel/babel/tree/main/packages/babel-plugin-proposal-private-property-in-object)
- **ESLint**: Extends "react-app" and "react-app/jest", [Documentation](https://eslint.org/)

## API

The API for the application can be found [here](https://docs.noroff.dev/) under Holidaze Endpoints
The API used for fetshing data: [https://api.noroff.dev/api/v1/holidaze]

## Project Structure

The project is organized into the following directories and files:

- **src**: Contains the source code of the application.
- **Auth**:
  - Components
  - Constants
  - Context
  - Utils
- **Components**: Reusable React components used throughout the project.
- **Pages**:
  - Home
  - Login
  - Logout
  - Profile
  - Register
- **Styles**: all styling modules
- **App.js**: The main application component responsible for routing.
- **index.js**: The entry point of the application.

## Setup

To run this project locally, follow these steps:

1. Clone the repository from GitHub.

2. Navigate to the project directory.

3. Install dependencies using `npm install`.

4. Start the development server using `npm start`.

5. Build the production-ready version of the application using `npm build`.

6. Run tests using `npm test`.

## Scripts

- **start**: Launches the development server for local development.
- **build**: Builds the production-ready version of the application.
- **test**: Runs tests using the testing library.
- **eject**: Ejects from Create React App, allowing more advanced configuration.

## Linting

![ESLint](https://img.shields.io/badge/ESLint-Configured-brightgreen)

This project uses ESLint for code linting and follows the configuration provided by `react-app`.

## Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa3fa2d4-29aa-47bc-9f5c-a5e92269b439/deploy-status)](https://app.netlify.com/sites/soft-faun-5457e1/deploys)

This project is deployed on [Netlify] and can be accessed [here](https://soft-faun-5457e1.netlify.app/).

## GitHub Repository

![GitHub license](https://img.shields.io/github/license/Ingsy/Holidaze)

![GitHub last commit](https://img.shields.io/github/last-commit/Ingsy/Holidaze)

The public GitHub repository for this project can be found [here](https://github.com/Ingsy/Holidaze/tree/e3d5f4ed795924b209e04841cd84de75e7754350/holidaze)

## Style Guide

The style Guide for this project can be found [here](https://xd.adobe.com/view/1397bb78-6f8b-4eee-b64a-f2269c7563b6-46c4/)

## Design Prototype

The Prototype for this project can be found [here](https://xd.adobe.com/view/6bf9582a-4249-4f45-9e3f-b9b316472e9d-3eaa/)

The Prototype for mobile can be found [here](https://xd.adobe.com/view/206e3fb4-cb8a-49ab-a88a-f2d155dcec1b-753d/)

## Gantt chart

The Gantt chart for project timing can be found [here](https://trello.com/b/ynk4OU6m/project-exam-2/timeline)
Powerup Gantt chart by Trello can be found [here](https://placker.com/app#/gantt/view/shs3bhuopefpd?e=b&s=p4eaed)

## Kanban project board

The kanban project board can be found [here](https://trello.com/b/ynk4OU6m/project-exam-2)

## Acknowledgments

### Placeholder Images

- Source: [Lorem Picsum](https://picsum.photos/id/57/200/300)

  - Description: This image is used as a placeholder when no images are added to a venue in the project.

- Source: [Lorem Picsum](https://picsum.photos/id/225/200/300)

  - Description: Another placeholder image utilized when no venue images are present.

- Source: [Lorem Picsum](https://picsum.photos/id/292/200/300)
  - Description: The third placeholder image used in scenarios where a venue has no associated images.

### Color Inspiration

- Canva Color Palettes

  - Source: [Canva Color Palettes](https://www.canva.com/colors/color-palettes)
  - Description: The project's color scheme was inspired by Canva's color palettes

### Natural Language Processing and Code Assistance

- ChatGPT by OpenAI
  - Source: [ChatGPT](https://www.openai.com/)
  - Description: The project leveraged ChatGPT by OpenAI for natural language processing, providing assistance in explaining code snippets, generating examples, and facilitating communication during development.

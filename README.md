# Twitter Clone Frontend

This is the frontend for the Twitter Clone application. It is built using **React** with **Vite** as the build tool and includes features for user interaction, tweet management, and a responsive design.

## Features

- **User Authentication**: Seamless integration with Google OAuth.
- **Tweet Management**: Post, view, and interact with tweets.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **State Management**: Managed efficiently using Redux Toolkit.
- **Form Handling**: Built with React Hook Form and Zod for validation.
- **File Uploads**: Integrated Uploadcare for media uploads.
- **Theming**: Dark and light mode support using Next Themes.

---

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Chakra UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Real-time Communication**: Socket.IO Client
- **Media Uploads**: Uploadcare

---

## Installation

### Prerequisites

- Node.js installed (version 16 or later recommended)
- A running backend server for API communication

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/twitter-clone-frontend.git
   cd twitter-clone-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_API_URL=your-backend-api-url
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. Start the application:
   - For development:
     ```bash
     npm run dev
     ```
   - For production preview:
     ```bash
     npm run preview
     ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run lint`**: Run ESLint to check for code quality issues.
- **`npm run preview`**: Preview the production build locally.

---

## Folder Structure

```
twitter-clone-frontend/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   ├── redux/          # Redux store and slices
│   ├── routes/         # Application routes
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
├── .env                # Environment variables
├── package.json        # Project configuration
├── README.md           # Project documentation
```

---

## Dependencies

| Package                | Version  | Description                                  |
|------------------------|----------|----------------------------------------------|
| @chakra-ui/react       | ^3.1.2   | UI component library for styling.            |
| @reduxjs/toolkit       | ^2.3.0   | State management library.                    |
| @react-oauth/google    | ^0.12.1  | Google OAuth integration.                    |
| axios                  | ^1.7.9   | HTTP client for making API requests.         |
| react                  | ^18.3.1  | Frontend library for building UIs.           |
| react-router-dom       | ^6.28.0  | Routing library for React.                   |
| react-hook-form        | ^7.53.2  | Form management library.                     |
| socket.io-client       | ^4.8.1   | Real-time communication library.             |
| zod                    | ^3.23.8  | Schema validation library.                   |

---

## Dev Dependencies

| Package                | Version  | Description                                  |
|------------------------|----------|----------------------------------------------|
| @vitejs/plugin-react   | ^4.3.3   | Vite plugin for React.                       |
| eslint                 | ^9.13.0  | Linting tool for JavaScript and TypeScript.  |
| typescript             | ~5.6.2   | TypeScript support for the project.          |
| vite                   | ^5.4.10  | Frontend build tool.                         |

---

## Future Enhancements

- Add advanced tweet filtering and search functionality.
- Integrate image and video uploads.
- Improve accessibility for better user experience.
- Add end-to-end testing with Cypress.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes.
4. Push the branch and create a pull request.

---

## License

This project is licensed under the **ISC License**.

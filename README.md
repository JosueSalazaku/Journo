# Journo 🌍✍️

Journo is a travel blogging platform inspired by Medium, designed for sharing stories, experiences, and pictures from your adventures around the globe. This project also serves as a playground for experimenting with modern web development concepts and tools.

## Features

### User Authentication
- Supabase-powered authentication with support for Google and (Notion) providers.
- Save user data from providers during sign-up/sign-in.

### Create, Read, Update, Delete (CRUD)
- Seamlessly manage blog posts with basic CRUD operations.

### Travel Information Integration
- Use an API to fetch and display travel details for various destinations.

### Dynamic Content Display
- Showcase user data, including blog posts and profile details.

### Rich Text & Images
- Publish posts with blog text and accompanying images.

## Tech Stack
- **Framework:** T3 Next.js
- **Styling:** Tailwind CSS with shadcn
- **Database:** PostgreSQL with DrizzleORM
- **Authentication:** Better-auth
- **Backend:** API integration for travel-related data
- **Frontend:** React with hooks and modern UI practices

## Learning Goals
This project allows me to practice and refine the following skills:
- **Authentication:** Setting up secure user authentication with third-party providers.
- **Data Management:** Understanding CRUD operations and managing relational data with PostgreSQL and DrizzleORM.
- **API Integration:** Adding dynamic travel data to enhance user experience.
- **React Fundamentals:** Leveraging React hooks and front-end basics to create an intuitive and responsive UI.

## Getting Started
1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure your environment variables for Supabase, database, and API keys.
4. Run the development server:
    ```bash
    npm run dev
    ```
5. Access the app at [http://localhost:3000](http://localhost:3000).

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for discussion.

# Nawy Apartments

A full-stack monorepo for managing and browsing apartment listings with a modern user interface.

## For Reviewers - Quick Start

This project is designed for easy setup and review:

1. **Clone and start the project:**

   ```bash
   git clone nawy-apartments-assesment
   cd nawy-apartments-assesment
   docker compose up --build
   ```

   **Alternative: Using VS Code DevContainers:**
   - Open the project in VS Code
   - When prompted, click "Reopen in Container" or "install DevContainers" then "Reopen in Container"
   - VS Code will build and start the development environment automatically

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

3. **Notes for reviewers:**
   - **Database Seeding**: The database is automatically seeded with realistic dummy apartment listings.
     - Seeding runs automatically in both development and production environments
   - **Image Generation**: Images are dynamically generated using [Lorem Picsum](https://picsum.photos/) for demonstration purposes only
     - Different apartment types (villa, townhouse, apartment, etc.) get type-appropriate images
     - Each apartment has a main image and multiple detail images
   - **Key Features**:
     - Advanced filtering by unit name, unit number, and project name
     - Pagination for apartment listings (21 listings per page by default)
     - Responsive design for all device sizes

## Project Overview

Nawy Apartments is a comprehensive platform that allows users to browse and filter available apartments across different projects. The application provides information about each apartment, including specifications, pricing, and images.

## Project Structure

This project is organized as a monorepo using pnpm workspaces:

```
nawy-apartments-assesment/
├── apps/
│   ├── backend/             # Node.js Express backend
│   │   ├── prisma/          # Database schema and migrations
│   │   └── src/             # Backend source code
│   │       ├── routes/      # API routes
│   │       └── utils/       # Utility functions
│   └── frontend/            # Next.js frontend
│       ├── src/
│       │   ├── app/         # Next.js app router
│       │   ├── components/  # Reusable UI components
│       │   └── lib/         # Frontend utilities and API clients
└── docker-compose.yml       # Docker configuration
```

## Data Models

### Project

- Properties for real estate developments
- Contains multiple apartments

### Apartment

- Individual apartment units within projects
- Includes details like area, bedrooms, price, and images

## Technologies Used

- **Backend**:
  - Node.js with TypeScript
  - Express for REST API
  - Prisma ORM for PostgreSQL access
  - Containerized with Docker

- **Frontend**:
  - Next.js with App Router
  - Tailwind CSS for styling
  - Responsive design for mobile and desktop

- **Infrastructure**:
  - Docker Compose for orchestration
  - PostgreSQL database
  - DevContainer support for VS Code

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Git](https://git-scm.com/downloads)
- [pnpm](https://pnpm.io/installation) (for local development)
- [Node.js](https://nodejs.org/) version 18 or higher
- [VS Code](https://code.visualstudio.com/) (optional, for DevContainer support)

## Development Setup

### Using Docker (Recommended)

```bash
# Start development environment
docker compose -f docker-compose.dev.yml up --build

# Watch for changes (development mode)
# Changes to both frontend and backend code will hot reload
```

### Local Development

```bash
# Install dependencies
pnpm install

# Start backend
cd apps/backend
pnpm dev

# Start frontend (in a separate terminal)
cd apps/frontend
pnpm dev
```

## Environment Variables

| Variable            | Description                  | Default Value                                                |
| ------------------- | ---------------------------- | ------------------------------------------------------------ |
| DATABASE_URL        | PostgreSQL connection string | postgresql://postgres:postgres@postgres:5432/nawy_apartments |
| NEXT_PUBLIC_API_URL | URL of the backend API       | http://backend:4000                                          |
| PORT                | Backend server port          | 4000                                                         |

## API Documentation

The backend provides a RESTful API for managing apartments and projects.

### Base URL

```
http://localhost:4000
```

### Apartments

#### Get All Apartments

```
GET /apartments
```

Query Parameters:

- `unitName` (optional): Filter by unit name
- `unitNumber` (optional): Filter by unit number
- `projectName` (optional): Filter by project name
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of results per page (default: 21)

Response:

```json
{
  "data": [
    {
      "id": 1,
      "unitName": "Deluxe Apartment",
      "unitNumber": "A101",
      "area": 120.5,
      "bedrooms": 2,
      "bathrooms": 2,
      "price": 250000,
      "description": "Modern apartment with sea view",
      "status": "available",
      "mainImage": "https://picsum.com/image.jpg",
      "images": ["https://picsum.com/image1.jpg", "https://picsum.com/image2.jpg"],
      "projectId": 1,
      "createdAt": "2023-06-01T00:00:00.000Z",
      "updatedAt": "2023-06-01T00:00:00.000Z",
      "project": {
        "id": 1,
        "name": "Coastal Heights",
        "location": "Alexandria"
      }
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 21,
    "pages": 3
  }
}
```

#### Get Apartment by ID

```
GET /apartments/:id
```

Path Parameters:

- `id`: Apartment ID

Response:

```json
{
  "id": 1,
  "unitName": "Deluxe Apartment",
  "unitNumber": "A101",
  "area": 120.5,
  "bedrooms": 2,
  "bathrooms": 2,
  "price": 250000,
  "description": "Modern apartment with sea view",
  "status": "available",
  "mainImage": "https://picsum.com/image.jpg",
  "images": ["https://picsum.com/image1.jpg", "https://picsum.com/image2.jpg"],
  "projectId": 1,
  "createdAt": "2023-06-01T00:00:00.000Z",
  "updatedAt": "2023-06-01T00:00:00.000Z",
  "project": {
    "id": 1,
    "name": "Coastal Heights",
    "location": "Alexandria",
    "description": "Luxury beachfront living"
  }
}
```

#### Create Apartment

```
POST /apartments
```

Request Body:

```json
{
  "unitName": "Deluxe Apartment",
  "unitNumber": "A101",
  "area": 120.5,
  "bedrooms": 2,
  "bathrooms": 2,
  "price": 250000,
  "description": "Modern apartment with sea view",
  "status": "available",
  "projectId": 1,
  "mainImage": "https://picsum.com/image.jpg",
  "images": ["https://picsum.com/image1.jpg", "https://picsum.com/image2.jpg"]
}
```

Required fields: `unitName`, `unitNumber`, `area`, `bedrooms`, `bathrooms`, `price`, `projectId`  
Optional fields: `description`, `status`, `mainImage`, `images`

Response:

```json
{
  "id": 1,
  "unitName": "Deluxe Apartment",
  "unitNumber": "A101",
  "area": 120.5,
  "bedrooms": 2,
  "bathrooms": 2,
  "price": 250000,
  "description": "Modern apartment with sea view",
  "status": "available",
  "mainImage": "https://picsum.com/image.jpg",
  "images": ["https://picsum.com/image1.jpg", "https://picsum.com/image2.jpg"],
  "projectId": 1,
  "createdAt": "2023-06-01T00:00:00.000Z",
  "updatedAt": "2023-06-01T00:00:00.000Z",
  "project": {
    "id": 1,
    "name": "Coastal Heights",
    "location": "Alexandria"
  }
}
```

## Features

- Apartment listing with filtering capabilities (by unit name, unit number, and project name)
- Detailed apartment view with comprehensive information
- Pagination for apartment listings
- Responsive design for mobile and desktop
- Containerized setup for easy deployment and development
- Automatic image generation for apartments

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

[Add your license information here]

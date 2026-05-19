# BreathClean

**Health-Optimized Urban Navigation**

![AQI Live Data](https://img.shields.io/badge/AQI-Live%20Data-emerald)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Express](https://img.shields.io/badge/Express-5-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![License](https://img.shields.io/badge/License-ISC-lightgrey)

---

## Overview

### The Problem
Urban air pollution varies significantly by location. Traditional navigation apps prioritize speed/distance but often route users through high-pollution zones like highways and industrial areas, contributing to long-term health risks.

### The Solution
BreathClean prioritizes health by integrating:
- Real-time AQI data from [AQICN](https://aqicn.org/api/)
- Weather conditions from [OpenWeather](https://openweathermap.org/api)
- Traffic congestion from [Mapbox](https://docs.mapbox.com/)
To compute **health scores (0-100)** for routes and recommend the cleanest paths.

---

## Key Features

- **Health-First Routing**  
  Score routes by air quality (PM2.5, O3, etc.), weather (temp, humidity), and traffic congestion

- **Route Comparison**  
  Display 3 route options with labels: "Cleanest Path", "Fastest", and "Balanced"

- **Multi-Modal Support**  
  Walking, cycling, and driving with mode-specific health metrics

- **Saved Routes**  
  Store and favorite routes with background-refreshed health scores

- **Background Scheduler**  
  Auto-refresh scores for all saved routes every 30 minutes

- **Secure Authentication**  
  Google OAuth 2.0 with JWT token management

- **Data Caching**  
  Redis caching for API results (30min scores, 1hr breakpoints)

---

## Tech Stack

### Frontend (Next.js 16)
- React 19 with hooks-only state management
- TypeScript 5 (strict mode)
- Tailwind CSS 4 + [shadcn/ui](https://ui.shadcn.com/)
- Mapbox GL JS for interactive maps
- [Sonner](https://sonner.emilkowal.dev/) for notifications
- Redis caching integration

### Backend (Express 5)
- TypeScript 5 with strict compiler options
- MongoDB with geospatial indexing (2dsphere)
- Upstash Redis for serverless caching
- Google OAuth via [simply-auth](https://www.npmjs.com/package/simply-auth)
- Rate limiting (10 req/min on scoring endpoint)

### Data Processing (Optional)
- Django 5.x microservice for batch processing
- [Pathway](https://pathway.com/) framework for streaming pipelines
- Python-based scoring transformers

---

## Project Structure

```
BreathClean/
├── client/              # Next.js frontend (port 3000)
├── server/              # Express backend (port 8000)
├── data-processing/     # Django/Pathway microservice (port 8001)
├── .github/workflows/   # CI/CD configurations
└── config/              # Linting and formatting tools
```

---

## Architecture

### Core Flow
```
[Client] → Express API → Redis Cache → MongoDB
          ↘            ↘
           → Django/Pathway (background scoring)
```

### Route Scoring Pipeline
1. **User Request**  
   - Mapbox returns 3 route geometries
   - Client sends routes to `/score/compute` endpoint

2. **Breakpoint Extraction**  
   - 3-4 evenly spaced points per route

3. **Parallel Data Fetch**  
   - AQICN + OpenWeather for each breakpoint
   - 5 concurrent requests with 8s timeout and 2 retries

4. **Score Calculation**  
   - Weather (40%): Temperature, Humidity, Pressure
   - AQI (30%): Inverse scale from 20→100 to 200→0
   - Traffic (30%): Congestion level (0-3)

5. **Caching & Storage**  
   - Redis cache for 30min
   - MongoDB for persistent user data

---

## API Endpoints

### Authentication
| Method | Endpoint                  | Description                  |
|--------|---------------------------|------------------------------|
| GET    | `/auth/google/link`       | Initiate Google OAuth flow   |
| GET    | `/auth/google/callback`   | Handle OAuth redirect        |
| GET    | `/auth/user`              | Retrieve authenticated user  |
| GET    | `/auth/logout`            | Clear authentication cookies |

### Route Scoring
**`POST /score/compute`**  
- **Request**: Route geometries + traffic data
- **Response**: Scores for each route with pollution reduction % and health metrics

### Saved Routes
| Method   | Endpoint                     | Description              |
|----------|------------------------------|--------------------------|
| GET      | `/saved-routes`              | List user's saved routes |
| POST     | `/saved-routes`              | Save new route           |
| DELETE   | `/saved-routes/:id`          | Delete route             |
| PATCH    | `/saved-routes/:id/favorite` | Toggle favorite status   |

### Scheduler
| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | `/scheduler/run`            | Manually trigger score update|
| GET    | `/scheduler/pathway-health` | Check Pathway server status  |

---

## Database Models

### User
```json
{
  "googleId": "string",
  "email": "string",
  "name": "string",
  "picture": "string",
  "emailVerified": "boolean"
}
```

### Route
```json
{
  "userId": "ObjectId",
  "from": { "address": "string", "location": [lng, lat] },
  "to": { "address": "string", "location": [lng, lat] },
  "routes": [
    {
      "distance": "number",
      "duration": "number",
      "travelMode": "string",
      "lastComputedScore": "number",
      "lastComputedAt": "Date"
    }
  ]
}
```

### BreakPoint
```json
{
  "routeId": "ObjectId",
  "location": [lng, lat],
  "aqiData": "object",
  "weatherData": "object"
}
```

---

## Getting Started

### Requirements
- Node.js 20+
- Python 3.10+ (for optional data processing)
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- [Upstash Redis](https://upstash.com/) (free tier available)
- API keys for Mapbox, AQICN, OpenWeather, and Google OAuth

### Setup
```bash
# 1. Clone and install
git clone https://github.com/kaihere14/BreathClean.git
npm install

# 2. Install Python dependencies (optional)
cd data-processing/dataProcessingServer
pip install -r requirements.txt
```

### Configuration
Create `.env` files in each service directory:

**Client**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your-token
```

**Server**
```env
MONGODB_URI=mongodb://localhost:27017
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
AQI_API_KEY=your-aqicn-token
WEATHER_API_KEY=your-openweather-token
```

**Data Processing Server**
```env
DJANGO_SECRET_KEY=your-secret
PATHWAY_URL=http://localhost:8001
```

### Running Locally
```bash
# Terminal 1 - Frontend
npm run dev:client

# Terminal 2 - Backend
npm run dev:server

# Terminal 3 - Optional data processor
cd data-processing/dataProcessingServer
python manage.py runserver 8001
```

Access at [http://localhost:3000](http://localhost:3000)

---

## Development

### Available Scripts
| Command                        | Purpose                          |
|-------------------------------|----------------------------------|
| `npm run dev:client`          | Start frontend development server |
| `npm run dev:server`          | Start backend development server  |
| `npm run build:client`        | Build frontend for production     |
| `npm run build:server`        | Compile backend TypeScript        |
| `npm run lint`                | Lint all code                     |
| `npm run format`              | Format code with Prettier         |

### Code Style
- TypeScript: Strict mode with `noUncheckedIndexedAccess`
- Prettier: Double quotes, 80-char line limit
- Tailwind: 2dsphere indexing for geospatial data
- Auto-formatted imports and classes

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

ISC License

---

**Built with care for a healthier urban future.**
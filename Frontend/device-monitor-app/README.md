Device Monitoring System

A full-stack device monitoring system using Angular for the frontend and .NET Web API (.NET 9) for the backend.

🚀 Project Overview

This application allows users to:

1. View a list of chambers
2. Create new chambers
3. View detailed info for each chamber
4. Monitor telemetry data (simulated real-time updates)

The frontend is built in Angular and consumes a RESTful API built with .NET 9 Web API.

🛠 Tech Stack

* Frontend (Angular)
    * Angular 15+
    * Bootstrap for styling
    * RxJS for handling observables (e.g. real-time simulation)
    * Chart.js (for telemetry visualization)

* Backend (C# .NET)
    * .NET 9 Web API
    * Repository Pattern
    * In-Memory storage (or can be extended to EF Core + SQL Server)
    * RESTful API endpoints

📁 Project Structure

Backend

Backend/DeviceMonitor.API/
├── Controllers/          # API endpoints
├── Models/               # Chamber & telemetry models
├── Repositories/         # Repository interfaces and implementations
├── Services/             # Business logic layer (if extended)
├── Program.cs            # Main entry

Frontend

Frontend/device-monitor-app/
├── src/app/
│   ├── components/
│   │   ├── chamber-list/         # List view for chambers
│   │   ├── chamber-create/       # Form to create new chamber
│   │   ├── chamber-detail/       # Detailed view per chamber
│   │   └── chamber-telemetry/    # Real-time telemetry visualization
│   ├── models/                   # TypeScript interfaces
│   ├── services/                 # API communication (chamber.service.ts)
│   ├── app.module.ts             # App-level module declarations
│   └── app-routing.module.ts     # Route configurations

📦 Setup Instructions

Prerequisites

.NET 9 SDK

Node.js & npm

Angular CLI (npm install -g @angular/cli)

Backend

cd Backend/DeviceMonitor.API
dotnet run

Frontend

cd Frontend/device-monitor-app
npm install
ng serve

Visit http://localhost:4200

📌 Features

✅ List and create chambers

✅ View detailed chamber info

✅ Simulated telemetry updates

✅ Modular Angular components

✅ RESTful backend

✅ Custom theming and styling

📚 API Endpoints

GET    /api/chambers
GET    /api/chambers/{id}
POST   /api/chambers
PUT    /api/chambers/{id}
DELETE /api/chambers/{id}

🧪 Testing & Improvements

Add unit tests for Angular services & components (Karma, Jasmine)

Extend backend with EF Core and SQL persistence

Add auth (JWT or Identity)
# NutriByte - MERN Food Application

## Project Overview

NutriByte is a user-friendly web app designed to empower consumers seeking greater insight into their dietary habits. Utilizing the comprehensive food composition data provided by the USDA (https://fdc.nal.usda.gov/download-datasets), NutriByte offers tools for users to look up, track, and analyze the nutritional information and ingredients of the food products they consume. The application is developed using the MERN (MongoDB, Express.js, React, Node.js) stack, providing distinct scalability as both the size of the database and the feature set of the application grow.

## Main Features

-   **Food Search & Discovery**: Search USDA's database of hundreds of thousands of foods.
-   **Nutrition Logging**: Track daily food consumption with detailed nutrient breakdown.
-   **Nutrition Analytics**: Visualize nutrition intake patterns over time.

-   **Custom Nutrition Targets**: Set and track personalized nutrition goals.

## Tech Stack

-   **Frontend**: React with TailwindCSS, CSS Modules
-   **Backend**: Node.js with Express.js
-   **Database**: MongoDB with Mongoose
-   **Authentication**: Email-based user authentication

## Main Features

-   **Food Search & Discovery**: Search USDA's database of hundreds of thousands of foods.
-   **Nutrition Logging**: Track daily food consumption with detailed nutrient breakdown.
-   **Custom Nutrition Targets**: Set and track personalized nutrition goals.
-   **Nutrition Analytics**: Visualize nutrition intake patterns over time.
-   **Custom Meal Logging**: Build Costom meals and generate Meal data based on
-   **Food Comparison**: Compare nutritional profiles of different foods side-by-side.

## Directory Structure

```
NutriByte/
├── backend/              # Backend code
│   ├── public/           # Static Launch Point
│   ├── controllers/      # Controller logic for API endpoints
│   ├── data/             # USDA food data JSON files
│   ├── middleware/       # Express middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── utils/            # Utility scripts
│   ├── app.js            # Express/Server app configuration
│   ├── nodemon.json      # Nodemon configuration
│   ├── .env              # Environment variables
│   ├── package.json      # Project dependencies
│   ├── package-lock.json # Dependency lock file
|
├── frontend/             # Frontend code
│   ├── public/           # Public assets
│   ├── src/              # Source code
│   │   ├── assets/       # Static assets and constants
│   │   ├── logic/        # Business logic and state management
│   │   ├── main/         # Main entry point
│   │   ├── services/     # API service modules
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   │   ├── components/   # Reusable UI components
│   │   │   ├── Background/         # Background component
│   │   │   ├── Fetching/           # Loading spinner component
│   │   │   ├── FoodLabel/          # Food label display component
│   │   │   ├── FoodList/           # Food list display component
│   │   │   ├── Footer/             # Footer component
│   │   │   ├── Header/             # Header component
│   │   │   ├── Navbar/             # Navigation bar component
│   │   │   └── MacroRangeSlider/   # Macro range slider component
│   │   ├── pages/        # Application pages
│   │   │   ├── CompareFood/        # Food comparison page
│   │   │   ├── CustomMeals/        # Custom meals page
│   │   │   ├── FoodLabelPage/      # Food label details page
│   │   │   ├── LandingPage/        # Landing page
│   │   │   ├── MacroMeals/         # Macro meals page
│   │   │   ├── SearchByBrand/      # Search by brand page
│   │   │   ├── SearchFood/         # Search food page
│   ├── .env              # Environment variables
│   ├── index.css         # Global CSS
│   ├── index.html        # HTML template
│   ├── index.jsx         # React entry point
│   ├── tailwind.config.js # TailwindCSS configuration
│   └── tsconfig.json     # TypeScript configuration
│   ├── package.json      # Project dependencies
│   ├── package-lock.json # Dependency lock file
|
├── star-app.jsx          # Main application entry point for a node launch
├── package.json          # Project dependencies
├── package-lock.json     # Dependency lock file
└── README.md             # Project documentation
```

## 🚀 quick start run

node star-app.jsx

## 🛠️ Setup

### Manual commands to Lanuch the application

**prebuild**

```bash
    new console
    cd ./backend/
    npm install
    rm -rf public
    cd ../frontend
    npm install
    cd ../
```

**To seed Database With Local Data**

```bash
    node ./backend/utils/uploadAllFoods.js #To seed Database With Generic Data
```

**Buidbuild**

```bash
    cd ./backend/
    cd npm run build
    cd ../
    cd ./frontend
    cd npm run build
    cd ../
```

**Tpostbuild**

```bash
    mv -f frontend/dist backend/public
```

**start**

```bash
    cd backend &&
    run start
```

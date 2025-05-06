# SkyWatcher - Your Personal Astronomical Events Tracker

SkyWatcher is a web application that provides daily reports of interesting astronomical events based on your specific location. It helps you discover what's happening in the night sky, including moon phases, visible planets, meteor showers, and ISS passes.

## Live Demo

Visit the live application: [SkyWatcher on GitHub Pages](https://openhands.github.io/SkyWatcher/)

## Features

- **Location-based sky events**: Get personalized astronomical information based on your exact coordinates
- **Moon phase tracking**: View current moon phase with visual representation and rise/set times
- **Visible planets**: See which planets are visible tonight and their positions
- **Meteor shower alerts**: Get information about active meteor showers, including peak dates and best viewing times
- **ISS tracking**: Know when the International Space Station will be visible from your location
- **Beautiful UI**: Dark-themed interface with animated star background for an immersive experience

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/openhands/SkyWatcher.git
   cd SkyWatcher
   ```

2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with your API keys:
   ```
   ASTRONOMY_API_KEY=your_astronomy_api_key
   SATELLITE_API_KEY=your_satellite_api_key
   WEATHER_API_KEY=your_weather_api_key
   ```

   Note: The application includes mock data, so it will work even without API keys, but real data will provide more accurate results.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:53965`

## API Integration

SkyWatcher integrates with the following APIs:

- **Astronomy API**: For moon phases and planet positions
- **N2YO API**: For ISS and satellite tracking
- **Weather API**: For cloud coverage and visibility conditions

## Technologies Used

### Frontend
- React
- Material-UI
- Vite
- Axios

### Backend
- Node.js
- Express
- Axios for API requests
- dotenv for environment variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Astronomy API for celestial body data
- N2YO for satellite tracking information
- All the stargazers and astronomy enthusiasts who inspired this project
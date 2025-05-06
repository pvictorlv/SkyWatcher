require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 57929;

// Middleware
app.use(cors());
app.use(express.json());

// API Keys (in production, these should be in .env file)
const ASTRONOMY_API_KEY = process.env.ASTRONOMY_API_KEY || 'demo';
const SATELLITE_API_KEY = process.env.SATELLITE_API_KEY || 'demo';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'demo';

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'SkyWatcher API is running' });
});

// Get celestial events for a specific location
app.get('/api/sky-events', async (req, res) => {
  try {
    const { latitude, longitude, date } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Get current date if not provided
    const eventDate = date || new Date().toISOString().split('T')[0];
    
    // Fetch data from multiple sources in parallel
    const [moonPhaseData, planetData, meteorShowerData, issPassesData] = await Promise.all([
      getMoonPhase(latitude, longitude, eventDate),
      getVisiblePlanets(latitude, longitude, eventDate),
      getMeteorShowers(eventDate),
      getISSPasses(latitude, longitude)
    ]);

    // Combine all data
    const skyEvents = {
      date: eventDate,
      location: { latitude, longitude },
      moonPhase: moonPhaseData,
      visiblePlanets: planetData,
      meteorShowers: meteorShowerData,
      issPasses: issPassesData
    };

    res.json(skyEvents);
  } catch (error) {
    console.error('Error fetching sky events:', error);
    res.status(500).json({ error: 'Failed to fetch sky events', details: error.message });
  }
});

// Helper functions to fetch data from various APIs

// Moon phase data
async function getMoonPhase(latitude, longitude, date) {
  // Always return mock data for demo purposes
  return getMockMoonPhaseData(date);
}

// Visible planets
async function getVisiblePlanets(latitude, longitude, date) {
  // Always return mock data for demo purposes
  return getMockPlanetData();
}

// Meteor showers
async function getMeteorShowers(date) {
  // Always return mock data for demo purposes
  return getMockMeteorShowerData(date);
}

// ISS passes
async function getISSPasses(latitude, longitude) {
  // Always return mock data for demo purposes
  return getMockISSData();
}

// Mock data functions for demo purposes
function getMockMoonPhaseData(date) {
  // Calculate a simple moon phase based on the date
  const moonCycle = 29.5; // days
  const baseDate = new Date('2023-01-01'); // New moon reference
  const targetDate = new Date(date);
  const daysDiff = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  const phase = (daysDiff % moonCycle) / moonCycle;
  
  let phaseName;
  let illumination;
  
  if (phase < 0.025 || phase >= 0.975) {
    phaseName = 'New Moon';
    illumination = 0;
  } else if (phase < 0.25) {
    phaseName = 'Waxing Crescent';
    illumination = phase * 4;
  } else if (phase < 0.275) {
    phaseName = 'First Quarter';
    illumination = 0.5;
  } else if (phase < 0.475) {
    phaseName = 'Waxing Gibbous';
    illumination = 0.5 + (phase - 0.25) * 2;
  } else if (phase < 0.525) {
    phaseName = 'Full Moon';
    illumination = 1;
  } else if (phase < 0.725) {
    phaseName = 'Waning Gibbous';
    illumination = 1 - (phase - 0.5) * 2;
  } else if (phase < 0.775) {
    phaseName = 'Last Quarter';
    illumination = 0.5;
  } else {
    phaseName = 'Waning Crescent';
    illumination = (1 - phase) * 2;
  }
  
  return {
    phase: phaseName,
    illumination: illumination.toFixed(2),
    age: Math.floor(phase * moonCycle),
    riseTime: '18:30',
    setTime: '06:45'
  };
}

function getMockPlanetData() {
  return [
    {
      name: 'Venus',
      altitude: 15.7,
      azimuth: 270.3,
      distance: 68000000,
      visible: true
    },
    {
      name: 'Mars',
      altitude: 45.2,
      azimuth: 180.5,
      distance: 78000000,
      visible: true
    },
    {
      name: 'Jupiter',
      altitude: 30.1,
      azimuth: 220.7,
      distance: 628000000,
      visible: true
    },
    {
      name: 'Saturn',
      altitude: -10.5, // Below horizon
      azimuth: 90.2,
      distance: 1280000000,
      visible: false
    }
  ];
}

function getMockMeteorShowerData(date) {
  const meteorShowers = [
    { name: 'Quadrantids', peak: '2025-01-03', rate: 40, active: { start: '2025-01-01', end: '2025-01-05' } },
    { name: 'Lyrids', peak: '2025-04-22', rate: 20, active: { start: '2025-04-16', end: '2025-04-25' } },
    { name: 'Eta Aquariids', peak: '2025-05-06', rate: 30, active: { start: '2025-04-19', end: '2025-05-28' } },
    { name: 'Perseids', peak: '2025-08-12', rate: 100, active: { start: '2025-07-17', end: '2025-08-24' } },
    { name: 'Orionids', peak: '2025-10-21', rate: 20, active: { start: '2025-10-02', end: '2025-11-07' } },
    { name: 'Leonids', peak: '2025-11-17', rate: 15, active: { start: '2025-11-06', end: '2025-11-30' } },
    { name: 'Geminids', peak: '2025-12-14', rate: 150, active: { start: '2025-12-04', end: '2025-12-17' } }
  ];
  
  const targetDate = new Date(date);
  
  // Find active meteor showers for the given date
  return meteorShowers.filter(shower => {
    const startDate = new Date(shower.active.start);
    const endDate = new Date(shower.active.end);
    return targetDate >= startDate && targetDate <= endDate;
  }).map(shower => {
    const peakDate = new Date(shower.peak);
    const isPeak = targetDate.toISOString().split('T')[0] === shower.peak;
    
    // Adjust rate based on proximity to peak
    let adjustedRate = shower.rate;
    if (!isPeak) {
      const daysToPeak = Math.abs(Math.floor((targetDate - peakDate) / (1000 * 60 * 60 * 24)));
      adjustedRate = Math.max(1, Math.floor(shower.rate / (daysToPeak + 1)));
    }
    
    return {
      name: shower.name,
      rate: adjustedRate,
      isPeak,
      peakDate: shower.peak,
      bestViewingTime: '00:00 - 04:00'
    };
  });
}

function getMockISSData() {
  // Generate mock ISS passes for the next few days
  const now = new Date();
  const passes = [];
  
  for (let i = 0; i < 5; i++) {
    const passDate = new Date(now);
    passDate.setDate(passDate.getDate() + i);
    passDate.setHours(20 + Math.floor(Math.random() * 4)); // Evening passes
    passDate.setMinutes(Math.floor(Math.random() * 60));
    
    const duration = 3 + Math.floor(Math.random() * 5); // 3-7 minutes
    const endTime = new Date(passDate);
    endTime.setMinutes(endTime.getMinutes() + duration);
    
    passes.push({
      startTime: passDate.toISOString(),
      endTime: endTime.toISOString(),
      duration: duration * 60, // in seconds
      maxElevation: 30 + Math.floor(Math.random() * 60) // 30-90 degrees
    });
  }
  
  return passes;
}

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkyWatcher backend server running on http://localhost:${PORT}`);
});
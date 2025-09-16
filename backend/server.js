const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const trailRoutes = require('./router/trailRoutes');
const path = require('path');
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/trails', trailRoutes);

// Routes
app.use('/api/auth', require('./router/auth'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

// Handle undefined routes
app.all('', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
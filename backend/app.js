const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors());

// Or configure specific CORS settings
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only this origin to access the backend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
// Middleware to parse JSON
app.use(express.json());

// Connect to the MongoDB database
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

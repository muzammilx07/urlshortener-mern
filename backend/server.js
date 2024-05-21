const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

app.use(cors({
  origin: ["https://urlshortener-dpwx.onrender.com", "http://localhost:3000"],
  methods: ["GET", "POST"]
}));

app.use(express.json());
app.use('/', require('./routes/urlRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

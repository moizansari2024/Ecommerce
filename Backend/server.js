const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./confige/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(helmet());

// Connect Database
console.log("Starting server...");
connectDB();
console.log("Database connection initiated...");

app.use(cors({
  origin: "http://localhost:5173", // Exact frontend URL
  credentials: true,               // Yeh bahut zaruri hai
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((req, res, next) => {
    console.log(`[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running!"
    });
});


app.use('/api/v1/auth', authRoutes);
console.log("[SYSTEM] Auth Routes Mounted at /api/v1/auth");
app.use('/api/v1/products', productRoutes);
console.log("[SYSTEM] Product Routes Mounted at /api/v1/products");


app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.stack}`); // Error detail terminal mein print hoga
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Production Server rolling on port ${PORT}`));
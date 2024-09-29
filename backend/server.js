const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Queries = require("./Schema");
const axios = require('axios');
const dotenv = require('dotenv')
const app = express();
dotenv.config()


// Connection URIs for MongoDB
const mongoUrlLocal = "mongodb://admin:password@localhost:27017"; // Local MongoDB connection
const mongoUrlDocker = "mongodb://admin:password@mongodb"; // Docker MongoDB connection
const mongo = process.env.MONGODB_URI;

// Use local MongoDB connection for development
const mongoUrl = mongoUrlLocal;

const port = 3000;

// MongoDB connection
mongoose.connect(mongoUrlDocker, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from the frontend directory

// Serve main HTML file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'resume.html')); // Serve resume.html
});

// Handle contact form submission
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body; // Destructure request body
        const query = new Queries({ name, email, message }); // Create a new document
        await query.save(); // Save data to MongoDB
        res.json({ message: "Message sent successfully!" }); // Send success response
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Error sending message!" }); // Send error response
    }
});

// Fetch LeetCode data
app.get("/leetcode/:username", async (req, res) => {
    const username = req.params.username;
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        res.json({
            totalSolved: data.totalSolved,
            totalQuestions: data.totalQuestions,
            acceptanceRate: data.acceptanceRate,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
        });
    } catch (error) {
        console.error('Error fetching LeetCode data:', error);
        res.status(500).json({ error: 'Failed to fetch LeetCode data' });
    }
});

// Serve LeetCode HTML file
app.get("/leetcode", (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'leetcode.html')); // Serve leetcode.html
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log server start
});

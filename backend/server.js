require("dotenv").config();
const express = require("express");
const cors = require("cors")
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes.js")

const app = express();

// note: middleware to handle cors
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectDB();


// info: middleware
app.use(express.json());

// info: Routes
app.use("/api/auth", authRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('api/questions', questionRoutes);

// app.use("/api/ai/generate-questions", ProcessingInstruction, generateInterviewQuestions);
// app.use("/api/ai/generate-explanation", ProcessingInstruction, generateConceptExplanation);



// info: server uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// info: start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
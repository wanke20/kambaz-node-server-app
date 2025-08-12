import express from 'express'
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import "dotenv/config";
import session from "express-session";

// const allowedOrigins = [
//     "http://localhost:5173",
//     process.env.NETLIFY_URL,
// ];

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect("mongodb+srv://giuseppi:supersecretpassword@cluster0.onivald.mongodb.net/kambaz?retryWrites=true&w=majority&appName=Cluster0");
const app = express()
app.use(cors({
    origin: process.env.NETLIFY_URL,  // added this line
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        secure : process.env.NODE_ENV !== "development", // added this line
        // domain: process.env.NODE_SERVER_DOMAIN,
    };
}
// app.options('*', cors());
app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app)
Hello(app)
app.listen(process.env.PORT || 4000)
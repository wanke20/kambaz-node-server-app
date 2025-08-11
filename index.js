import express from 'express';
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import "dotenv/config";
import session from "express-session";

const CONNECTION_STRING =
    process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.NETLIFY_URL,
];

app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // allow non-browser requests

            const hostname = new URL(origin).hostname;

            if (
                allowedOrigins.includes(origin) ||
                hostname.endsWith(".netlify.app")
            ) {
                return callback(null, true);
            }

            console.warn(`CORS blocked: ${origin}`);
            return callback(new Error(`CORS: Not allowed for origin ${origin}`));
        },
    })
);

app.options("*", cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const hostname = new URL(origin).hostname;
        if (
            allowedOrigins.includes(origin) ||
            hostname.endsWith(".netlify.app")
        ) {
            return callback(null, true);
        }
        return callback(null, false);
    }
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
    };
}

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);

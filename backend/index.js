import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import colors from "colors";
import prisma from "./database/database.connect.js";

dotenv.config();

const app = express();

const CorsOption = {
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
};
app.use(cors(CorsOption));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Passport JS Authentication

// This is what i expect from a user 
// name: string;
// email: string;
// oauth_id: string;
// provider: string;
// image: string;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // For security reasons, cookies should not be accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Set to true if using https in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        passReqToCallback: true, // Passes req to the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            const body = {
                name: profile.displayName,
                email: profile.emails[0].value,
                oauth_id: profile.id,
                provider: profile.provider,
                image: profile.photos[0].value,
            };

            let findUser = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            });

            if (!findUser) {
                findUser = await prisma.user.create({
                    data: body,
                });
            }
            return done(null, profile);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

app.get("/auth/google/callback",passport.authenticate("google", { failureRedirect: "/" }),(req, res) => {
        res.redirect(`${process.env.CLIENT_URL}`);
    }
);

app.get("/", (req, res) => {
    if (req.user) {
        res.json({
            isAuthenticated: true,
            user: req.user,
        });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.json({ message: "Logout successfully" });
    });
});

// Passport JS Authentication

// Routes



// Routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    console.log(`http://localhost:${PORT}`.blue.bold);
});
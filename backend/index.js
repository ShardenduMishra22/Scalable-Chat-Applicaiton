// Backend (Express.js)
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import colors from "colors";

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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    console.log(`http://localhost:${PORT}`.blue.bold);
});
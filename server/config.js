export const allowedOrigins = [
  "https://mindflux-hw3c.onrender.com",
  "https://mindflux.dev",
  "https://www.mindflux.dev",
  "http://localhost:5173",
  "https://mindflux-2jx0.onrender.com",
];

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

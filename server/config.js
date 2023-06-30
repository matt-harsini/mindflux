export const allowedOrigins = [
  "https://mindflux-hw3c.onrender.com",
  "https://mindflux.dev",
  "https://www.mindflux.dev",
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

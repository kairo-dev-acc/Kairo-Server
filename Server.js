// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

// *Kairo Server Entry Point
import express from "express";
import "dotenv/config";
import oAuthRouter from "./Routes/oauth.route.js";
import authRouter from "./Routes/auth.route.js";
import connectDB from "./Database/mongodb.js";

// *Create Express app
const app = express();

app.use(express.json());

// *Load environment variables
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const API = process.env.API;

// *API Router
app.use(`${API}/oAuth`, oAuthRouter);
app.use(`${API}/auth`, authRouter);

// *Start the server
app.listen(PORT, async () => {
  console.log(`Kairo🍃 Server is running on port ${HOST}${PORT}`);
  await connectDB();
});

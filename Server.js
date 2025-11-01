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

// *Create Express app
const app = express();

// *Load environment variables
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// *Start the server
app.listen(PORT, async () => {
  console.log(`Kairo🍃 Server is running on port ${HOST}${PORT}`);
});

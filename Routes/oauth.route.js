// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

// *External Imports
import { Router } from "express";

// *OAuth Router
const oAuthRouter = Router();

// *IOS OAuth Endpoints
oAuthRouter.get("/ios", (req, res) => {
  res.send({ message: "ios endpoint" });
  // Handle user oAuthRouter iOS signup
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/ios
});
oAuthRouter.post("/ios/login", (req, res) => {
  res.send({ message: "ios endpoint 2" });
  // Handle user oAuthRouter iOS login
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/ios/login
});

// *google OAuth Endpoints
oAuthRouter.post("/google", (req, res) => {
  res.send({ message: "google endpoint" });
  // Handle user oAuthRouter Google signup
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/google
});
oAuthRouter.post("/google/login", (req, res) => {
  res.send({ message: "google endpoint 2" });
  // Handle user oAuthRouter Google login
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/google/login
});

// *Facebook OAuth Endpoints
oAuthRouter.get("/facebook/", (req, res) => {
  res.send({ message: "facebook endpoint" });
  // Handle user oAuthRouter Facebook signup
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/facebook
});
oAuthRouter.get("/facebook/login", (req, res) => {
  res.send({ message: "facebook endpoint 2" });
  // Handle user oAuthRouter Facebook login
  //! path: http://localhost:5000/api/SV/pro/host/kairo/oauth/facebook/login
});

export default oAuthRouter;

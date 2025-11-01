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
oAuthRouter.post("/ios", (req, res) => {
  res.send({ message: "ios endpoint" });
  // Handle user oAuthRouter iOS signup
  //! path: /api/kairo/SV/oAuthRouter/ios
});
oAuthRouter.post("/ios/login", (req, res) => {
  res.send({ message: "ios endpoint 2" });
  // Handle user oAuthRouter iOS login
  //! path: /api/kairo/SV/oAuthRouter/ios
});

// *google OAuth Endpoints
oAuthRouter.post("/google", (req, res) => {
  res.send({ message: "google endpoint" });
  // Handle user oAuthRouter Google signup
  //! path: /api/kairo/SV/oAuthRouter/google
});
oAuthRouter.post("/google/login", (req, res) => {
  res.send({ message: "google endpoint 2" });
  // Handle user oAuthRouter Google login
  //! path: /api/kairo/SV/oAuthRouter/google
});

// *Facebook OAuth Endpoints
oAuthRouter.post("/facebook/", (req, res) => {
  res.send({ message: "facebook endpoint" });
  // Handle user oAuthRouter Facebook signup
  //! path: /api/kairo/SV/oAuthRouter/facebook
});
oAuthRouter.post("/facebook/login", (req, res) => {
  res.send({ message: "facebook endpoint 2" });
  // Handle user oAuthRouter Facebook login
  //! path: /api/kairo/SV/oAuthRouter/facebook
});

export default oAuthRouter;

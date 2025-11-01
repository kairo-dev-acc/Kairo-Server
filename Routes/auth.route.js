// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

// *External Imports
import { Router } from "express";

import LoginController from "../Controllers/auth/login.controller.js";
import LogoutController from "../Controllers/auth/logout.controller.js";
import registerController from "../Controllers/auth/register.controller.js";

// *Auth Router
const authRouter = Router();

// *login endpoint
authRouter.get("/login", LoginController); 
// Handle user login
//! path: http://localhost:5000/api/SV/kairo/auth/login


// *logout endpoint
authRouter.post("/logout",LogoutController); 
// Handle user logout
// //! path: http://localhost:5000/api/SV/kairo/auth/logout


// *register endpoint
authRouter.post("/register", registerController); 
// Handle user registration
//! path: http://localhost:5000/api/SV/kairo/auth/register


export default authRouter;


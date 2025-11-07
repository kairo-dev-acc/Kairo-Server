// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

// *External Imports
import { Router } from "express";

import Login from "../Controllers/auth/login.controller.js";
import Logout from "../Controllers/auth/logout.controller.js";
import {
  registerPhone,
  PhoneVerified,
  registerEmail,
  EmailVerified,
  register,
} from "../Controllers/auth/register.controller.js";

// *Auth Router
const authRouter = Router();

// *login endpoint
authRouter.get("/login", Login);
// Handle user login
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/login
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/login

// *logout endpoint
authRouter.post("/logout", Logout);
// Handle user logout
// //! path: http://localhost:5000/api/SV/pro/host/kairo/auth/logout
// //! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/logout

// *register endpoint
authRouter.post("/registerPhone", registerPhone);
// Handle user PhoneNumber registration
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/registerPhone
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/registerPhone

authRouter.put("/PhoneVerified", PhoneVerified);
// Handle user PhoneNumber Verified
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/PhoneidVerified
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/PhoneidVerified

authRouter.put("/registerEmail", registerEmail);
// Handle user Email registration
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/registerEmail
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/registerEmail

authRouter.put("/EmailVerified", EmailVerified);
// Handle user Email Verified
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/EmailVerified
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/EmailVerified

authRouter.put("/register", register);
// Handle user registration
//! path: http://localhost:5000/api/SV/pro/host/kairo/auth/register
//! path: https://kairo-server.onrender.com/api/SV/pro/host/kairo/auth/register

export default authRouter;

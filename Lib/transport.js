// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------
import "dotenv/config";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});


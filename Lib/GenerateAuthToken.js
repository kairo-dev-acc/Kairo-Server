// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------
//* import node_modulel
import jwt from "jsonwebtoken";
import "dotenv/config";

//* import env
const JWT_pass = process.env.JWT_pass;
const JWT_EX = process.env.JWT_EX;

const GenerateAuthToken = (userId) => {
  return jwt.sign({ userId }, JWT_pass, { expiresIn: JWT_EX });
};

export default GenerateAuthToken;

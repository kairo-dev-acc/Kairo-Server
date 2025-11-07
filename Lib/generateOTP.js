// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------


import crypto from 'crypto';

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export default generateOTP;


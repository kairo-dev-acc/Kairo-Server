// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

import crypto from "crypto";

const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

export default hashOTP;
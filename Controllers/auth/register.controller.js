// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

import User from "../../Models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import GenerateAuthToken from "../../Lib/GenerateAuthToken.js";

const registerController = async (req, res) => {
  // *Start mongoose session for transaction
  const Session = await mongoose.startSession();
  Session.startTransaction();

  try {
    // *Destructure user details from request body
    const { firstName, middleName, lastName, email, phoneNumber } = req.body;

    // *Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
      await Session.abortTransaction();
      Session.endSession();
      return res.status(400).send({
        message: "All required fields must be filled",
        success: false,
      });
    }

    // *Check if user already exists
    const existingUser = await User.findOne({ email });

    // *Check if user already exists
    if (existingUser) {
      await Session.abortTransaction();
      Session.endSession();
      return res
        .status(400)
        .send({ message: "User already exists", success: false });
    }

    // *Check if phone number is already in use
    const existingPhone = await User.findOne({ phoneNumber });

    // *If phone number exists, abort transaction and return error
    if (existingPhone) {
      await Session.abortTransaction();
      Session.endSession();
      return res
        .status(400)
        .send({ message: "Phone number already in use", success: false });
    }

    // *Hash phone number
    const salt = await bcrypt.genSalt(10);
    const hashedPhoneNumber = await bcrypt.hash(phoneNumber.toString(), salt);

    // *Create new user if middleName is provided

    const avatarSeed = middleName
      ? `${firstName}${middleName}${lastName}`
      : `${firstName}${lastName}`;

    const profileAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${avatarSeed}`;

    const newUser = new User({
      firstName,
      middleName: middleName || null,
      lastName,
      email,
      profilePicture: profileAvatar,
      phoneNumber: hashedPhoneNumber,
      overAllRating: 0,
      level: 1,
      vetted: false,
      idVerified: false,
      numberVerified: true,
      paymentVerified: false,
      addressVerified: false,
    });

    //   *generate auth token
    const token = await GenerateAuthToken(newUser._id);

    //   *Save new user and commit transaction
    await newUser.save({ session: Session });
    await Session.commitTransaction();
    Session.endSession();
    res.status(201).send({
      message: "User registered successfully",
      user: newUser,
      success: true,
      token: token,
    });

    console.log(`😘 successful registration of user: ${email}`);
  } catch (error) {
    // *Abort transaction on error
    await Session.abortTransaction();
    Session.endSession();
    console.error("Registration error:", error);
    res
      .status(500)
      .send({ message: "Server error during registration", success: false });
    console.error(`😒 Registration error: ${error}`);
  }
};

export default registerController;

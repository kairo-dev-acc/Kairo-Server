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
// import GenerateAuthToken from "../../Lib/generateAuthToken.js";

const registerController = async (req, res) => {
  // *Start mongoose session for transaction
  const Session = mongoose.startSession();
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

    // *Create new user if middleName is not provided
    if (!middleName) {
      // *Create profile avatar using Dicebear API
      const profileAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${lastName}`;

      //   *Create new user
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        email,
        profilePicture: profileAvatar,
        phoneNumber: hashedPhoneNumber,
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
      });
    }

    // *Create new user if middleName is provided
    if (middleName) {
      const profileAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName}${middleName}${lastName}`;

      //   *Create new user
      const newUser = new User({
        firstName,
        middleName,
        lastName,
        email,
        profilePicture: profileAvatar,
        phoneNumber: hashedPhoneNumber,
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
      });
    }
  } catch (error) {}
};

export default registerController;

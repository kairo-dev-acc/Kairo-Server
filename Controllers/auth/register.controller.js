// -----------------------------------------------------------------------------
// Copyright (c) 2025 Kairo. All rights reserved.
//
// This file is part of a proprietary project owned by Kairo.
// Unauthorized copying, modification, distribution, or use of this file,
// in whole or in part, is strictly prohibited without written permission.
// -----------------------------------------------------------------------------

import "dotenv/config";
import {transport} from "../../Lib/transport.js";
import User from "../../Models/user.model.js";
import mongoose from "mongoose";
import GenerateAuthToken from "../../Lib/GenerateAuthToken.js";
import generateOTP from "../../Lib/generateOTP.js";
import hashOTP from "../../Lib/hashOTP.js";
import twilio from 'twilio';
import "dotenv/config";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;


const twilioAccountSid = process.env.twilio_Account_SID;
const twilioAuthToken = process.env.twilio_Auth_Token;
const messagingServiceSid = process.env.messagingServiceSid;

const accountSid = twilioAccountSid;
const authToken = twilioAuthToken;
// 
const client = require('twilio')(accountSid, authToken);
// -----------------------------------------------------------------------------
// REGISTER PHONE
// -----------------------------------------------------------------------------
export const registerPhone = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber)
      return res.status(400).json({ message: "Phone number is required" });

    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const otpExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    // Create new user with phone number and OTP
    const newUser = new User({
      phoneNumber,
      numberVerified: false,
      emailVerified: false,
      phoneOTP: hashedOtp,
      phoneOTPExpire: otpExpire,
      level: 1,
      overAllRating: 0,
      vetted: false,
      idVerified: false,
      paymentVerified: false,
      addressVerified: false,
    });

    // Send OTP via Twilio
  await client.messages
  .create({
      body: `Your Kairo OTP is: ${otp}`,
      messagingServiceSid: messagingServiceSid,
      to: phoneNumber
  })
  .then(message => console.log(message.sid));

    await newUser.save({ session });
    await session.commitTransaction();
    session.endSession();


    console.log(`✅ OTP (for debugging): ${otp}`);
    res.status(200).json({ message: "User created. OTP sent!",phono: phoneNumber });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// -----------------------------------------------------------------------------
// VERIFY PHONE
// -----------------------------------------------------------------------------
export const PhoneVerified = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp)
      return res.status(400).json({ message: "Phone number and OTP required" });

    const user = await User.findOne({ phoneNumber });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.numberVerified)
      return res.status(400).json({ message: "User already verified" });

    const hashedOtp = hashOTP(otp);

    if (hashedOtp !== user.phoneOTP)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.phoneOTPExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.numberVerified = true;
    user.phoneOTP = undefined;
    user.phoneOTPExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Phone number verified successfully" });
    console.log("✅ User verified:", user.phoneNumber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during verification" });
  }
};

// -----------------------------------------------------------------------------
// REGISTER EMAIL
// -----------------------------------------------------------------------------
export const registerEmail = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;

    if (!phoneNumber || !email)
      return res.status(400).json({ message: "Phone number and email required" });

    const user = await User.findOne({ phoneNumber });

    if (!user)
      return res.status(404).json({ message: "User phone number not found" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already in use" });

    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const otpExpire = Date.now() + 10 * 60 * 1000;

    user.email = email;
    user.emailOTP = hashedOtp;
    user.emailOtpExpire = otpExpire;
    await user.save();

    // Send email OTP
    await transport.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: "Verify your email",
      text: `Your OTP is: ${otp}`,
    });

    console.log(`✅ OTP email sent to ${email}`);
    res.status(200).json({ message: "OTP sent to email", email: email });
  } catch (error) {
    console.error("Email registration error:", error);
    res.status(500).json({ message: "Server error during email registration" });
  }
};

// -----------------------------------------------------------------------------
// VERIFY EMAIL
// -----------------------------------------------------------------------------
export const EmailVerified = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.emailVerified)
      return res.status(400).json({ message: "User already verified" });

    const hashedOtp = hashOTP(otp);

    if (hashedOtp !== user.emailOTP)
      return res.status(400).json({ message: "Invalid OTP" });

    if (user.emailOtpExpire < Date.now())
      return res.status(400).json({ message: "OTP expired" });

    user.emailVerified = true;
    user.emailOTP = undefined;
    user.emailOtpExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
    console.log("✅ User verified:", user.email);
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Server error during verification" });
  }
};

// -----------------------------------------------------------------------------
// COMPLETE REGISTRATION
// -----------------------------------------------------------------------------
export const register = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, phoneNumber } = req.body;

    if (!firstName || !lastName || !phoneNumber)
      return res.status(400).json({
        message: "First name, last name, and phone number are required",
      });

    const user = await User.findOne({ phoneNumber });

    if (!user)
      return res.status(404).json({ message: "User not found. Verify phone first." });

    if (!user.numberVerified)
      return res.status(400).json({ message: "Phone number not verified" });

    // Create avatar
    const avatarSeed = middleName
      ? `${firstName}${middleName}${lastName}`
      : `${firstName}${lastName}`;

    const profileAvatar = `https://api.dicebear.com/9.x/initials/svg?seed=${avatarSeed}`;

    user.firstName = firstName;
    user.middleName = middleName || null;
    user.lastName = lastName;
    user.profilePicture = profileAvatar;

    await user.save();

    const token = await GenerateAuthToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
      token,
    });

    console.log(`🎉 Successful registration of user: ${email || phoneNumber}`);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { calculateAge } from "../utils/calculateAge";
import { sendEmail } from "../utils/sendEmail";
import User from "../model/userModel";
import { OtpData } from "../interfaces";
import {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
const router = express.Router();

const otpStore = new Map<string, OtpData>();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
setInterval(() => {
  const date = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (data.otpExpiry < date) {
      otpStore.delete(email);
      console.log(`OTP for ${email} expired and removed.`);
    }
  }
}, 60 * 1000);

router.post(
  "/registerUser",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password, gender, dateofbirth, country } =
        req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) res.status(400).json({ msg: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const otp = generateOTP();
      const otpExpiry = Date.now() + 10 * 60 * 1000;
      const age = calculateAge(dateofbirth);
      otpStore.set(email, {
        username,
        email,
        hashedPassword,
        gender,
        dateofbirth,
        age,
        country,
        otp,
        otpExpiry,
        attemptsLeft: 3,
      });

      const datas = otpStore.get(email);
      console.log(datas?.otp);
      await sendEmail(
        email,
        `Your OTP for ${process.env.PROJECT_NAME}`,
        `
      Hello,
      
      Thank you for registering on ${process.env.PROJECT_NAME}!
      
      Please use the following OTP to verify your email:
      
      🔐 OTP: ${otp}
      
      This OTP is valid for 10 minutes.
      
      If you did not request this, please ignore this email.
      
      – The ${process.env.PROJECT_NAME} Team
        `
      );

      res.json({ msg: "OTP sent to your email" });
    } catch (err) {
      console.error(err);
      res.status(500).send(`${err}`);
    }
  }
);
router.post(
  "/verify-otp",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp } = req.body;

      const otpData = otpStore.get(email);
      if (!otpData)
        return void res.status(400).json({ msg: "No user found for this OTP" });

      if (otpData.otpExpiry < Date.now()) {
        otpStore.delete(email);
        return void res
          .status(400)
          .json({ msg: "OTP expired. Please register again." });
      }

      if (otpData.otp !== otp) {
        otpData.attemptsLeft -= 1;
        if (otpData.attemptsLeft <= 0) {
          otpStore.delete(email);
          return void res
            .status(400)
            .json({ msg: "Too many wrong attempts. OTP expired." });
        }
        return void res.status(400).json({
          msg: `Invalid OTP. You have ${otpData.otp} attempt(s) left.`,
        });
      }

      const user = new User({
        username: otpData.username,
        email,
        password: otpData.hashedPassword,
        dateofbirth: otpData.dateofbirth,
        age: otpData.age,
        country: otpData.country,
        isVerified: true,
        gender: otpData.gender,
      });

      await user.save();

      const accessToken = generateAccessToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());
      refreshTokens.push(refreshToken); // Optional

      otpStore.delete(email);

      return void res.status(201).json({
        msg: "Email verified and user created successfully!",
        user: {
          _id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      });
    } catch (err) {
      console.error(err);
      return void res.status(500).send("Server error");
    }
  }
);
router.post("/resend-otp", async (req, res): Promise<void> => {
  try {
    const { email } = req.body;

    const otpData = otpStore.get(email);
    if (!otpData) {
      return void res
        .status(400)
        .json({ msg: "No OTP request found. Please register first." });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    otpData.otp = otp;
    otpData.otpExpiry = otpExpiry;
    otpData.attemptsLeft = 3;

    await sendEmail(
      email,
      `Your new OTP for ${process.env.APP_NAME}`,
      `Hello,

Here is your new OTP for ${process.env.APP_NAME}:

OTP: ${otp}

This OTP is valid for 10 minutes.

- The ${process.env.APP_NAME} Team`
    );

    res.json({ msg: "New OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return void res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return void res.status(401).json({ msg: "Invalid password" });

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    res.status(200).json({
      msg: "Login successful",
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return void res.status(500).json({ msg: "Server error" });
  }
});
router.post("/resend-otp", async (req, res): Promise<void> => {
  try {
    const { email } = req.body;

    const otpData = otpStore.get(email);
    if (!otpData) {
      return void res
        .status(400)
        .json({ msg: "No OTP request found. Please register first." });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    otpData.otp = otp;
    otpData.otpExpiry = otpExpiry;
    otpData.attemptsLeft = 3;

    await sendEmail(
      email,
      `Your new OTP for ${process.env.APP_NAME}`,
      `Hello,

Here is your new OTP for ${process.env.APP_NAME}:

OTP: ${otp}

This OTP is valid for 10 minutes.

- The ${process.env.APP_NAME} Team`
    );

    res.json({ msg: "New OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
router.post(
  "/refresh-token",
  async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return void res.status(403).json({ message: "Refresh token invalid" });
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const newAccessToken = generateAccessToken((payload as any).id);
      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
);

router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) refreshTokens.splice(index, 1); // ✅ Remove it

  res.json({ message: "Logged out successfully" });
});

export default router;

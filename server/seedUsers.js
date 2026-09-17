import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

const MONGO_URI = process.env.MONGO_URI;

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    // =========================
    // STAFF
    // =========================

    const staffPassword = await bcrypt.hash("Staff@123", 10);

    const staff = await User.findOneAndUpdate(
      { email: "staff@helpdesk.com" },
      {
        name: "Library Staff",
        email: "staff@helpdesk.com",
        password: staffPassword,
        role: "staff",
        department: "Library",
        phone: ""
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    console.log("Staff account ready:");
    console.log("Email:", staff.email);
    console.log("Role:", staff.role);
    console.log("Department:", staff.department);
    console.log("Password hash exists:", !!staff.password);

    // =========================
    // ADMIN
    // =========================

    const adminPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.findOneAndUpdate(
      { email: "admin@helpdesk.com" },
      {
        name: "System Administrator",
        email: "admin@helpdesk.com",
        password: adminPassword,
        role: "admin",
        department: "Administration",
        phone: ""
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    );

    console.log("");
    console.log("Admin account ready:");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Department:", admin.department);
    console.log("Password hash exists:", !!admin.password);

    console.log("");
    console.log("================================");
    console.log("SEED COMPLETED");
    console.log("================================");
    console.log("Staff:");
    console.log("Email: staff@helpdesk.com");
    console.log("Password: Staff@123");
    console.log("");
    console.log("Admin:");
    console.log("Email: admin@helpdesk.com");
    console.log("Password: Admin@123");
    console.log("================================");

  } catch (error) {
    console.error("Seed error:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedUsers();
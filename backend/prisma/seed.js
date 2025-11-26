import prisma from "../src/db.js";
import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("admin123", 10);
await prisma.user.upsert({
  where: { email: "admin@bookstore.com" },
  update: {},
  create: {
    name: "Admin",
    email: "admin@bookstore.com",
    password: hash,
    role: "admin",
  },
});
console.log("Admin created → admin@bookstore.com / admin123");
await prisma.$disconnect();

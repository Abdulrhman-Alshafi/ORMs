import prisma from "prisma";
import bcrypt from "bcryptjs";

const main = async () => {
  const hash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@bookstoore.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@bookstore.com",
      password: hash,
      role: "admin",
    },
  });
  console.log("Admin ready → admin@bookstore.com / admin123");
};

main().finally(() => prisma.$disconnect());

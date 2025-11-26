import prisma from "../db.js";

//get books function
export const getAllBooks = async (req, res) => {
  const { page = 1, search, genre } = req.query;
  const take = 12;
  const skip = (page - 1) * take;

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { author: { name: { contains: search, mode: "insensitive" } } },
      ],
    }),
    ...(genre && {
      genres: { some: { name: { contains: genre, mode: "insensitive" } } },
    }),
  };
  const [books, total] = await Promise.all([
    prisma.book.findMany({
      where,
      include: { author: true, genres: true },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    }),
    prisma.book.count({ where }),
  ]);
  res.json({
    books,
    pagination: {
      page: Number(page),
      pages: Math.ceil(total / take),
      total,
    },
  });
};

//create book function
export const createBook = async (req, res) => {
  const book = await prisma.book.create({
    data: req.body,
    include: { author: true, genres: true },
  });
  res.status(201).json(book);
};
//update book function
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = await prisma.book.update({
    where: { id: Number(id) },
    data: req.body,
    include: { author: true, genres: true },
  });
  res.json(book);
};

//delete book function
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await prisma.book.delete({ where: { id: Number(id) } });
  res.status(204).send();
};

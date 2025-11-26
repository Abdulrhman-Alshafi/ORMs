import jwt from "jsonwebtoken";

//protect auth
export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer")) {
    return res.status(401).json({ error: "No token" });
  }

  const token = bearer.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

//admin auth
export const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
};

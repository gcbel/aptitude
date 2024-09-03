/* DEPENDENCIES */
const jwt = require("jsonwebtoken");

/* AUTH MIDDLEWARE */
const authMiddleware = ({ req }) => {
  const token =
    req.body?.token || req.query?.token || req.headers?.authorization || "";

  if (token.startsWith("Bearer ")) {
    try {
      const decoded = jwt.verify(token.slice(7), process.env.JWT_SECRET, {
        maxAge: "6h",
      });
      req.user = decoded;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  return req;
};

/* EXPORTS */
module.exports = { authMiddleware };

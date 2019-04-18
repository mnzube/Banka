import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = {
  checkAuth: (req, res, next) => {
    const token = req.headers.authorization;
    if (token === "" || !token) {
      return res.status(401).json({ error: "token error." });
    }
    const splitting = token.split(" ");
    jwt.verify(splitting[1], process.env.secret, (error, decode) => {
      if (error) {
        return res.status(401).json({ status: 401, error: "Your are not logged in." });
      }
      if (decode) {
        req.user = {
          id: decode.id,
          type: decode.type
        };
        next();
      } else {
        return res.status(401).json({ error: "Your are not logged in." });
      }
    });
  }
};

export default auth;

import jwt from "jsonwebtoken";
import { MessageFail } from "../messages/messageSuccess.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) {
    return res.status(200).send(MessageFail("No autorizado"));
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(200).send(MessageFail("No autorizado"));
    req.user = user;
    next();
  });
}

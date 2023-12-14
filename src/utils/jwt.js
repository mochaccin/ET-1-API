import jsonwebtoken from "jsonwebtoken";
import { SECRET } from "../configs/environment.js";

export function generateToken(user) {
  const { _id, email } = user;
  return jsonwebtoken.sign({ id: _id, email }, SECRET, {
    expiresIn: "15m",
  });
}

export function verifyToken(token) {
  return jsonwebtoken.verify(token, SECRET);
}

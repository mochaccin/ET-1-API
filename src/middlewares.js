import userModel from "./models/user.model.js";
import { verifyToken } from "./utils/jwt.js";

export function authRequired(req, res, next) {
  const authorizationHeader =
    req.headers.authorization || req.headers.Authorization;

  try {
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      throw new Error("Token not found.");
    }

    const { id } = verifyToken(token);

    req.id = id;

    return next();
  } catch (error) {
    return res.status(403).send({
      error:
        "You don't have permission, the token has expired or you don't have one",
    });
  }
}

export function isTeacher() {
  return async function (req, res, next) {
    const { role } = await userModel.findById(req.id).exec();
    if (role === "teacher") {
      return next();
    }

    return res.status(401).send({ error: `User is not a teacher` });
  };
}

export function isStudent() {
  return async function (req, res, next) {
    const { role } = await userModel.findById(req.id).exec();
    if (role === "student") {
      return next();
    }

    return res.status(401).send({ error: `User is not a student` });
  };
}

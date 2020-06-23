import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const secret = "hohana";

export const sign = (payload) =>
  jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token) => jwt.verify(token, secret);

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [, token] = req.headers.authorization.split(" ");
  try {
    const payload = await verify(token);
    const user = await User.findById(payload.user);

    if (!user) {
      return res.json({ error: "Usuario não existe" });
    }

    next();
  } catch (err) {
    return res.send(err);
  }
};

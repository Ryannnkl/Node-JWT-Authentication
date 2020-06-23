import { Request, Response } from "express";
import * as jwt from "../utils/jwt";

import User from "../models/User";

export default {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email, password });

    if (user) {
      return res.status(400).json({ error: "Usuario ja existente" });
    }

    user = await User.create({ name, email, password });

    user.password = undefined;

    const token = jwt.sign({ user: user.id });

    return res.json({ user, token });
  },

  async show(req: Request, res: Response) {
    const [, hash] = req.headers.authorization.split(" ");

    const [email, password] = Buffer.from(hash, "base64").toString().split(":");

    console.log(email, ":", password);

    try {
      const user = await User.findOne({ email, password });

      const token = jwt.sign({ user: user.id });

      if (!user) {
        return res.status(401).json({ error: "user do not exist" });
      }

      return res.json({ user, token });
    } catch (err) {
      return res.status(500).json({ erro: err });
    }
  },
  async index(req: Request, res: Response) {
    try {
      const users = await User.find();

      return res.json(users);
    } catch (err) {
      return res.send(err);
    }
  },
};

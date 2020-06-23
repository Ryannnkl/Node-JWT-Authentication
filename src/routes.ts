import { Router } from "express";
import { authMiddleware } from "./utils/jwt";

import SessionController from "./controllers/SessionController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ ok: "certo" });
});

routes.post("/signup", SessionController.store);
routes.get("/login", SessionController.show);

routes.get(
  "/authenticated/list-users",
  authMiddleware,
  SessionController.index
);

export default routes;

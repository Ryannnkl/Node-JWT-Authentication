import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ ok: "certo" });
});

export default routes;

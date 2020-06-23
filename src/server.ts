import express from "express";
import { connect } from "mongoose";

import routes from "./routes";

const app = express();

connect(
  "mongodb+srv://ryannqwe:19735@ryanncluster-jntrn.mongodb.net/jwt?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.json());

app.use(routes);

app.listen(4001);

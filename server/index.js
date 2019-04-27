import express from "express";
import swaggerUi from "swagger-ui-express";
import users from "./routes/users";
import accounts from "./routes/accounts";
import transactions from "./routes/transactions";
import swaggerDocument from "../swagger.json";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Banka");
});
app.use("/api/v1", users);
app.use("/api/v1", accounts);
app.use("/api/v1/transaction", transactions);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;

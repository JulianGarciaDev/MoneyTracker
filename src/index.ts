import express from "express";

import swaggerUi from "swagger-ui-express";
import { swaggerSpecification } from "./Shared/Infrastructure/Swagger";

import { router as categories } from "./Categories/Infrastructure/CategoryRouter";
import { router as account } from "./Accounts/Infrastructure/AccountRouter";
import { router as currencies } from "./Currencies/Infrastructure/CurrencyRouter";

const port = 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to your personal balance!");
});

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpecification));
app.use("/category", categories);
app.use("/account", account);
app.use("/currency", currencies);

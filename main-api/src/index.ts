import express from "express";
import { graphqlHTTP } from "express-graphql";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import schema from "./schemas/schema";
import root from "./resolvers/resolvers";
// Load environment variables from .env file
dotenv.config();

const app = express();

// Endpoint to send the HTML file
app.get("/", (req, res) => {
  const htmlFilePath = path.join(__dirname, "index.html");
  fs.readFile(htmlFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading HTML file");
      return;
    }
    res.send(data);
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
  console.log(`HTML file is served at http://localhost:${PORT}/`);
});
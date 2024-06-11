import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import projectRoutes from "./routes/projectManagementRoutes";
import taskManagementRoutes from "./routes/taskManagementRoutes";

dotenv.config({ debug: true });
console.log(process.env.PORT);

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/notification", notificationRoutes);
app.use("/task", taskManagementRoutes);

// Endpoint to send the HTML file
app.get('/', (req, res) => {
  const htmlFilePath = path.join(__dirname, '..', 'src', 'index.html');
  fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading HTML file');
      return;
    }
    res.send(data);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}/`);
});


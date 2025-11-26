import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import departmentRouter from "./routes/department";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use("/api/departments", departmentRouter);

app.listen(PORT, () => {
  console.log(`Department service running on port ${PORT}`);
});


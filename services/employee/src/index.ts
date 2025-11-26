import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRouter from "./routes/employee";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRouter);

app.listen(PORT, () => {
  console.log(`Employee service running on port ${PORT}`);
});

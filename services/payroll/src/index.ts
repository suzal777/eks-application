import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import payrollRouter from "./routes/payroll";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());
app.use("/api/payrolls", payrollRouter);

app.listen(PORT, () => {
  console.log(`Payroll service running on port ${PORT}`);
});

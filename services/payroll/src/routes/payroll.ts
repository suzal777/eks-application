import { Router } from "express";
import { pool } from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = Router();

// Get all payrolls
router.get("/", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM payrolls");
  res.json(rows);
});

// Get single payroll
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM payrolls WHERE id = ?",
    [req.params.id]
  );
  res.json(rows[0]);
});

// Create payroll
router.post("/", async (req, res) => {
  const { employeeId, salary, month } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO payrolls (employeeId, salary, month) VALUES (?, ?, ?)",
    [employeeId, salary, month]
  );
  res.json({ id: result.insertId, employeeId, salary, month });
});

// Update payroll
router.put("/:id", async (req, res) => {
  const { employeeId, salary, month } = req.body;
  await pool.query(
    "UPDATE payrolls SET employeeId=?, salary=?, month=? WHERE id=?",
    [employeeId, salary, month, req.params.id]
  );
  res.json({ id: req.params.id, employeeId, salary, month });
});

// Delete payroll
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM payrolls WHERE id=?", [req.params.id]);
  res.json({ id: req.params.id });
});

export default router;

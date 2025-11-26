import { Router } from "express";
import { pool } from "../db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

const router = Router();

// Get all departments
router.get("/", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM departments");
  res.json(rows);
});

// Get single department
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM departments WHERE id = ?",
    [req.params.id]
  );
  res.json(rows[0]);
});

// Create department
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO departments (name, description) VALUES (?, ?)",
    [name, description]
  );
  res.json({ id: result.insertId, name, description });
});

// Update department
router.put("/:id", async (req, res) => {
  const { name, description } = req.body;
  await pool.query(
    "UPDATE departments SET name=?, description=? WHERE id=?",
    [name, description, req.params.id]
  );
  res.json({ id: req.params.id, name, description });
});

// Delete department
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM departments WHERE id=?", [req.params.id]);
  res.json({ id: req.params.id });
});

export default router;

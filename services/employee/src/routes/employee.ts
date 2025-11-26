import { Router } from "express";
import { pool } from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

const router = Router();

interface Employee {
  id: number;
  name: string;
  email: string;
}

// Get all employees
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query<Employee[] & RowDataPacket[]>(
      "SELECT * FROM employees"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get single employee
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query<Employee[] & RowDataPacket[]>(
      "SELECT * FROM employees WHERE id = ?",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create employee
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const [result] = await pool.query<OkPacket>(
      "INSERT INTO employees (name, email) VALUES (?, ?)",
      [name, email]
    );
    res.json({ id: result.insertId, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    await pool.query(
      "UPDATE employees SET name=?, email=? WHERE id=?",
      [name, email, req.params.id]
    );
    res.json({ id: req.params.id, name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM employees WHERE id=?", [req.params.id]);
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ✅ Dynamic GET all rows from any table
app.get("/api/:table", async (req, res) => {
  const { table } = req.params;
  const { data, error } = await supabase.from(table).select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// ✅ Dynamic POST insert into any table
app.post("/api/:table", async (req, res) => {
  const { table } = req.params;
  const newRecord = req.body;
  const { data, error } = await supabase.from(table).insert([newRecord]);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// (Optional) GET a single row by ID (if table has "id" or primary key)
app.get("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// (Optional) DELETE by ID
app.delete("/api/:table/:id", async (req, res) => {
  const { table, id } = req.params;
  const { data, error } = await supabase.from(table).delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

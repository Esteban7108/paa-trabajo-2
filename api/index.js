import express from "express";
import { pool } from "./conectionPostgres.js";

const app = express();
const router = express.Router();

app.use(express.json());
const PORT = 8080;

/* ---------- DATABASE INIT ---------- */
const initDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS animales (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL
      );
    `);

    console.log("Tabla 'animales' verificada/creada correctamente");
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
    process.exit(1);
  }
};

const getAnimales = async () => {
  try {
    const result = await pool.query("SELECT * FROM animales;");
    console.log(`[CONSULTA] Todos los animales | Fecha/hora: ${new Date()}`);
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/* ---------- ROUTES ---------- */

router.get("/animales", async (req, res) => {
  const animales = await getAnimales();
  animales === false
    ? res.status(500).json({ message: "Error desconocido en la db" })
    : res.status(200).json({ animales: animales.rows });
});

router.post("/animales", async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  let suma = 0;
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      suma += j;
    }
    suma += i;
  }

  try {
    await pool.query("INSERT INTO animales (nombre) values ($1)", [nombre]);
    console.log(`[INSERTADO] Animal ${nombre} | Fecha/hora: ${new Date()}`);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error desconocido en la db" });
  }

  res.status(201).json({ message: "Almacenado correctamente", nombre: nombre });
});

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* ---------- MOUNT ROUTER ---------- */

app.use("/api", router);

/* ---------- START SERVER ---------- */

const startServer = async () => {
  await initDatabase();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
};

startServer();

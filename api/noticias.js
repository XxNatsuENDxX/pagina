export default async function handler(req, res) {
  // 1. Cabeceras CORS por si accedes desde otro dominio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Recibimos el término de búsqueda desde tu script.js
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Falta el término de búsqueda (q)' });
  }

  // 3. Usa la variable de entorno de Vercel o tu clave actual como respaldo
  const API_KEY = process.env.GNEWS_API_KEY || "9b96faac5008c088be90aaf58c28c472";

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=es&max=10&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Devolvemos el mismo código de estado y los datos a tu frontend
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al conectar con el servidor de GNews' });
  }
}
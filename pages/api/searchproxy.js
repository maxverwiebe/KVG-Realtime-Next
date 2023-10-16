import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { character } = req.query;

  try {
    const response = await fetch(`https://www.kvg-kiel.de/internetservice/services/lookup/stopsByCharacter?character=${character}`);
    const data = await response.json();
    res.setHeader("Cache-Control", "public, max-age=3600")
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

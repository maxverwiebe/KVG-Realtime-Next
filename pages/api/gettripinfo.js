import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query;

  const apiEndpoint = `https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/tripInfo/tripPassages?tripId=${id}`

  try {
    const response = await fetch(apiEndpoint);
    const apiData = await response.json();

    res.status(200).json(apiData);

  } catch (error) {
    console.error('Error fetching data:', error);
    
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}





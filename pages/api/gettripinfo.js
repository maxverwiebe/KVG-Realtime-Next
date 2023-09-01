import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { id } = req.query;

  const apiEndpoint = 'http://localhost:3001/trips/get_trip/' + id
  const headers = {
    'X-API-KEY': 'AAN-2D9-ZFV-23O-8SH',
  };

  try {
    const response = await fetch(apiEndpoint, { headers });
    const apiData = await response.json();

    res.status(200).json(apiData);

  } catch (error) {
    console.error('Error fetching data:', error);
    
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}





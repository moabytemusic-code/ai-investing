export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const BREVO_API_KEY = process.env.VITE_BREVO_API_KEY || process.env.BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      console.error('Missing Brevo API Key');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [2], // Update with your specific Brevo list ID
        updateEnabled: true,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      return res.status(response.status).json({ message: data?.message || 'Failed to subscribe' });
    }

    return res.status(200).json({ message: 'Successfully subscribed', data });
  } catch (error) {
    console.error('Server error styling Brevo:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

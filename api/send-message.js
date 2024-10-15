const fetch = require('node-fetch');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { targetId, token, messageContent } = req.body;

  const url = `https://graph.facebook.com/v12.0/me/messages?access_token=${token}`;

  const data = {
    messaging_type: "RESPONSE",
    recipient: { id: targetId },
    message: { text: messageContent }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const result = await response.json();
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

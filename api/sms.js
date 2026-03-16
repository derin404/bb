export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { to, type, data } = req.body;

  const messages = {
    signup:    `Welcome to BloodBridge, ${data.name}! 🩸 Your account is active. You can now donate blood or request help.`,
    submitted: `BloodBridge: Blood request for ${data.patient} (${data.blood} × ${data.units} units) at ${data.hospital} submitted. Finding donors now.`,
    accepted:  `BloodBridge: Your request for ${data.patient} has been ACCEPTED. Donors are being alerted. Hospital: ${data.hospital}, ${data.city}.`,
    connected: `BloodBridge: Donor matched for ${data.patient}! Donor: ${data.donor_name}, Phone: ${data.donor_phone}. Please coordinate with the hospital immediately.`,
  };

  const body = messages[type];
  if (!body) return res.status(400).json({ error: 'Invalid type' });

  const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_SID}/Messages.json`;
  const auth = Buffer.from(`${process.env.TWILIO_SID}:${process.env.TWILIO_TOKEN}`).toString('base64');

  const smsRes = await fetch(twilioUrl, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ To: to, From: process.env.TWILIO_FROM, Body: body }).toString(),
  });

  const result = await smsRes.json();
  return res.status(smsRes.ok ? 200 : 500).json(result);
}
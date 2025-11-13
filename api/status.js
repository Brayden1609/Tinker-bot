let botStatus = 'Idle'; // default

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json({ status: botStatus });
    } else if (req.method === 'POST') {
        const { status } = req.body;
        if (status) botStatus = status;
        res.status(200).json({ updated: botStatus });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
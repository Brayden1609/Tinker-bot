export default function handler(req, res) {
    if (req.method === 'POST') {
        const events = [
            "✨ Confetti everywhere! ✨",
            "💥 BOOM! Something exploded! 💥",
            "🍕 Pizza rain! 🍕",
            "👻 A ghost appears! 👻",
            "🎉 You feel... magical? 🎉"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        res.status(200).json({ triggered: randomEvent });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
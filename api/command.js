export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        let response = "Unknown command.";
        if (command.toLowerCase() === 'hug') {
            response = "🤗 Sending a big hug!";
        } else if (command.toLowerCase() === 'surprise') {
            const events = [
                "✨ Confetti everywhere! ✨",
                "💥 BOOM! Something exploded! 💥",
                "🍕 Pizza rain! 🍕",
                "👻 A ghost appears! 👻",
                "🎉 You feel... magical? 🎉"
            ];
            response = events[Math.floor(Math.random() * events.length)];
        }

        res.status(200).json({ response });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
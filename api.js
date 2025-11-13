// api.js (Node.js / Vercel Serverless function style)
let botStatus = 'offline';

export default async function handler(req, res) {
    const { method } = req;

    if (method === 'GET') {
        // e.g., /api/status
        return res.json({ status: botStatus });
    }

    if (method === 'POST') {
        const body = await req.json();

        if ('status' in body) {
            botStatus = body.status;
            return res.json({ updated: botStatus });
        }

        if ('command' in body) {
            const response = handleCommand(body.command); // your bot logic
            return res.json({ response });
        }

        if (body.chaos) {
            const chaosEvent = triggerChaos(); // your chaos logic
            return res.json( { triggered: chaosEvent });
        }
    }

    res.status(405).json({ error: 'Method not allowed' });
}

// Example functions for demo
function handleCommand(cmd) {
    if (cmd.toLowerCase() === 'hug') return '🤗 Hug sent!';
    return `You typed: ${cmd}`;
}

function triggerChaos() {
    const events = ["✨ Confetti everywhere!", "💥 BOOM!", "🍕 Pizza rain!"];
    return events[Math.floor(Math.random() * events.length)];
}

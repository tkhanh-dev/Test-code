const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3030;

app.use(express.json());

app.post('/api/fetch-video', async (req, res) => {
    const url = 'https://worker.savefrom.net/savefrom.php';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/124.0.0 Mobile Safari/537.36'
    };

    const payload = new URLSearchParams({
        url: req.body.videoUrl || 'https://example.com/video.mp4'
    }).toString();

    try {
        const response = await fetch(url, { method: 'POST', headers, body: payload });
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const videoLink = doc.querySelector('a[href*="video"]')?.getAttribute('href');
        res.json({ videoLink: videoLink || 'No video URL found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));

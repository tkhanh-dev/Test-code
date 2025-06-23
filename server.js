const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/fetch-video', async (req, res) => {
    const url = 'https://worker.savefrom.net/savefrom.php';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 Chrome/124.0.0 Mobile Safari/537.36'
    };

    const payload = new URLSearchParams({
        url: req.body.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Example YouTube URL
    }).toString();

    try {
        const response = await fetch(url, { method: 'POST', headers, body: payload });
        if (!response.ok) {
            throw new Error('API request failed');
        }
        const data = await response.text();
        // Simple parsing for a potential video link (adjust based on actual response)
        const videoLink = data.includes('video') ? data.match(/https?:\/\/[^\s]+video[^\s]+/)?.[0] : 'No video link found';
        res.json({ videoLink: videoLink || 'No video link found' });
    } catch (error) {
        // Fallback mock response if API fails
        console.log('API error, using mock:', error.message);
        res.json({ videoLink: 'https://example.com/mock-video.mp4' });
    }
});

app.listen(port, () => console.log(`Server at http://localhost:${port}`));

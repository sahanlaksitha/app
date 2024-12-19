const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Telegram Bot API configuration
const TELEGRAM_BOT_TOKEN = '8080972949:AAHeqF2352do546naypN2FS-p_BNagw2keU'; // Replace with your bot token
const CHANNEL_USERNAME = 'tipstream'; // Replace with your channel username

// Endpoint to fetch posts from the Telegram channel
app.get('/api/posts', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
        );

        const messages = response.data.result;

        // Filter messages from the specified channel
        const channelPosts = messages
            .filter(msg => msg.channel_post && msg.channel_post.chat.username === CHANNEL_USERNAME)
            .map(post => ({
                id: post.channel_post.message_id,
                content: post.channel_post.text || 'No content available',
            }));

        res.json(channelPosts);
    } catch (error) {
        console.error('Error fetching Telegram posts:', error.message);
        res.status(500).send('Error fetching posts');
    }
});

// Serve the frontend files (optional if frontend is separate)
app.use(express.static('public'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

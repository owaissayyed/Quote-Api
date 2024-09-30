const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const QUOTE_API_URL = 'https://zenquotes.io/api/random';

app.get('/api/quote', async (req, res) => {
    try {
        const response = await axios.get(QUOTE_API_URL);
        const quoteData = response.data[0];
        res.json({
            quote: quoteData.q,
            author: quoteData.a,
        });
    } catch (error) {
        console.error('Error fetching quote', error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
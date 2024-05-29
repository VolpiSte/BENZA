const express = require('express');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const jsonData = req.body;
    const url = 'https://carburanti.mise.gov.it/ospzApi/search/zone';

    try {
        const response = await axios.post(url, jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Save the response to a file
        fs.writeFileSync('info.json', JSON.stringify(response.data, null, 2));

        // Set the response headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.setHeader('Access-Control-Expose-Headers', 'strict-origin-when-cross-origin');

        // Output the response
        res.json(response.data);
    } catch (error) {
        console.error('Error making request:', error);

        // Handle the error
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

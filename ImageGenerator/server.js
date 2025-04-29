import * as dotenv from 'dotenv'
dotenv.config(); 

import OpenAI from 'openai'; 

const openai = new OpenAI ({
    apiKey: process.env.OPENAI,
    project: process.env.PROJECT_ID,
});

if (!process.env.OPENAI || !process.env.PROJECT_ID) {
    throw new Error('Missing OpenAI API key or Project ID!');
  }


import express from 'express'; 
import cors from 'cors'; 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log('prompt received', prompt);
        console.log('API Key loaded:', process.env.OPENAI)

        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data[0].url;
        res.send({ image });

    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Something went wrong generating the image.' });
    }
});
app.listen(8080, () => console.log('make art on http://localhost:8080/dream')); 


const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/analyze', upload.single('image'), async (req, res) => {
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;

  try {
    const base64Image = fs.readFileSync(filePath, { encoding: 'base64' });

    const prompt = `
      You are a medical AI assistant trained to analyze images of human wounds. 
      If you can't identify a wound, respond with: {"error": "Unclear image"}

      Otherwise, respond using **exactly** this JSON structure. Do not include any other text.

      {
        "woundType": "",  // One of: Abrasions, Bites, Bruises, Burns, Cuts, Incisions, Lacerations, Punctures, Skin tears, Sprains, Stings, Ulcers
        "severity": "",   // One of: Mild, Moderate, Severe, Critical
        "category": "",   // One of: Surface wound, Medium thickness wound, Thick wound
        "explanation": "",  // A short explanation of the diagnosis
        "treatment": [    // Step-by-step first aid instructions
          "Step 1...",
          "Step 2...",
          "Step 3..."
        ]
      }
    `;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ]
      })
    });

    const resultData = await response.json();

    fs.unlinkSync(filePath); // Clean up uploaded image

    if (!response.ok) {
      console.error('OpenRouter API error:', resultData);
      return res.status(500).json({ error: resultData.error || 'API request failed' });
    }

    const resultText = resultData.choices[0].message.content;

    try {
    let cleaned = resultText.trim();

    // Remove Markdown code block wrapper if present
    if (cleaned.startsWith('```json') || cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/```json|```/g, '').trim();
    }

    const resultJson = JSON.parse(cleaned);
    res.json(resultJson);
    } 
    catch (err) {
        console.error('Failed to parse JSON from OpenRouter response:', resultText);
        res.status(500).json({
            error: 'Failed to parse AI response. Try again.',
            raw: resultText // optionally include raw for debugging
    });
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

app.get('/', (req, res) => {
  res.send('ResqWise AI backend running ✅');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on http://localhost:${port}`);
});

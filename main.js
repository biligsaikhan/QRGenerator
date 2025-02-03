const express = require('express');
const QRCode = require('qrcode');
const app = express();

app.get('/generate', async (req, res) => {
    const text = req.query.text;
    if (!text) {
        return res.status(400).send('Text query parameter is required');
    }
    
    try {
        const qrCodeUrl = await QRCode.toDataURL(text);
        res.json({ qr: qrCodeUrl });
    } catch (error) {
        res.status(500).send('Error generating QR code');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

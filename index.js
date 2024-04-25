import express from 'express';
import puppeteer from 'puppeteer'

// Create an Express application
const app = express();

// Define a route handler for the root path
app.get('/', async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--disable-extensions']
    })

    const page = await browser.newPage()
    await page.goto('https://google.com')
    const pdf = await page.pdf({ format: 'A4', printBackground: true, path: 'output.pdf' })
    await browser.close();

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="output.pdf"'
    })

    res.send(pdf);
});

// Define a route handler for handling 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

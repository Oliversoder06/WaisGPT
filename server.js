const express = require('express');
const app = express();
const port = 3000;
const child_process = require('child_process');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('scripts'));

let GPTHistory = [];
let UserHistory = [];

app.get('/', (req, res) => {
    res.render('index', { GPTHistory, UserHistory });
});

app.get('/generate', (req, res) => {
    const prompt = req.query.prompt;

    const pythonProcess = child_process.spawn('python', ['model/gpt.py', prompt]);
    pythonProcess.stdout.on('data', (data) => {
        const output = data.toString();

        // Add the new input and output to the chat history
        GPTHistory.push(output);
        UserHistory.push(prompt);

        // Send the output back to the client
        res.send(output);
    });
});

app.listen(port, () => {
    console.log(`GPT4All Project is Listening at http://localhost:${port}`);
});

const tmi = require('tmi.js');
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
require('dotenv').config();


const app = express();
const port = 3000;

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: nait0mea//process.env.TWITCH_NAME,
        password: oauth:sphn0ooj1b7nm9k846tkck24f12t35//process.env.TWITCH_OAUTH
    },
    channels: ['nait0mea']
});

const wss = new WebSocket.Server({ noServer: true });

app.use(bodyParser.json());
app.use(express.static('public'));

client.connect();

client.on('message', (channel, tags, message, self) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ username: tags.username, message: message }));
        }
    });
});

app.post('/send', (req, res) => {
    const { message } = req.body;
    client.say('nait0mea', message);
    res.status(200).send('Message envoyé');
});

const server = app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
    });
});

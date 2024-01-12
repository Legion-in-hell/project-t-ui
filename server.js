const tmi = require('tmi.js');
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
require('dotenv').config();

console.log(process.env.PORT)

const app = express();
const port = process.env.PORT;

const client = new tmi.Client({
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: "nait0mea",//process.env.TWITCH_NAME,
        password: "oauth:jj8l0zr8n0ga7jqauv2x9l9u5f26k5"//process.env.TWITCH_OAUTH
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

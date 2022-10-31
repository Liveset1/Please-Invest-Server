const express = require("express");
const https = require("https");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Home to Please Invest Server");
});

app.get("/getUniverseId", (req, res) => {
    if (!req.query.placeId) return;
    let body;
    let data = '';
    const request = https.request('https://api.roblox.com/universes/get-universe-containing-place?placeid=' + req.query.placeId, (response) => {
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            try {
                body = JSON.parse(data);
                console.log(body);
                res.send(JSON.stringify(body));
            } catch {
                let message = "An error occured: " +  response.statusMessage;
                console.log("An error occured when parsing response!");
                res.send(JSON.stringify({ success: false, message: message}));
            }
        });
    });;
    
    request.on('response', (res) => {
        try {
            let message = "An error occured: " +  res.statusMessage;
            console.log(message);
            res.send(JSON.stringify({ success: false, message: message}));
        } catch {
            console.log("An error occured when receiving response!")
        }
    });
    request.end();
});

app.get('/getGameIcon', (req, res) => {
    if (!req.query.universeId) return;
    let body;
    let data = '';

    const request = https.request(`https://games.roblox.com/v2/games/${req.query.universeId}/media`, (response) => {
        response.setEncoding("utf-8");
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            try {
                body = JSON.parse(data);
                console.log(body);
                res.send(JSON.stringify({ success: true, Info: body}));
            } catch {
                let message = "An error occured: " +  response.statusMessage;
                console.log("An error occured when parsing response!");
                res.send(JSON.stringify({ success: false, message: message}));
            }
        });
    });

    request.on('response', (res) => {
        try {
            let message = "An error occured: " +  res.statusMessage;
            console.log(message);
            res.send(JSON.stringify({ success: false, message: message}));
        } catch {
            console.log("An error occured when receiving response!");
        }
    });

    request.on('error', (error) => {
        try {
            let message = "An error occured: " +  error;
            console.log(message);
            res.send(JSON.stringify({ success: false, message:  message}));
        } catch {
            console.log("An error occured when receiving response!");
        }
    });

    request.end();
});

app.listen(port, () => console.log(`HelloNode app listening on port ${port}!`));

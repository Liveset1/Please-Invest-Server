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

app.get('/getGameInfo', (req, res) => {
    if (!req.query.placeId) return;

    let data = "";

    const request = https.request(`https://games.roblox.com/v1/games/multiget-place-details?placeIds=${req.query.placeId}`, (response) => {
        response.setEncoding("utf-8");
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            try {
                res.send(JSON.stringify({ success: true, Info: JSON.parse(data)}));
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

app.get('/getGamepasses', (req, res) => {
    if (!req.query.universeId) return;
    let data = "";
    const request = https.request(`https://games.roblox.com/v1/games/${req.query.universeId}/game-passes?limit=10&sortOrder=Asc`, (response) => {
        response.setEncoding("utf-8");
        response.on('data', (chunk) => {
            data = data + chunk.toString();
        });

        response.on('end', () => {
            try {
                res.send(JSON.stringify({ success: true, Info: JSON.parse(data)}));
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

app.get("/getGroupProducts", (req, res) => {
    if (!req.query.groupId) return;
    let body;
    let data = '';

    const request = https.request("https://catalog.roblox.com/v1/search/items/details?Category=3&CreatorType=2&IncludeNotForSale=true&Limit=10&CreatorTargetId=" + req.query.groupId, (response) => {
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
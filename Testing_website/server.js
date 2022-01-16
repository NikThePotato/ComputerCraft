const httpTest = require("http");

const httpServer = httpTest.createServer();
httpServer.listen(25564, () => console.log("Listening.. on 25564"))

const WebS = require("ws")
const wss = new WebS.Server({ port: 25565 })

wss.on("connection", ws => {
    console.log("connection!")
    ws.on("message", msg => {
        wss.broadcast(JSON.stringify({ func: msg.toString() }))
    })
});

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg)
    });
};
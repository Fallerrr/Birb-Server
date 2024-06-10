const redweb = require('redweb');

var index = -1;

// const b = new redweb.HttpServer({services: [
//     {serviceName: '/wazb', method: redweb.METHODS.GET, 'function':  (req, res) => {
//         res.send('<h1>wazb.html</h1>');
//     }}
// ]});

const broadcast = (socket, data) => {
    wb.clients.forEach(client => {
        client.send(JSON.stringify(data));
    });
}

const wb = new redweb.SocketServer({connectionOpenCallback: (socket) => {
    index++;
    socket.send(JSON.stringify({type: 'assign-index', data: index}));
    broadcast(null, {type: 'player-connect', data: index});
}});

wb.messageHandlers['player-move'] = broadcast;

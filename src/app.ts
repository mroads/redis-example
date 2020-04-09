import * as fs from 'fs';
import { createServer, Server } from 'https';
import * as Socket from 'socket.io';
import WebSocketController from './controllers/web-socket-controller.js';
import * as URL from 'url';


var key = fs.readFileSync(__dirname + '/../keys/key.pem').toString();
var cert = fs.readFileSync(__dirname + '/../keys/cert.crt').toString();
var cert_bundle = fs.readFileSync(__dirname + '/../keys/cert-bundle.crt').toString();
var ca_root = fs.readFileSync(__dirname + '/../keys/ca-root.crt').toString();

export default class App {

  server: Server;
  websocket;

  constructor() {
    this.createHttpServer();
    this.createWebSocketServer();
  }

  createHttpServer() {
    this.server = createServer({
      key: key,
      cert: cert,
      ca: [
         ca_root,
         cert_bundle
      ]
    }, (req, res) => {
      res.writeHead(200);
      var q = URL.parse(req.url, true);
      var filename = "./" + q.pathname;
      fs.readFile(filename, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }  
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
    });
  }

  createWebSocketServer() {
    this.websocket = Socket(this.server, {
      pingTimeout: 5000,
      pingInterval: 55000
    });
    this.websocket.on('connection', socket => {
      console.info('socket connected');
      new WebSocketController(socket);
    });
  }
  listen(port) {
    this.server.listen(port,null, () => {
      console.log('listening on port ', port);
    });
  }

}


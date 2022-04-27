const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server{

    constructor(){

        //Express
        this.app    = express();
        this.port   = process.env.PORT;

        //Socket io
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        //Path
        this.paths = {

        }

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();

        //Sockets
        this.sockets();
    }

    routes(){

    }

    sockets(){
        this.io.on('connection', socketController);
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Public directory
        this.app.use(express.static('public'));

    }

    listener(){
        this.server.listen(this.port, () => {
            console.clear();
            console.log(`Corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;
import {logger} from "./utils/logger.js"
function socketServerController(socketServer){
    socketServer.on('connection',socket => {
        logger.info("Cliente Conectado.");
        socket.on('message',data => {
            logger.info(data);
        });
    })
    
}

export default socketServerController;
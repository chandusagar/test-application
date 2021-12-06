import React, { createContext } from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";

import UserPool from './pages/auth/UserPool';

import EventBus from "./EventBus";
const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {

    let socket;
    let ws;

    const ping = () =>{

        if (!socket) return;
        if (socket.readyState !== 1) return;
        socket.send(JSON.stringify({"action" : 'message' , "type": "ping" }));
        setTimeout(ping, 5000);
        
    }

    const sendMessage = (params) => {
        socket.send(params);
    }

    if (!socket) {

        function startWebsocket() { 

            socket = new W3CWebSocket(`wss://dtjed33qnk.execute-api.us-east-1.amazonaws.com/dev`);
    
            socket.onerror = function(event) {
                console.log(event);
            };
            
            socket.onopen = function(event) {
                
                let user = UserPool.getCurrentUser()
                if(user && user.username){
                    console.log("Connected " , user.username )
                    socket.send(JSON.stringify({"action" : 'message' , "type": "map-user" , user_id :  user.username  }));
                }
                ping();
            };
            
            socket.onclose = function(event) {
                console.log(event);
                socket = null
                setTimeout(startWebsocket, 3000)
            };
            
            socket.onmessage = function(event) {
    
                let data = JSON.parse(event.data)
                if(data.type === 'checked-in'){
                    
                    EventBus.dispatch("MESSAGE", data );

                }else if(data.type === 'final-checked-in'){

                    EventBus.dispatch("MESSAGE-FINAL", data );

                }else if(data.type === 'notification'){

                    EventBus.dispatch("NOTIFICATION", data );

                }else if(data.type === 'stage-info'){

                    EventBus.dispatch("STAGE-INFO", data );
                }
            };
        }
        
        startWebsocket();
        ws = { socket , sendMessage }

    }


    return (
        <WebSocketContext.Provider value={ws}>
            { children }
        </WebSocketContext.Provider>
    )

}
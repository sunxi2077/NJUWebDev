import { OnWSConnection, OnWSMessage, WSController } from '@midwayjs/core';
import { Context } from '@midwayjs/ws';
import * as http from 'http';

@WSController()
export class WebSocket {

    @OnWSConnection()
    public async connect(socket: Context, request: http.IncomingMessage) {
        return JSON.stringify({
            code: 0,
            message: 'connected',
        })
    }


    @OnWSMessage('message')
    public async receive(socket: Context, msg: Buffer) {
        return JSON.stringify({
            code: 0,
            message: 'received',
            data: msg.toString()
        });
    }
}


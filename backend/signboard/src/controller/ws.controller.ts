/* eslint-disable prettier/prettier */
import { WSController, OnWSMessage, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/ws';
import * as fs from 'fs/promises';
import * as path from 'path';

@WSController('/login')
export class WebSocket {
    @Inject()
    ctx: Context;

    private async getUserData() {
        try {
            const filePath = path.resolve(__dirname, '../data/login.json');
            console.log('Attempting to read:', filePath);
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading login.json:', error.message);
            console.error('Stack trace:', error.stack);
            return null;
        }
    }


    @OnWSMessage('message')
    async onMessage(data: string) {
        console.log('Received data:', data); // 记录接收到的数据
        const { type, data: loginData } = JSON.parse(data);

        if (type === 'login') {
            const { email, password } = loginData;
            console.log('Login attempt:', email, password); // 记录登录尝试
            const users = await this.getUserData();

            if (users) {
                const user = users.find((user: any) => user.email === email && user.password === password);
                console.log('Found user:', user); // 记录找到的用户
                if (user) {
                    this.ctx.send(JSON.stringify({ success: true, message: '登录成功' }));
                } else {
                    this.ctx.send(JSON.stringify({ success: false, message: '用户名或密码错误' }));
                }
            } else {
                this.ctx.send(JSON.stringify({ success: false, message: '用户数据无法加载' }));
            }
        }
    }

}

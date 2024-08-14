// /* eslint-disable prettier/prettier */
// import { WSController, OnWSMessage, Inject } from '@midwayjs/core';
// import { Context } from '@midwayjs/ws';
// import * as fs from 'fs/promises';
// import * as path from 'path';

// @WSController('/register')
// export class RegisterController {
//     @Inject()
//     ctx: Context;

//     private async getUserData() {
//         try {
//             const filePath = path.resolve(__dirname, '../data/login.json');
//             console.log('Reading user data from:', filePath);
//             const data = await fs.readFile(filePath, 'utf-8');
//             return JSON.parse(data);
//         } catch (error) {
//             console.error('Error reading login.json:', error.message);
//             return [];
//         }
//     }

//     private async saveUserData(users: any) {
//         try {
//             const filePath = path.resolve(__dirname, '../data/login.json');
//             console.log('Writing user data to:', filePath);
//             await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
//             console.log('User data saved successfully.');
//         } catch (error) {
//             console.error('Error writing to login.json:', error.message);
//         }
//     }

//     @OnWSMessage('message')
//     async onMessagea(data: Buffer) {
//         const dataStr = data.toString();
//         console.log('Received data:', dataStr);
//         const { email, password } = JSON.parse(dataStr);

//         if (email && password) {
//             const users = await this.getUserData();
//             const existingUser = users.find((user: any) => user.email === email);

//             if (existingUser) {
//                 this.ctx.send(JSON.stringify({ success: false, message: '该邮箱已被注册' }));
//             } else {
//                 users.push({ email, password });
//                 await this.saveUserData(users);
//                 console.log('New user added:', { email, password });
//                 this.ctx.send(JSON.stringify({ success: true, message: '注册成功' }));
//             }
//         } else {
//             this.ctx.send(JSON.stringify({ success: false, message: '注册无效' }));
//         }
//     }
// }

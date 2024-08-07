// src/components/Register.jsx
import  { useState } from 'react';
import './LogIn.css';

const Register = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    

    const handleRegister = (event) => {
        event.preventDefault();
        console.log('新用户名:', newUsername);
        console.log('新密码:', newPassword);
        // 在此处添加注册逻辑，如发送请求到后端服务器进行注册
        // 示例：假设注册成功后跳转到登录页面
        // history.push('/');
    };

    const navigateToLogin = () => {
        history.push('/');
    };

    return (
        <div className="login-container">
            <h2>用户注册</h2>
            <form onSubmit={handleRegister}>
                <div className="input-group">
                    <label htmlFor="new-username">用户名</label>
                    <input
                        type="text"
                        id="new-username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="new-password">密码</label>
                    <input
                        type="password"
                        id="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">注册</button>
            </form>
            <p>已有账号？<button onClick={navigateToLogin}>登录</button></p>
        </div>
    );
};

export default Register;

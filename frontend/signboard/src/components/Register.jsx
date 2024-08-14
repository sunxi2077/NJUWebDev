import { useState } from 'react';
import './LogIn.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        // 构建注册信息
        const registrationData = {
            email,
            password
        };
    
        // 创建 WebSocket 连接
        const socket = new WebSocket('ws://localhost:3000/register');
    
        // 连接成功后发送注册信息
        socket.onopen = () => {
            socket.send(JSON.stringify(registrationData)); // 直接发送 registrationData
        };
    
        // 处理服务器响应
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.success) {
                alert('Registration successful!');
                window.location.href = '/login'; // 注册成功后跳转到登录页面
            } else {
                alert(`Registration failed: ${response.message}`);
            }
        };
    
        // 处理连接错误
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };
    

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Register</button>
                <div className="register-link">
                    Already have an account? <a href="/login">Log in here</a>
                </div>
            </form>
        </div>
    );
};

export default Register;

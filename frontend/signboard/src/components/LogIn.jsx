import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 建立 WebSocket 连接
        const ws = new WebSocket('ws://localhost:3000');
        setSocket(ws);

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.success) {
                navigate('/taskboard');
            } else {
                alert('Invalid email or password');
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // 发送登录请求
        const loginData = { email, password };
        socket.send(JSON.stringify({ type: 'login', data: loginData }));

        console.log('Email:', email, 'Password:', password);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                <button type="submit" className="login-button">Log In</button>
            </form>
        </div>
    );
};

export default Login;

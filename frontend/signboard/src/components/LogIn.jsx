import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const validEmail = "123456@163.com"
        const validPassword = "123456"
        if (email === validEmail && password === validPassword) {
            navigate('/taskboard')
        } else {
            alert('Invalid email or password');
        }
        // 在此处添加表单提交逻辑，例如通过 API 验证用户凭据
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
                <div className="register-link">
                    Don`t have an account? <a href="/register">Register here</a>
                </div>
            </form>
        </div>
    );
};

export default Login;

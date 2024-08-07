import { useNavigate } from 'react-router-dom';
import task from '../../public/task.svg';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            <div>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <img src={task} className="logo" alt="Board logo" />
                </a>
            </div>
            <h1>Welcome to Your Board</h1>
            <div className="card">
                <button onClick={navigateToLogin}>
                    Click to Log In
                </button>
            </div>
            <p className="read-the-docs">
                {/* 下方小字注释部分 */}
            </p>
        </div>
    );
};

export default Home;
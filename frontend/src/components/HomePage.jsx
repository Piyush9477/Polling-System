import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HomePage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student');

    const handleContinue = () => {
        if (role === 'teacher') navigate('/teacher/start');
        else navigate('/student/start');
    };
    return (
        <div className="wrapper">
            <img src='/Intervue-Logo 2.png' alt="logo" style={{ width: '150px', height: 'auto' }}/>
            <h1 className="heading">
                <span className="text-bold">Welcome to the</span> Live Polling System
            </h1>
            <p className="description">
                Please select the role that best describes you to begin using the live polling system
            </p>

            <div className="role-cards">
                <div className="card" onClick={() => setRole('student')}>
                    <h2 className="card-title">I'm a Student</h2>
                    <p>Submit answers once a question is asked and view live polling results after submission </p>
                </div>
                <div className="card" onClick={() => setRole('teacher')}>
                    <h2 className="card-title">I'm a Teacher</h2>
                    <p>Submit answers and view live poll results in real-time.</p>
                </div>
            </div>
            <button className="btn-continue" onClick={handleContinue}>Continue</button>
        </div>
    );
};

export default HomePage;

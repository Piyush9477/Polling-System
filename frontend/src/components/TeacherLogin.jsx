import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api';

const TeacherLogin = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleContinue = async () => {
        if (!name) {
            alert('Please enter your name');
            return;
        }

        try {
            const userRes = await fetch(`${API_BASE_URL}/users/teacher`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            if (!userRes.ok) throw new Error('Failed to register teacher');
            const teacher = await userRes.json();

            const pollRes = await fetch(`${API_BASE_URL}/polls`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `${name}'s Poll`,
                    teacherId: teacher._id,
                    timeLimitSeconds: 60,
                }),
            });
            if (!pollRes.ok) throw new Error('Failed to create poll');
            const poll = await pollRes.json();

            sessionStorage.setItem('teacherId', teacher._id);
            sessionStorage.setItem('pollId', poll._id);

            navigate('/teacher/create-question', { state: { pollId: poll._id } });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="wrapper" style={{ maxWidth: 400, margin: 'auto' }}>
            <img src='/Intervue-Logo 2.png' alt="logo" style={{ width: '150px', height: 'auto' }}/>
            <h2 className="heading" style={{ marginBottom: 0 }}>
                Let’s <span className="text-bold">Get Started</span>
            </h2>
            <div className="description" style={{ margin: '10px 0 26px 0', textAlign: 'center' }}>
                If you’re a teacher, create polls, ask questions, and monitor live responses in real-time.
            </div>
            <div style={{ textAlign: 'left', marginBottom: 18 }}>
                <span className="text-bold">Enter your Name</span>
                <input
                    type="text"
                    className="card"
                    style={{
                        width: '100%',
                        marginTop: 6,
                        boxShadow: 'none',
                        borderRadius: 8,
                        padding: '11px 10px',
                        fontSize: 18,
                        border: '1.5px solid var(--color6)',
                        color: 'var(--color5)',
                    }}
                    placeholder="Your Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <button className="btn-continue" onClick={handleContinue}>
                Continue
            </button>
        </div>
    );
};

export default TeacherLogin;

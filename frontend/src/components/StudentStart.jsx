import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentStart = () => {
  const [name, setName] = useState('');

  const API_BASE_URL = 'http://localhost:8000/api';
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }

    try {
      const tabId = window.sessionStorage.getItem('tabId') || crypto.randomUUID();
      window.sessionStorage.setItem('tabId', tabId);

      const response = await fetch(`${API_BASE_URL}/users/student`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, tabId }),
      });
      if (!response.ok) throw new Error('Failed to register student');
      const data = await response.json();

      sessionStorage.setItem('studentId', data._id);

      let pollId = sessionStorage.getItem('pollId');

      if (!pollId) {
        const pollRes = await fetch(`${API_BASE_URL}/polls/active`);  
        if (pollRes.ok) {
          const activePoll = await pollRes.json();
          pollId = activePoll?._id || null;
          if (pollId) sessionStorage.setItem('pollId', pollId);
        }
      }

      if (!pollId) {
        alert('No active poll found. Contact your teacher.');
        return;
      }

      navigate('/student/poll'); 

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
        If you’re a student, you’ll be able to <b>submit your answers</b>, participate in live polls, and see how your responses compare with your classmates
      </div>
      <div style={{ textAlign: 'left', marginBottom: 18 }}>
        <span className="text-bold">Enter your Name</span>
        <input
          type="text"
          className="card"
          style={{ width: '100%', marginTop: 6, boxShadow: 'none', borderRadius: 8, padding: '11px 10px', fontSize: 18, border: '1.5px solid var(--color6)', color: 'var(--color5)' }}
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <button className="btn-continue" onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default StudentStart;

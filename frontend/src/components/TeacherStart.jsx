import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TeacherStart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pollId } = location.state || {};

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { value: '', isCorrect: false },
    { value: '', isCorrect: false }
  ]);
  const [timeLimit, setTimeLimit] = useState(60);

  const API_BASE_URL = 'http://localhost:8000/api';

  if (!pollId) {
    return (
      <div className="wrapper" style={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--color5)' }}>
          Poll ID missing. Please <button onClick={() => navigate('/teacher/login')} style={{ color: 'var(--color1)', background: 'none', border: 'none', cursor: 'pointer' }}>login again</button>.
        </h2>
      </div>
    );
  }

  const handleAskQuestion = async () => {
    if (!question) {
      alert('Please enter a question');
      return;
    }
    if (options.some(opt => !opt.value)) {
      alert('Please fill in all option fields');
      return;
    }

    const optionValues = options.map(opt => opt.value);

    try {
      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pollId,
          questionText: question,
          options: optionValues,
        }),
      });
      if (!response.ok) throw new Error('Failed to ask question');
      const data = await response.json();
      alert('Question asked successfully!');

    } catch (error) {
      alert(error.message);
    }
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx].value = value;
    setOptions(newOptions);
  };

  const handleIsCorrect = (idx, val) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === idx ? val : false
    }));
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, { value: '', isCorrect: false }]);

  return (
    <div className="wrapper" style={{ alignItems: 'flex-start', maxWidth: 700, margin: 'auto' }}>
      <img src='/Intervue-Logo 2.png' alt="logo" style={{ width: '150px', height: 'auto' }} />
      <h2 className="heading" style={{ marginBottom: 0 }}>
        Let’s <span className="text-bold">Get Started</span>
      </h2>
      <div className="description" style={{ textAlign: 'left', marginBottom: 25, marginTop: 8 }}>
        you’ll have the ability to create and manage polls, ask questions, and monitor your students' responses in real-time.
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="text-bold">Enter your question</span>
          <select value={timeLimit} onChange={e => setTimeLimit(Number(e.target.value))} style={{ borderRadius: 8, padding: '2px 10px' }}>
            <option value={60}>60 seconds</option>
            <option value={45}>45 seconds</option>
            <option value={30}>30 seconds</option>
          </select>
        </div>
        <textarea
          maxLength={100}
          rows={3}
          value={question}
          onChange={e => setQuestion(e.target.value)}
          style={{ width: '100%', border: '1.5px solid var(--color6)', borderRadius: 8, background: '#f6f6f6', marginTop: 8, fontSize: 16, padding: 12 }}
        />
        <div style={{ fontSize: 12, color: 'var(--color6)', marginTop: 2 }}>{question.length}/100</div>
      </div>

      <div style={{ display: 'flex', gap: 16, fontWeight: 500, margin: '16px 0 8px 0' }}>
        <div style={{ flex: 1 }}>Edit Options</div>
        <div style={{ width: 140 }}>Is it Correct?</div>
      </div>
      {options.map((opt, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 8 }}>
          <span style={{ color: 'var(--color1)', fontWeight: 500 }}>{idx + 1}</span>
          <input type="text" value={opt.value} onChange={e => handleOptionChange(idx, e.target.value)} style={{ flex: 1, borderRadius: 8, padding: 6, border: '1.5px solid var(--color6)', background: '#f6f6f6' }} />
          <div style={{ display: 'flex', gap: 18 }}>
            <label>
              <input
                type="radio"
                name={`correct${idx}`}
                checked={opt.isCorrect}
                onChange={() => handleIsCorrect(idx, true)}
                style={{ accentColor: 'var(--color3)' }}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={`correct${idx}`}
                checked={!opt.isCorrect}
                onChange={() => handleIsCorrect(idx, false)}
                style={{ accentColor: 'var(--color6)' }}
              />{' '}
              No
            </label>
          </div>
        </div>
      ))}
      <button className="btn-label" onClick={addOption} style={{ background: '#fff', color: 'var(--color1)', border: '1.5px solid var(--color1)', margin: 0, marginBottom: 32 }}>
        + Add More option
      </button>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
        <button className="btn-continue" style={{ minWidth: 180 }} onClick={handleAskQuestion}>
          Ask Question
        </button>
      </div>
    </div>
  );
};

export default TeacherStart;

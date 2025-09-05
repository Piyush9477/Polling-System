import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TeacherStart from './components/TeacherStart';
import StudentStart from './components/StudentStart';
import TeacherLogin from './components/TeacherLogin';
import StudentPollStage from './components/StudentPollStage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route path="/teacher/create-question" element={<TeacherStart />} />
        <Route path="/student/start" element={<StudentStart />} />
        <Route path="/student/poll" element={<StudentPollStage pollId={sessionStorage.getItem('pollId')} studentId={sessionStorage.getItem('studentId')} />}/>
      </Routes>
    </Router>
  );
}

export default App;

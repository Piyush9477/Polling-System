import { useEffect, useState } from "react";
import StudentWaiting from "./StudentWaiting";
import StudentQuestion from "./StudentQuestion";

const API_BASE_URL = 'http://localhost:8000/api';

const StudentPollStage = ({ pollId, studentId }) => {
    const [questionObj, setQuestionObj] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [timeLeft, setTimeLeft] = useState(60); 

    useEffect(() => {
        if (!pollId) {
            setQuestionObj(null);
            return;
        }
        
        const fetchActiveQuestion = async () => {
            const res = await fetch(`${API_BASE_URL}/questions/active/${pollId}`);
            if (res.ok) {
                const question = await res.json();
                setQuestionObj(question);
            } else {
                setQuestionObj(null);
            }
        };
        fetchActiveQuestion();
        const interval = setInterval(fetchActiveQuestion, 2000);
        return () => clearInterval(interval);
    }, [pollId]);

    useEffect(() => {
        let timer;
        if (questionObj) {
            setTimeLeft(60); 
            timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
        }
        return () => clearInterval(timer);
    }, [questionObj]);

    const submitAnswer = async () => {
        const res = await fetch(`${API_BASE_URL}/answers`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentId,
                questionId: questionObj._id,
                selectedOption
            })
        });
    };

    if (!questionObj) return <StudentWaiting />;
    return (
        <StudentQuestion
            questionObj={questionObj}
            onSubmit={submitAnswer}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            timeLeft={timeLeft}
        />
    );
};

export default StudentPollStage;

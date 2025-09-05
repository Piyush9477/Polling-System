import { useState } from "react";

const StudentQuestion = ({
    questionObj,
    onSubmit,
    selectedOption,
    setSelectedOption,
    timeLeft
}) => (
    <div className="wrapper" style={{ alignItems: 'flex-start', minHeight: '60vh' }}>
        <div style={{ width: '100%', maxWidth: 520, margin: 'auto' }}>
            <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 18 }}>Question 1</span>
                <span style={{ marginLeft: 24, fontSize: 15, color: '#d63b3b', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 19, marginRight: 5 }}>⏰</span>
                    {timeLeft ? (
                        <span>{String(timeLeft).padStart(2, "0")}</span>
                    ) : null}
                </span>
            </div>
            <div style={{
                borderRadius: "12px 12px 0 0",
                padding: '16px 16px 10px 16px',
                background: 'linear-gradient(90deg, #888 0, #666 100%)',
                color: "#fff",
                fontWeight: 500,
                fontSize: 17,
            }}>
                {questionObj?.questionText}
            </div>
            <div style={{
                border: `1.5px solid #7765DA`,
                borderTop: "none",
                borderRadius: "0 0 14px 14px",
                background: "#fff",
                padding: "8px 0"
            }}>
                {questionObj?.options?.map((option, idx) => (
                    <div
                        key={idx}
                        style={{
                            margin: "8px 18px",
                            border: selectedOption === option ? `2px solid #7765DA` : "1.5px solid #f2f2f2",
                            borderRadius: "8px",
                            background: selectedOption === option ? "#f7f4ff" : "#f6f6f6",
                            display: "flex",
                            alignItems: "center",
                            padding: "10px 15px",
                            cursor: "pointer"
                        }}
                        onClick={() => setSelectedOption(option)}
                    >
                        <span style={{
                            display: 'inline-block',
                            width: 22,
                            height: 22,
                            borderRadius: "100%",
                            background: selectedOption === option ? "#7765DA" : "#e8e8ef",
                            color: selectedOption === option ? "#fff" : "#888",
                            fontWeight: 700,
                            fontSize: 15,
                            lineHeight: "22px",
                            marginRight: 13,
                            textAlign: "center"
                        }}>{String.fromCharCode(65 + idx)}</span>
                        {option}
                    </div>
                ))}
            </div>
            <button
                className="btn-continue"
                style={{ marginTop: 28, minWidth: 160 }}
                disabled={!selectedOption}
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    </div>
);

export default StudentQuestion;

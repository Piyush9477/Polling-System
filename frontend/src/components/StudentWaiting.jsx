const StudentWaiting = () => (
    <div className="wrapper" style={{ height: '100vh', justifyContent: 'center' }}>
        <img src='/Intervue-Logo 2.png' alt="logo" style={{ width: '150px', height: 'auto' }}/>
        <div style={{ fontSize: 56, margin: '38px 0', color: '#4F0DCE' }}>
            <span className="loader" style={{
                border: '4px solid #f3f3f3',
                borderRadius: '50%',
                borderTop: '4px solid #4F0DCE',
                width: 48,
                height: 48,
                display: 'inline-block',
                animation: 'spin 1s linear infinite'
            }} />
        </div>
        <div className="heading" style={{ fontWeight: 500, marginBottom: 0 }}>
            Wait for the teacher to ask questions..
        </div>
        {/* CSS for the loader animation */}
        <style>
            {`
            @keyframes spin {
                0% { transform: rotate(0deg);}
                100% { transform: rotate(360deg);}
            }
            `}
        </style>
    </div>
);

export default StudentWaiting;

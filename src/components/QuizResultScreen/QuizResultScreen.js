import React from 'react';
import './QuizResultScreen.css';

const QuizResultScreen = ({ userName, score, onRestart }) => {
    const totalQuestions = 3;
    return (
        <div className="result-container">
            <h2 className="result-title">{userName}さん、お疲れ様でした！</h2>
            <p className="result-score">{`${totalQuestions}問中${score}問正解`}</p>
            <button onClick={onRestart} className="restart-button">ホームに戻る</button>
        </div>
    );
};

export default QuizResultScreen;
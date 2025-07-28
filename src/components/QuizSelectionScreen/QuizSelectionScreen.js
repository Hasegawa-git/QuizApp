import React from 'react';
import './QuizSelectionScreen.css';

const QuizSelectionScreen = ({ onSelectGenre }) => {
    return (
        <div className="selection-container">
            <h2 className="selection-title">ジャンルを選んでください</h2>
            <div className="selection-buttons">
                <button onClick={() => onSelectGenre('english')} className="genre-button">英語</button>
                <button onClick={() => onSelectGenre('history')} className="genre-button">歴史</button>
                <button onClick={() => onSelectGenre('math')} className="genre-button">数学</button>
            </div>
        </div>
    );
};

export default QuizSelectionScreen;
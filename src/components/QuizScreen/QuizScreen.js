import React, { useState, useEffect } from 'react';
import englishQuiz from '../../data/englishQuiz';
import historyQuiz from '../../data/historyQuiz';
import mathQuiz from '../../data/mathQuiz';
import './QuizScreen.css';

const QuizScreen = ({ userName, genre, onFinish }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        let quizData;
        if (genre === 'english') {
            quizData = englishQuiz;
        } else if (genre === 'history') {
            quizData = historyQuiz;
        } else if (genre === 'math') {
            quizData = mathQuiz;
        }
        setQuizzes(quizData);
    }, [genre]);

    const handleNextQuestion = () => {
        const currentQuiz = quizzes[currentQuestionIndex];
        if (selectedOption === currentQuiz.answer) {
            setCurrentScore(currentScore + 1);
        }

        if (currentQuestionIndex < quizzes.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null); // 次の問題へ進む前に選択肢をリセット
        } else {
            onFinish(currentScore); // クイズ終了
        }
    };

    const currentQuiz = quizzes[currentQuestionIndex];

    if (!currentQuiz) {
        return <div className="quiz-loading">クイズを読み込み中...</div>;
    }

    return (
        <div className="quiz-container">
            <p className="quiz-progress">{`${currentQuestionIndex + 1}/${quizzes.length}問目`}</p>
            <h3 className="quiz-question">{currentQuiz.question}</h3>
            <div className="quiz-options">
                {currentQuiz.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedOption(option)}
                        className={`quiz-option-button ${selectedOption === option ? 'selected' : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button
                onClick={handleNextQuestion}
                disabled={!selectedOption}
                className="next-button"
            >
                次の問題へ進む
            </button>
        </div>
    );
};

export default QuizScreen;
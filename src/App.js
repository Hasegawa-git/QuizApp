<<<<<<< HEAD
import React, { useState } from 'react';
import QuizStartScreen from './components/QuizStartScreen/QuizStartScreen';
import QuizSelectionScreen from './components/QuizSelectionScreen/QuizSelectionScreen';
import QuizScreen from './components/QuizScreen/QuizScreen';
import QuizResultScreen from './components/QuizResultScreen/QuizResultScreen';
import './App.css';

function App() {
  const [userName, setUserName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [score, setScore] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('start');

  const handleStart = (name) => {
    setUserName(name);
    setCurrentScreen('genreSelection');
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentScreen('quiz');
  };

  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
    setCurrentScreen('result');
  };

  const handleRestart = () => {
    setUserName('');
    setSelectedGenre(null);
    setScore(0);
    setCurrentScreen('start');
  };

  const renderScreen = () => {
    // もし現在start画面ならQuizStartScreenコンポーネントを表示し、onStartプロップスにhandeStart関数を渡す
    if (currentScreen === 'start') {
      return <QuizStartScreen onStart={handleStart} />;
    }
    // もし現在genreSelection画面ならQuizSelectionScreenコンポーネントを表示し、onSelectGenreプロップスにhandleGenreSelect関数を渡す
    if (currentScreen === 'genreSelection') {
      return <QuizSelectionScreen onSelectGenre={handleGenreSelect} />;
    }
    // もし現在quiz画面ならQuizScreenコンポーネントを表示し、userNmaeプロップスにuserNameの値、genreプロップスにselectedGenreの値、onFinishプロップスにhandleQuizFinish関数を渡す
    if (currentScreen === 'quiz') {
      return (
        <QuizScreen
          userName={userName}
          genre={selectedGenre}
          onFinish={handleQuizFinish}
        />
      );
    }
    if (currentScreen === 'result') {
      return <QuizResultScreen userName={userName} score={score} onRestart={handleRestart} />;
    }
  };

  return <div className="App-container">{renderScreen()}</div>;
=======
import React from 'react'; // Reactをインポート
import './App.css'; // App全体のCSSをインポート
import Quiz from './components/Quiz'; // Quizコンポーネントをインポート

function App() {
  return (
    <div className="App">
      <h1>日本地理クイズ</h1> {/* アプリのタイトル */}
      <Quiz /> {/* Quizコンポーネントを表示する */}
    </div>
  );
>>>>>>> 37d5b90 (初期ファイルの作成)
}

export default App;
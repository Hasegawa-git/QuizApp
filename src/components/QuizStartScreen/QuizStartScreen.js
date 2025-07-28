//QuizStartScreen.js

import React, { useState } from 'react';
import './QuizStartScreen.css';

const QuizStartScreen = ({ onStart }) => {

    // 処理１：nameの状態を定義する
    const [name, setName] = useState('');

    // 処理２：handleSubmit関数を定義する
    const handleSubmit = () => {
        if (name.trim()) {
            onStart(name);
        }
    };

    //処理３：UIを返す
    return (
        <div className="start-container">
            <h1 className="app-title">たのしい４択クイズ</h1>
            <input
                type="text"
                placeholder="名前を入力してください"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="name-input"
            />
            <button onClick={handleSubmit} className="start-button">開始</button>
        </div>
    );
};

export default QuizStartScreen;

// ＜補足＞
// onStartプロップスは実質的なhandleStart関数である
// handleStart関数はApp.jsにおいて下記のように定義されている
//   const handleStart = (name) => {
//      setUserName(name);
//      setCurrentScreen('genreSelection');
//   };

// ＜全体の流れ＞
// 1. コンポーネントが描画される: App.jsが<QuizStartScreen />を呼び出すと、このコンポーネントが画面に表示される。このとき、nameは空の文字列（''）である。
// 2. ユーザーが名前を入力: ユーザーがinputに入力すると、onChangeイベントが発生し、setName関数が呼び出される。これにより、nameの状態が更新される。
// 3. 「開始」ボタンをクリック: ユーザーがボタンをクリックすると、onClickイベントが発生し、handleSubmit関数が実行される。
// 4. handleSubmitが親に連絡: handleSubmit関数内でonStart(name)が実行される。これは、App.jsのhandleStart(name)関数を呼び出すことになる。
// 5. 親が画面を切り替える: App.jsのhandleStart関数が実行され、setUserName(name)で名前が保存され、setCurrentScreen('genreSelection')で次の画面に切り替わる。
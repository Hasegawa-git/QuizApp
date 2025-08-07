import React, { useState } from 'react'; // React本体と、状態を管理するuseStateを読み込む
import quizData from '../data/quizData'; // 作成したクイズデータを読み込む
import './Quiz.css'; // このコンポーネント専用のスタイルシートを読み込む

function Quiz() { // Quizという名前のReactコンポーネントを定義する

  // --- コンポーネントの状態を管理する変数たち ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //   - currentQuestionIndex: 今何問目を表示しているかを示す数字 (初期値は0、つまり最初の問題)
  //   - setCurrentQuestionIndex: currentQuestionIndexの値を更新するための関数
  const [score, setScore] = useState(0);
  //   - score: プレイヤーの正解数 (初期値は0)
  //   - setScore: scoreの値を更新するための関数
  const [showScore, setShowScore] = useState(false);
  //   - showScore: クイズの結果画面を表示するかどうかを示す真偽値 (trueなら表示、falseならクイズ続行中)
  //   - setShowScore: showScoreの値を更新するための関数

  // --- 現在表示すべき問題のデータを取得する ---
  const currentQuestion = quizData[currentQuestionIndex];
  //   - quizData配列の中から、currentQuestionIndex番目のデータを取り出す

  // --- 選択肢がクリックされた時の処理 ---
  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }
    // 選択された選択肢(selectedOption)が、現在の問題の正解(currentQuestion.answer)と同じならscoreの値を+1して更新する

    const nextQuestionIndex = currentQuestionIndex + 1;
    // 今の問題番号に1を足して、次の問題の番号を計算
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      // 計算した次の問題の番号が、全問題数(quizData.length)よりも小さいならcurrentQuestionIndexを次の問題の番号に更新する
    } else {
      setShowScore(true);
    }
    // そうでない（＝もう次の問題がない）ならshowScoreをtrueにして、結果表示モードに切り替える
  };

  // --- 「もう一度プレイする」ボタンがクリックされた時の処理 ---
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0); // 問題の表示を最初（0番目）に戻す
    setScore(0); // スコアを0にリセットする
    setShowScore(false); // 結果表示モードを解除し、クイズ続行モードに戻す
  };

  // --- コンポーネントが画面に表示する内容（JSX） ---
  return (
    <div className="quiz-container"> {/* quiz-containerというクラス名を持つ一番外側の箱（HTMLのdivタグ） */}
      {/* showScore の値によって、表示する内容を切り替える */}
      {showScore ? ( // もしshowScoreがtrueなら（クイズが終了しているなら）
        // クイズ終了後のスコア表示セクション
        <div className="score-section"> {/* score-sectionというクラス名を持つ箱 */}
          <p>あなたのスコアは {score} 問中 {quizData.length} 問正解でした！</p>
          {/* 正解したスコアと、全問題数を表示する */}
          <button onClick={handleRestartQuiz}>もう一度プレイする</button> {/* もう一度プレイするボタン。クリックでhandleRestartQuiz関数が実行される */}
        </div>
      ) : ( // showScoreがfalseなら（クイズ続行中なら）
        // クイズ中の問題と選択肢表示セクション
        <> {/* フラグメント（複数の要素をグループ化するための見えないタグ） */}
          <div className="question-section"> {/* question-sectionというクラス名を持つ箱 */}
            <div className="question-count"> {/* question-countというクラス名を持つ箱 */}
              <span>質問 {currentQuestionIndex + 1}</span>/{quizData.length}
              {/* 「質問 1/3」のように、現在の問題番号と全問題数を表示 */}
            </div>
            <div className="question-text">{currentQuestion.question}</div> {/* 問題文を表示 */}
          </div>
          <div className="answer-section"> {/* answer-sectionというクラス名を持つ箱 */}
            {currentQuestion.options.map((option, index) => (
              // currentQuestion.options (選択肢の配列) の各要素(option)に対して、以下の<button>タグを生成する
              <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                {/* 各ボタンにユニークなkey(index)を設定。クリックでhandleAnswerOptionClick関数にその選択肢(option)を渡して実行する */}
                {option} {/* ボタンの表示テキストは選択肢の内容にする */}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz; // このQuizコンポーネントをエクスポートする
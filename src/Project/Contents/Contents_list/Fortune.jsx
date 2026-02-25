import React, { useState, useEffect, useRef } from 'react';
import './Contests_total.css'; // CSS 파일 임포트

const Fortune = () => {
  const sampleTexts = [
    "시작이 반이다.",
    "실패는 성공의 어머니이다.",
    "가는 말이 고와야 오는 말이 곱다.",
    "세 살 버릇 여든까지 간다.",
    "꿈을 크게 가져라, 깨져도 그 조각은 크다.",
    "고생 끝에 낙이 온다.",
    "천 리 길도 한 걸음부터.",
    "어제보다 나은 내일을 만들자.",
    "행복은 습관이다, 그것을 몸에 익혀라.",
    "작은 일에 최선을 다하는 사람이 큰일도 해낸다."
  ];

  const [text, setText] = useState(sampleTexts[0]);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (userInput.length > 0 && startTime) {
      const timeElapsed = (Date.now() - startTime) / 60000;
      const currentCpm = Math.round(userInput.length / timeElapsed);
      if (currentCpm > 0) setCpm(currentCpm);

      let correctChars = 0;
      const inputChars = userInput.split("");
      inputChars.forEach((char, i) => {
        if (char === text[i]) correctChars++;
      });
      setAccuracy(Math.round((correctChars / userInput.length) * 100));
    }
  }, [userInput, text, startTime]);

  const moveToNext = () => {
    const currentIndex = sampleTexts.indexOf(text);
    const nextIndex = (currentIndex + 1) % sampleTexts.length;
    
    setText(sampleTexts[nextIndex]);
    setUserInput("");
    setStartTime(null);
    setCpm(0);
    setAccuracy(100);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing) return;
      e.preventDefault();
      if (userInput.length > 0) {
        moveToNext();
      }
    }
  };

  return (
    <div className="typing-container">
      <h2 className="typing-title">한글 타이핑 연습</h2>

      <div className="stats-wrapper">
        <div className="stat-box">
          <span className="stat-label">현재 타수</span>
          <span className="stat-value">{cpm}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">정확도</span>
          <span className="stat-value">{accuracy}%</span>
        </div>
      </div>

      <div className="sentence-display">
        {text.split("").map((char, index) => {
          let charClass = "char-pending";
          if (index < userInput.length) {
            charClass = char === userInput[index] ? "char-correct" : "char-wrong";
          }
          return (
            <span 
              key={index} 
              className={`${charClass} ${index === userInput.length ? "char-current" : ""}`}
            >
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        ref={inputRef}
        className="typing-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="문장을 입력하고 Enter를 누르세요"
      />
    </div>
  );
};

export default Fortune;
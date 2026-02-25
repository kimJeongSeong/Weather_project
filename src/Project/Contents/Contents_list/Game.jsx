import React, { useEffect, useRef } from 'react';
import './Game.css';

const Game = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 이미지 로드
    const frogNormalImg = new Image();
    frogNormalImg.src = 'frog.png';
    const frogJumpImg = new Image();
    frogJumpImg.src = 'frog_jump.png';
    const cactusImg = new Image();
    cactusImg.src = 'rock.png';

    ctx.imageSmoothingEnabled = false;

    // --- [복구] 게임 변수 ---
    const floorY = 105;
    let gameSpeed = 3; 
    let score = 0;
    let highScore = localStorage.getItem('frogHighScore') || 0;
    let timer = 0;
    let nextCactusTimer = 120;
    let animation;
    let isGameOver = false;

    // --- [복구] 개구리 설정 ---
    const frog = {
      x: 35,
      y: floorY,
      width: 38,
      height: 30,
      jumpPower: 7,
      gravity: 1,
      jumpDuration: 9,
      jumpTimer: 0,
      isJumping: false,
      draw() {
        if (this.isJumping || this.y < floorY) {
          ctx.drawImage(frogJumpImg, this.x, this.y, this.width, this.height);
        } else {
          ctx.drawImage(frogNormalImg, this.x, this.y, this.width, this.height);
        }
      },
      update() {
        if (this.isJumping) {
          this.y -= this.jumpPower;
          this.jumpTimer++;
        } else if (this.y < floorY) {
          this.y += this.gravity;
        }

        if (this.jumpTimer > this.jumpDuration) {
          this.isJumping = false;
          this.jumpTimer = 0;
        }
        if (this.y > floorY) this.y = floorY;
      }
    };

    let cactuses = [];

    class Cactus {
      constructor() {
        this.x = canvas.width;
        this.y = floorY + 8;
        this.width = 30;
        this.height = 30;
      }
      draw() {
        ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
      }
    }

    function resetGame() {
      score = 0;
      timer = 0;
      cactuses = [];
      frog.y = floorY;
      frog.isJumping = false;
      frog.jumpTimer = 0;
      isGameOver = false;
      frameUpdate();
    }

    function drawUI() {
      ctx.fillStyle = '#333';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`Score: ${score}`, canvas.width - 20, 25);
      ctx.fillText(`HI: ${highScore}`, canvas.width - 20, 45);

      if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        
        ctx.font = 'bold 15px Arial';
        // 텍스트에서 Touch 관련 문구 제거
        ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 35);
      }
    }

    function frameUpdate() {
      if (isGameOver) return;

      animation = requestAnimationFrame(frameUpdate);
      timer++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timer > nextCactusTimer) {
        cactuses.push(new Cactus());
        nextCactusTimer = Math.floor(Math.random() * 100) + 150;
        timer = 0;
      }

      cactuses.forEach((cactus, index) => {
        if (cactus.x < -cactus.width) {
          cactuses.splice(index, 1);
          score++;
        }
        
        if (
          cactus.x < frog.x + frog.width - 12 &&
          cactus.x + cactus.width > frog.x + 12 &&
          cactus.y < frog.y + frog.height - 8
        ) {
          endGame();
        }

        let currentSpeed = gameSpeed + (score * 0.1);
        cactus.x -= currentSpeed;
        cactus.draw();
      });

      frog.update();
      frog.draw();
      drawUI();
    }

    function endGame() {
      isGameOver = true;
      cancelAnimationFrame(animation);
      
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('frogHighScore', highScore);
      }
      drawUI();
    }

    const performJump = () => {
      if (isGameOver) {
        resetGame();
      } else if (frog.y >= floorY - 2) {
        frog.isJumping = true;
      }
    };

    const handleKeyDown = (e) => {
      // 스페이스바나 화살표 위 키만 작동
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        // 게임 중 스페이스바를 누를 때 페이지가 아래로 스크롤되는 현상 방지
        e.preventDefault(); 
        performJump();
      }
    };

    // 터치 이벤트 관련 리스너 완전히 삭제
    window.addEventListener('keydown', handleKeyDown);
    
    frameUpdate();

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='frog_game_total'>
      <h1 style={{ textAlign: 'center' }}>Jumping Frog</h1>
      <div className='frog_game_window' style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        marginTop: '20px'
        // touchAction: 'none'은 유지하는 것이 좋습니다 (실수 터치 시 화면 밀림 방지)
      }}>
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={180} 
          style={{ 
            backgroundImage: `url('bac.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maxWidth: '95%',
            display: 'block',
            margin: '0 auto',
            width: '480px',
            height: '230px',
            imageRendering: 'pixelated',
          }} 
        />
      </div>
    </div>
  );
};

export default Game;
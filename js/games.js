// ============================================================================
// NEURAL ARCADE: PROFESSIONAL ENGINEERING & AI GAMES
// 1. RL Pong (Reinforcement Learning Agent Arena)
// 2. Vision Hunter (Computer Vision YOLO Reflex Lab)
// 3. Robo-Path Spline Navigator (Cubic Spline Mechatronics Puzzle)
// ============================================================================

class NeuralArcade {
  constructor() {
    this.activeGame = 'rl-pong';
    this.initRLPong();
    this.initVisionHunter();
    this.initRoboSpline();
  }

  // --------------------------------------------------------------------------
  // GAME 1: REINFORCEMENT LEARNING PONG (AGENT ARENA)
  // --------------------------------------------------------------------------
  initRLPong() {
    const canvas = document.getElementById('rl-pong-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 560;
    canvas.height = 340;

    const startBtn = document.getElementById('rl-pong-start');
    const resetBtn = document.getElementById('rl-pong-reset');
    const qUpElem = document.getElementById('rl-q-up');
    const qIdleElem = document.getElementById('rl-q-idle');
    const qDownElem = document.getElementById('rl-q-down');
    const rallyElem = document.getElementById('rl-rally');
    const scoreElem = document.getElementById('rl-score');

    let isRunning = false;
    let animId = null;

    // Game state
    const paddleHeight = 65;
    const paddleWidth = 10;
    let playerY = canvas.height / 2 - paddleHeight / 2;
    let aiY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballVx = 4.5;
    let ballVy = 2.5;
    let playerScore = 0;
    let aiScore = 0;
    let rallyCount = 0;

    // Simulated Q-Learning state
    let qUp = 0.32;
    let qIdle = 0.15;
    let qDown = 0.53;
    let epsilon = 0.08; // Exploration rate
    let aiLearningRate = 0.12;

    const resetBall = (direction = 1) => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballVx = (Math.random() > 0.5 ? 4.5 : -4.5) * direction;
      ballVy = (Math.random() - 0.5) * 5;
      rallyCount = 0;
      if (rallyElem) rallyElem.textContent = rallyCount;
    };

    // Keyboard and mouse controls
    let moveUp = false;
    let moveDown = false;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') moveUp = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') moveDown = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') moveUp = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') moveDown = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      const box = canvas.getBoundingClientRect();
      const mouseY = (e.clientY - box.top) * (canvas.height / box.height);
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, mouseY - paddleHeight / 2));
    });

    canvas.addEventListener('touchmove', (e) => {
      if (!e.touches[0]) return;
      e.preventDefault();
      const box = canvas.getBoundingClientRect();
      const touchY = (e.touches[0].clientY - box.top) * (canvas.height / box.height);
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, touchY - paddleHeight / 2));
    }, { passive: false });

    const update = () => {
      if (!isRunning) return;

      // Update Player with keys if used
      if (moveUp) playerY = Math.max(0, playerY - 6);
      if (moveDown) playerY = Math.min(canvas.height - paddleHeight, playerY + 6);

      // AI Reinforcement Learning Decision Policy
      const aiCenter = aiY + paddleHeight / 2;
      const targetDelta = ballY - aiCenter;

      // Q-value distribution calculation based on state feature (ball relative position and velocity)
      if (ballVx > 0) {
        // Ball approaching AI
        if (targetDelta < -15) {
          qUp = 0.72 + (Math.random() - 0.5) * 0.1;
          qIdle = 0.18;
          qDown = 0.10;
        } else if (targetDelta > 15) {
          qUp = 0.09;
          qIdle = 0.21;
          qDown = 0.70 + (Math.random() - 0.5) * 0.1;
        } else {
          qUp = 0.25;
          qIdle = 0.55;
          qDown = 0.20;
        }
      } else {
        // Ball receding: AI re-centers
        qUp = 0.33;
        qIdle = 0.34;
        qDown = 0.33;
      }

      // Action selection (Epsilon-Greedy)
      let action = 'idle';
      if (Math.random() < epsilon) {
        // Exploration
        const r = Math.random();
        action = r < 0.33 ? 'up' : r < 0.66 ? 'down' : 'idle';
      } else {
        // Exploitation of maximum Q
        if (qUp > qDown && qUp > qIdle) action = 'up';
        else if (qDown > qUp && qDown > qIdle) action = 'down';
        else action = 'idle';
      }

      // Execute AI action with smooth speed
      const aiSpeed = 4.6;
      if (action === 'up') aiY = Math.max(0, aiY - aiSpeed);
      if (action === 'down') aiY = Math.min(canvas.height - paddleHeight, aiY + aiSpeed);

      // Update telemetry display
      if (qUpElem) qUpElem.textContent = qUp.toFixed(2);
      if (qIdleElem) qIdleElem.textContent = qIdle.toFixed(2);
      if (qDownElem) qDownElem.textContent = qDown.toFixed(2);

      // Move Ball
      ballX += ballVx;
      ballY += ballVy;

      // Wall bounce (Top & Bottom)
      if (ballY <= 6 || ballY >= canvas.height - 6) {
        ballVy *= -1;
        if (window.soundFX) window.soundFX.playBounce();
      }

      // Player Paddle Collision (Left)
      const pLeft = 20;
      const pRight = pLeft + paddleWidth;
      if (ballX - 6 <= pRight && ballX + 6 >= pLeft) {
        if (ballY >= playerY && ballY <= playerY + paddleHeight) {
          ballX = pRight + 6;
          ballVx = Math.abs(ballVx) * 1.05; // accelerate slightly
          ballVy += (ballY - (playerY + paddleHeight / 2)) * 0.12;
          rallyCount++;
          if (rallyElem) rallyElem.textContent = rallyCount;
          if (window.soundFX) window.soundFX.playLaser();
        }
      }

      // AI Paddle Collision (Right)
      const aiLeft = canvas.width - 20 - paddleWidth;
      const aiRight = aiLeft + paddleWidth;
      if (ballX + 6 >= aiLeft && ballX - 6 <= aiRight) {
        if (ballY >= aiY && ballY <= aiY + paddleHeight) {
          ballX = aiLeft - 6;
          ballVx = -Math.abs(ballVx) * 1.05;
          ballVy += (ballY - (aiY + paddleHeight / 2)) * 0.12;
          rallyCount++;
          if (rallyElem) rallyElem.textContent = rallyCount;
          if (window.soundFX) window.soundFX.playBounce();
        }
      }

      // Score checks
      if (ballX < 0) {
        // AI scores
        aiScore++;
        if (window.soundFX) window.soundFX.playMiss();
        updateScore();
        resetBall(1);
      } else if (ballX > canvas.width) {
        // Player scores
        playerScore++;
        if (window.soundFX) window.soundFX.playScore();
        updateScore();
        resetBall(-1);
      }
    };

    const updateScore = () => {
      if (scoreElem) scoreElem.textContent = `${playerScore} : ${aiScore}`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background CRT Grid
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Center Court Dividing Line
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Player Paddle (Cyan)
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.9)';
      ctx.beginPath();
      ctx.roundRect(20, playerY, paddleWidth, paddleHeight, 4);
      ctx.fill();

      // Draw AI Paddle (Violet / Magenta)
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = 'rgba(168, 85, 247, 0.9)';
      ctx.beginPath();
      ctx.roundRect(canvas.width - 20 - paddleWidth, aiY, paddleWidth, paddleHeight, 4);
      ctx.fill();

      // Draw Ball (Glowing Emerald)
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = 'rgba(16, 185, 129, 0.9)';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Start screen overlay
      if (!isRunning) {
        ctx.fillStyle = 'rgba(7, 11, 20, 0.75)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('RL AGENT ARENA : Q-LEARNING PONG', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText('CLICK [START AGENT MATCH] OR PRESS W/S KEYS', canvas.width / 2, canvas.height / 2 + 15);
      }
    };

    const loop = () => {
      update();
      draw();
      animId = requestAnimationFrame(loop);
    };

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        isRunning = !isRunning;
        startBtn.textContent = isRunning ? 'PAUSE MATCH' : 'START AGENT MATCH';
        if (window.soundFX) window.soundFX.playPowerUp();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playerScore = 0;
        aiScore = 0;
        updateScore();
        resetBall();
        if (window.soundFX) window.soundFX.playClick();
      });
    }

    // Start loop
    draw();
    loop();
  }

  // --------------------------------------------------------------------------
  // GAME 2: VISION HUNTER (COMPUTER VISION YOLO REFLEX LAB)
  // --------------------------------------------------------------------------
  initVisionHunter() {
    const canvas = document.getElementById('vision-hunter-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 560;
    canvas.height = 340;

    const startBtn = document.getElementById('vision-start-btn');
    const scoreElem = document.getElementById('vision-score');
    const mAPElem = document.getElementById('vision-map');
    const timerElem = document.getElementById('vision-timer');

    let isPlaying = false;
    let targets = [];
    let score = 0;
    let detections = 0;
    let totalSpawned = 0;
    let timeLeft = 30;
    let timerInterval = null;

    const classNames = [
      { name: 'person', color: '#00f2fe', size: 55 },
      { name: 'satellite', color: '#f59e0b', size: 45 },
      { name: 'drone', color: '#10b981', size: 40 },
      { name: 'neural_anomaly', color: '#ec4899', size: 50 },
      { name: 'robot_arm', color: '#8b5cf6', size: 60 }
    ];

    const spawnTarget = () => {
      const cls = classNames[Math.floor(Math.random() * classNames.length)];
      totalSpawned++;
      targets.push({
        x: Math.random() * (canvas.width - cls.size - 40) + 20,
        y: Math.random() * (canvas.height - cls.size - 40) + 20,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        size: cls.size,
        cls: cls.name,
        color: cls.color,
        confidence: (0.85 + Math.random() * 0.14).toFixed(2),
        life: 180 // frames
      });
    };

    const endGame = () => {
      isPlaying = false;
      clearInterval(timerInterval);
      if (startBtn) startBtn.textContent = 'START SCAN SESSION';
      if (window.soundFX) window.soundFX.playPowerUp();
    };

    canvas.addEventListener('click', (e) => {
      if (!isPlaying) return;
      const box = canvas.getBoundingClientRect();
      const clickX = (e.clientX - box.left) * (canvas.width / box.width);
      const clickY = (e.clientY - box.top) * (canvas.height / box.height);

      let hit = false;
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        if (
          clickX >= t.x &&
          clickX <= t.x + t.size &&
          clickY >= t.y &&
          clickY <= t.y + t.size
        ) {
          // Bounding Box Captured!
          hit = true;
          score += Math.round(parseFloat(t.confidence) * 100);
          detections++;
          targets.splice(i, 1);
          if (window.soundFX) window.soundFX.playLaser();
          break;
        }
      }

      if (!hit && window.soundFX) {
        window.soundFX.playBounce();
      }

      if (scoreElem) scoreElem.textContent = score;
      if (mAPElem) {
        const mAP = totalSpawned > 0 ? ((detections / totalSpawned) * 100).toFixed(1) : 0;
        mAPElem.textContent = `${mAP}%`;
      }
    });

    const update = () => {
      if (!isPlaying) return;

      // Spawn periodically
      if (Math.random() < 0.04 && targets.length < 6) {
        spawnTarget();
      }

      // Update targets
      for (let i = targets.length - 1; i >= 0; i--) {
        const t = targets[i];
        t.x += t.vx;
        t.y += t.vy;
        t.life--;

        // Bounce boundaries
        if (t.x < 10 || t.x + t.size > canvas.width - 10) t.vx *= -1;
        if (t.y < 10 || t.y + t.size > canvas.height - 10) t.vy *= -1;

        if (t.life <= 0) {
          targets.splice(i, 1);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Night Vision / CV Thermal Sensor Background
      ctx.fillStyle = '#080c16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scanning HUD Line
      const scanY = (Date.now() * 0.1) % canvas.height;
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(canvas.width, scanY);
      ctx.stroke();

      // Draw bounding box targets
      targets.forEach(t => {
        ctx.strokeStyle = t.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(0, 242, 254, 0.06)';

        // Bounding box rect
        ctx.strokeRect(t.x, t.y, t.size, t.size);
        ctx.fillRect(t.x, t.y, t.size, t.size);

        // Corner crosshairs
        const cLen = 7;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Top-left
        ctx.moveTo(t.x, t.y + cLen); ctx.lineTo(t.x, t.y); ctx.lineTo(t.x + cLen, t.y);
        // Top-right
        ctx.moveTo(t.x + t.size - cLen, t.y); ctx.lineTo(t.x + t.size, t.y); ctx.lineTo(t.x + t.size, t.y + cLen);
        // Bottom-left
        ctx.moveTo(t.x, t.y + t.size - cLen); ctx.lineTo(t.x, t.y + t.size); ctx.lineTo(t.x + cLen, t.y + t.size);
        // Bottom-right
        ctx.moveTo(t.x + t.size - cLen, t.y + t.size); ctx.lineTo(t.x + t.size, t.y + t.size); ctx.lineTo(t.x + t.size, t.y + t.size - cLen);
        ctx.stroke();

        // Label Tag
        ctx.fillStyle = t.color;
        ctx.fillRect(t.x, t.y - 15, ctx.measureText(`${t.cls} ${t.confidence}`).width + 10, 15);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`${t.cls} ${t.confidence}`, t.x + 3, t.y - 4);
      });

      if (!isPlaying) {
        ctx.fillStyle = 'rgba(8, 12, 22, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('NEURALLENS : OBJECT DETECTION REFLEX LAB', canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px monospace';
        ctx.fillText('CLICK BOUNDING BOXES BEFORE THEY ESCAPE • 30S ATTACK', canvas.width / 2, canvas.height / 2 + 15);
      }
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    if (startBtn) {
      startBtn.addEventListener('click', () => {
        if (isPlaying) {
          endGame();
          return;
        }

        isPlaying = true;
        score = 0;
        detections = 0;
        totalSpawned = 0;
        timeLeft = 30;
        targets = [];
        startBtn.textContent = 'ABORT SCAN';
        if (timerElem) timerElem.textContent = `${timeLeft}s`;
        if (scoreElem) scoreElem.textContent = score;
        if (mAPElem) mAPElem.textContent = '100%';

        if (window.soundFX) window.soundFX.playPowerUp();

        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
          timeLeft--;
          if (timerElem) timerElem.textContent = `${timeLeft}s`;
          if (timeLeft <= 0) {
            endGame();
          }
        }, 1000);
      });
    }

    draw();
    loop();
  }

  // --------------------------------------------------------------------------
  // GAME 3: ROBO-PATH SPLINE NAVIGATOR (CUBIC SPLINE MECHATRONICS PUZZLE)
  // --------------------------------------------------------------------------
  initRoboSpline() {
    const canvas = document.getElementById('robo-spline-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 560;
    canvas.height = 340;

    const launchBtn = document.getElementById('spline-launch-btn');
    const resetBtn = document.getElementById('spline-reset-btn');
    const statusElem = document.getElementById('spline-status');

    // Waypoints for Cubic Spline (User can drag P1 and P2)
    const pStart = { x: 50, y: 170 };
    const pEnd = { x: canvas.width - 50, y: 170 };
    let p1 = { x: 180, y: 80 };
    let p2 = { x: 380, y: 260 };
    let draggingPoint = null;

    // Obstacles
    const obstacles = [
      { x: 190, y: 170, radius: 36, label: 'OBSTACLE_A' },
      { x: 370, y: 140, radius: 34, label: 'OBSTACLE_B' }
    ];

    // Rover simulation state
    let roverProgress = 0;
    let isNavigating = false;
    let roverPos = { x: pStart.x, y: pStart.y };

    // Cubic Bezier interpolation
    const getBezierPoint = (t, p0, p1, p2, p3) => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
      };
    };

    const checkCollision = (pt) => {
      for (const obs of obstacles) {
        const dx = pt.x - obs.x;
        const dy = pt.y - obs.y;
        if (Math.sqrt(dx * dx + dy * dy) < obs.radius + 12) {
          return true;
        }
      }
      return false;
    };

    canvas.addEventListener('mousedown', (e) => {
      const box = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - box.left) * (canvas.width / box.width);
      const mouseY = (e.clientY - box.top) * (canvas.height / box.height);

      if (Math.hypot(mouseX - p1.x, mouseY - p1.y) < 18) {
        draggingPoint = p1;
      } else if (Math.hypot(mouseX - p2.x, mouseY - p2.y) < 18) {
        draggingPoint = p2;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!draggingPoint) return;
      const box = canvas.getBoundingClientRect();
      draggingPoint.x = Math.max(20, Math.min(canvas.width - 20, (e.clientX - box.left) * (canvas.width / box.width)));
      draggingPoint.y = Math.max(20, Math.min(canvas.height - 20, (e.clientY - box.top) * (canvas.height / box.height)));
    });

    window.addEventListener('mouseup', () => {
      draggingPoint = null;
    });

    const update = () => {
      if (!isNavigating) return;

      roverProgress += 0.008;
      roverPos = getBezierPoint(roverProgress, pStart, p1, p2, pEnd);

      // Check collision
      if (checkCollision(roverPos)) {
        isNavigating = false;
        if (statusElem) {
          statusElem.textContent = 'COLLISION DETECTED! ADJUST SPLINE WAYPOINTS';
          statusElem.className = 'text-xs font-mono font-bold text-red-400';
        }
        if (window.soundFX) window.soundFX.playMiss();
        return;
      }

      if (roverProgress >= 1) {
        roverProgress = 1;
        isNavigating = false;
        if (statusElem) {
          statusElem.textContent = 'DOCKING SUCCESS! 100% C2 CONTINUITY ACHIEVED';
          statusElem.className = 'text-xs font-mono font-bold text-emerald-400';
        }
        if (window.soundFX) window.soundFX.playScore();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Draw Obstacles
      obstacles.forEach(obs => {
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f87171';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(obs.label, obs.x, obs.y + 3);
      });

      // Draw Control Polygons (dotted lines)
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Cubic Spline Curve
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.7)';
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      for (let t = 0; t <= 1; t += 0.02) {
        const pt = getBezierPoint(t, pStart, p1, p2, pEnd);
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Start & End Stations
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(pStart.x, pStart.y, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pEnd.x, pEnd.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Draw Draggable Waypoint Handles (P1, P2)
      [p1, p2].forEach((p, idx) => {
        ctx.fillStyle = '#07090e';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`WP${idx + 1}`, p.x, p.y + 3);
      });

      // Draw Rover
      ctx.fillStyle = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0, 242, 254, 1)';
      ctx.beginPath();
      ctx.arc(roverPos.x, roverPos.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const loop = () => {
      update();
      draw();
      requestAnimationFrame(loop);
    };

    if (launchBtn) {
      launchBtn.addEventListener('click', () => {
        isNavigating = true;
        roverProgress = 0;
        if (statusElem) {
          statusElem.textContent = 'SIMULATING AUTONOMOUS TRAJECTORY...';
          statusElem.className = 'text-xs font-mono font-bold text-cyan-400 animate-pulse';
        }
        if (window.soundFX) window.soundFX.playLaser();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        isNavigating = false;
        roverProgress = 0;
        roverPos = { x: pStart.x, y: pStart.y };
        p1 = { x: 180, y: 80 };
        p2 = { x: 380, y: 260 };
        if (statusElem) {
          statusElem.textContent = 'DRAG WAYPOINTS (WP1, WP2) TO CLEAR OBSTACLES';
          statusElem.className = 'text-xs font-mono text-gray-400';
        }
        if (window.soundFX) window.soundFX.playClick();
      });
    }

    draw();
    loop();
  }
}

window.NeuralArcade = NeuralArcade;

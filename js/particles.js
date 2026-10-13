// ============================================================================
// NEURAL NETWORK INTERACTIVE PARTICLE CANVAS
// Simulates synapsing neural networks with cursor interactivity
// ============================================================================

class NeuralCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.maxParticles = 65;
    this.connectionDistance = 140;

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  init() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 18000), this.maxParticles);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    window.addEventListener('click', (e) => {
      // Create a synaptic pulse burst on click
      for (let i = 0; i < 5; i++) {
        if (this.particles.length < this.maxParticles + 15) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          this.particles.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 2.5 + 1.5,
            pulseSpeed: 0.05,
            pulseOffset: 0,
            baseAlpha: 0.9,
            temporary: true,
            life: 100
          });
        }
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const time = Date.now() * 0.002;

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Bounce at screen boundaries
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse attraction / repulsion
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 0.04;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }
      }

      // Handle temporary particles
      if (p.temporary) {
        p.life--;
        p.baseAlpha = (p.life / 100) * 0.9;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      }

      // Draw particle with pulsing glow
      const alpha = Math.max(0.1, p.baseAlpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.2);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 242, 254, ${alpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = 'rgba(0, 242, 254, 0.6)';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // Connect particles with synapsing axon lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const lineAlpha = (1 - dist / this.connectionDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);

          // Subtle gradient connection
          const grad = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, `rgba(0, 242, 254, ${lineAlpha})`);
          grad.addColorStop(1, `rgba(138, 43, 226, ${lineAlpha})`);

          this.ctx.strokeStyle = grad;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();

          // Occasional synapsing data packet transmission
          if ((i + j) % 7 === 0) {
            const progress = (Math.sin(time * 1.5 + (i * 0.5)) + 1) / 2;
            const packetX = p1.x + (p2.x - p1.x) * progress;
            const packetY = p1.y + (p2.y - p1.y) * progress;

            this.ctx.beginPath();
            this.ctx.arc(packetX, packetY, 1.4, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${lineAlpha * 1.8})`;
            this.ctx.fill();
          }
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

window.NeuralCanvas = NeuralCanvas;

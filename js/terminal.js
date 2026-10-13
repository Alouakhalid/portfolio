// ============================================================================
// CYBER AI SHELL INTERACTIVE HUD TERMINAL
// Embedded UNIX / AI command-line interface with interactive utilities
// ============================================================================

class CyberTerminal {
  constructor(containerId, inputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.history = [];
    this.historyIndex = -1;
    this.matrixRunning = false;
    this.matrixInterval = null;

    if (this.input && this.container) {
      this.init();
    }
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      if (window.soundFX) window.soundFX.playKeypress();

      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        this.input.value = '';
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Welcome banner
    this.print(`
<span class="text-cyan-400 font-bold">╔═══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400 font-bold">║  ALI KHALID :: AI & ROBOTICS RESEARCH SHELL [v3.0.4-LTS]     ║</span>
<span class="text-cyan-400 font-bold">╚═══════════════════════════════════════════════════════════════╝</span>
Type <span class="text-emerald-400 font-bold font-mono">'help'</span> for command list, or <span class="text-purple-400 font-bold font-mono">'models'</span>, <span class="text-amber-400 font-bold font-mono">'thesis'</span>, <span class="text-pink-400 font-bold font-mono">'matrix'</span>.
`);
  }

  print(html) {
    const line = document.createElement('div');
    line.className = 'terminal-line my-1 font-mono text-xs leading-relaxed';
    line.innerHTML = html;
    this.container.appendChild(line);
    this.container.scrollTop = this.container.scrollHeight;
  }

  execute(rawCmd) {
    // Print command prompt echo
    this.print(`<span class="text-cyan-400 font-bold">ali-khalid@ai-core:~$</span> <span class="text-white">${rawCmd}</span>`);

    const parts = rawCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        this.print(`
<span class="text-cyan-300 font-bold">AVAILABLE COMMANDS:</span>
  <span class="text-emerald-400 font-bold">help</span>               - Display available commands
  <span class="text-emerald-400 font-bold">about</span>              - Display executive profile & research domain
  <span class="text-emerald-400 font-bold">models</span>             - List production Hugging Face models & telemetry
  <span class="text-emerald-400 font-bold">thesis</span>             - Review E-JUST modular robotic arm thesis details
  <span class="text-emerald-400 font-bold">skills</span>             - Output technical competency matrix
  <span class="text-emerald-400 font-bold">experience</span>         - Print verified professional timeline
  <span class="text-emerald-400 font-bold">predict &lt;text&gt;</span>     - Run simulated transformer visual inference
  <span class="text-emerald-400 font-bold">theme &lt;name&gt;</span>       - Switch HUD palette (cyan, violet, emerald, amber)
  <span class="text-emerald-400 font-bold">matrix</span>             - Toggle Matrix digital rain animation
  <span class="text-emerald-400 font-bold">contact</span>            - Print secure communication endpoints
  <span class="text-emerald-400 font-bold">clear</span>              - Clear terminal display buffer
`);
        break;

      case 'about':
        this.print(`
<span class="text-cyan-300 font-bold">ALI KHALID</span> — AI Engineer & Deep Learning Researcher
• Location: Cairo, Egypt
• Education: B.Sc. in Mechatronics Engineering, Egypt-Japan University of Science & Technology (E-JUST)
• Specialization: Multilingual NLP, Arabic OCR Transformers, Computer Vision, Reinforcement Learning, Robotic Manipulator Control.
• Accomplishments: ECPC Finalist (61st out of 600+ teams), 1,200+ Hugging Face Model Downloads.
`);
        break;

      case 'models':
        this.print(`
<span class="text-cyan-300 font-bold">HUGGING FACE MODEL REGISTRY:</span>
┌─────────────────────────────┬─────────────────┬──────────────┬───────────────┐
│ <span class="text-white font-bold">Model Name</span>                  │ <span class="text-white font-bold">Architecture</span>    │ <span class="text-white font-bold">Downloads</span>    │ <span class="text-white font-bold">Domain</span>          │
├─────────────────────────────┼─────────────────┼──────────────┼───────────────┤
│ Ali0044/LinguaFlow          │ Transformer NMT │ 318+         │ EN/AR/JA NMT  │
│ Ali0044/Qalam-Net           │ ViT Handwritten │ 253+         │ Arabic OCR    │
│ Ali0044/Qalam_Net_V2        │ CNN-ViT Hybrid  │ SOTA         │ Printed OCR   │
│ Ali0044/qwen-medical-chatbot│ Qwen LoRA LLM   │ Specialized  │ Medical QA    │
│ TrOCR 0.3B                  │ Vision-Language │ 300M Params  │ Document OCR  │
│ Image-Text-to-Text          │ Multimodal VQA  │ 70+          │ Vision-Lang   │
└─────────────────────────────┴─────────────────┴──────────────┴───────────────┘
`);
        break;

      case 'thesis':
        this.print(`
<span class="text-amber-400 font-bold">E-JUST MECHATRONICS THESIS SPECIFICATION:</span>
• Title: Modular Control Architecture for 3-DOF Robotic Manipulators
• Institution: Egypt-Japan University of Science and Technology (E-JUST)
• Department: Mechatronics & Robotics Engineering
• Benchmark Achievement: <span class="text-emerald-400 font-bold">+15% Positioning Precision Improvement</span> vs traditional PID controllers.
• Mathematical Foundation: Analytical & CCD Inverse Kinematics, C² Continuous Cubic Spline Trajectory Smoothing, Jerk Minimization.
• GitHub: <a href="https://github.com/Alouakhalid/Robotics-Arm" target="_blank" class="underline text-cyan-300">github.com/Alouakhalid/Robotics-Arm</a>
`);
        break;

      case 'skills':
        this.print(`
<span class="text-cyan-300 font-bold">TECHNICAL COMPETENCY MATRIX:</span>
[Deep Learning]        ████████████████████ 98%  (PyTorch, TensorFlow, Hugging Face)
[NLP & Transformers]   ███████████████████░ 95%  (BERT, GPT, TrOCR, NMT, Tokenization)
[Computer Vision]      ██████████████████░░ 92%  (ViT, CNNs, YOLO, OpenCV, Diffusion)
[Robotics & Control]   █████████████████░░░ 89%  (C++, Inverse Kinematics, Splines, ROS)
[Algorithms & Math]    ████████████████████ 98%  (ECPC Finalist, Graph Theory, Dynamic Prog)
`);
        break;

      case 'experience':
        this.print(`
<span class="text-cyan-300 font-bold">CAREER HISTORY:</span>
• <span class="text-white font-bold">Outlier AI</span> (Jan 2023 – Present): AI Engineer & Machine Learning Specialist
• <span class="text-white font-bold">Upwork</span> (Jun 2021 – Present): Data Scientist & ML Consultant (Top Rated)
• <span class="text-white font-bold">NTI</span> (Aug 2025): NLP Engineer Intern [Assessment Score: 97.8%]
• <span class="text-white font-bold">NAID</span> (Jul 2025 – Sep 2025): Computer Vision Engineer Intern
• <span class="text-white font-bold">ITI</span> (Aug 2025): AI Engineer Intern
`);
        break;

      case 'predict':
        const inputStr = args.join(' ') || 'علي خالد';
        this.print(`
<span class="text-cyan-400 font-mono">[INFERENCE PIPELINE LAUNCHED]</span>
• Loading Weights: <span class="text-gray-300">Ali0044/Qalam_Net_V2</span>
• Attention Heads: <span class="text-gray-300">12 Multi-Head Self-Attention layers</span>
• Token Input: <span class="text-cyan-300">"${inputStr}"</span>
• Character Segmentation: <span class="text-emerald-400">${inputStr.split('').join(' ')}</span>
• Logit Confidence: <span class="text-emerald-400">99.4%</span>
• Latency: <span class="text-purple-400">11.8ms</span>
`);
        if (window.soundFX) window.soundFX.playScore();
        break;

      case 'theme':
        const theme = args[0] ? args[0].toLowerCase() : '';
        if (['cyan', 'violet', 'emerald', 'amber'].includes(theme)) {
          if (window.ThemeManager) {
            window.ThemeManager.setTheme(theme);
            this.print(`<span class="text-emerald-400 font-bold">Theme updated to: ${theme.toUpperCase()}</span>`);
          }
        } else {
          this.print(`<span class="text-red-400">Usage: theme &lt;cyan | violet | emerald | amber&gt;</span>`);
        }
        break;

      case 'matrix':
        this.toggleMatrixRain();
        break;

      case 'contact':
        this.print(`
<span class="text-cyan-300 font-bold">TRANSMISSION CHANNELS:</span>
• Email:    <a href="mailto:ali88883737@gmail.com" class="text-cyan-400 underline">ali88883737@gmail.com</a>
• Phone:    <a href="tel:+201020456053" class="text-cyan-400">+20 102 045 6053</a>
• LinkedIn: <a href="https://www.linkedin.com/in/ali-khalid-ali-khalid-85468225b/" target="_blank" class="text-cyan-400 underline">linkedin.com/in/ali-khalid-ali-khalid-85468225b</a>
• GitHub:   <a href="https://github.com/Alouakhalid" target="_blank" class="text-cyan-400 underline">github.com/Alouakhalid</a>
• HF:       <a href="https://huggingface.co/Ali0044" target="_blank" class="text-cyan-400 underline">huggingface.co/Ali0044</a>
`);
        break;

      case 'clear':
        this.container.innerHTML = '';
        break;

      default:
        this.print(`<span class="text-red-400">Command not recognized: '${command}'. Type <span class="text-emerald-400 font-bold">'help'</span> for instructions.</span>`);
        break;
    }
  }

  toggleMatrixRain() {
    this.matrixRunning = !this.matrixRunning;
    if (this.matrixRunning) {
      this.print(`<span class="text-emerald-400 font-bold font-mono">[MATRIX DIGITAL RAIN PROTOCOL INITIALIZED]</span>`);
      let count = 0;
      this.matrixInterval = setInterval(() => {
        const glyphs = '01ｱｲｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾔﾕﾗﾘﾜQALAMNETVISIONAI9876543210';
        let line = '';
        for (let i = 0; i < 48; i++) {
          line += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        this.print(`<span class="text-emerald-500 font-mono text-[11px] opacity-80">${line}</span>`);
        count++;
        if (count > 15) {
          clearInterval(this.matrixInterval);
          this.matrixRunning = false;
        }
      }, 70);
    }
  }
}

window.CyberTerminal = CyberTerminal;

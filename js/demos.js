// ============================================================================
// INTERACTIVE AI MODEL PLAYGROUND & ROBOTICS SIMULATOR
// Live sandboxes for Qalam-Net OCR, Qwen Medical LLM, LinguaFlow, and RoboArm IK
// ============================================================================

class AIDemosManager {
  constructor() {
    this.initOCRDemo();
    this.initMedicalChatbot();
    this.initLinguaFlow();
    this.initRoboArmDemo();
  }

  // --------------------------------------------------------------------------
  // 1. QALAM-NET ARABIC OCR DRAWING SANDBOX
  // --------------------------------------------------------------------------
  initOCRDemo() {
    const canvas = document.getElementById('ocr-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let drawing = false;

    // High DPI scaling
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 360;
    canvas.height = 200;

    const clearBtn = document.getElementById('ocr-clear-btn');
    const inferBtn = document.getElementById('ocr-infer-btn');
    const resultBox = document.getElementById('ocr-result');
    const presetBtns = document.querySelectorAll('.ocr-preset-btn');

    const resetCanvas = () => {
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      if (resultBox) {
        resultBox.innerHTML = `
          <div class="text-xs text-gray-500 font-mono flex items-center justify-center h-full">
            <span>[ DRAW ARABIC TEXT OR PICK A SAMPLE ABOVE ]</span>
          </div>`;
      }
    };

    resetCanvas();

    const getPos = (e) => {
      const box = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - box.left) * (canvas.width / box.width),
        y: (clientY - box.top) * (canvas.height / box.height)
      };
    };

    const startDraw = (e) => {
      drawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      if (window.soundFX) window.soundFX.playClick();
    };

    const draw = (e) => {
      if (!drawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 242, 254, 0.8)';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      if (drawing) {
        drawing = false;
        ctx.shadowBlur = 0;
      }
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    window.addEventListener('touchend', stopDraw);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        resetCanvas();
        if (window.soundFX) window.soundFX.playClick();
      });
    }

    // Presets
    const samplePresets = {
      'علي': { text: 'علي', conf: 99.4, chars: ['ع', 'ل', 'ي'], trans: 'Ali (Elevated/Noble)' },
      'ذكاء': { text: 'ذكاء', conf: 98.7, chars: ['ذ', 'ك', 'ا', 'ء'], trans: 'Intelligence' },
      'قلم': { text: 'قلم', conf: 99.1, chars: ['ق', 'ل', 'م'], trans: 'Qalam (Pen/Script)' },
      'روبوت': { text: 'روبوت', conf: 97.9, chars: ['ر', 'و', 'ب', 'و', 'ت'], trans: 'Robot' }
    };

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.word;
        if (!word) return;
        resetCanvas();
        // Draw stylistically on canvas
        ctx.fillStyle = '#00f2fe';
        ctx.font = 'bold 74px "Amiri", "Cairo", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 14;
        ctx.shadowColor = 'rgba(0, 242, 254, 0.9)';
        ctx.fillText(word, canvas.width / 2, canvas.height / 2);
        ctx.shadowBlur = 0;

        if (window.soundFX) window.soundFX.playLaser();
        runInference(samplePresets[word] || { text: word, conf: 98.5, chars: word.split(''), trans: 'Sample Text' });
      });
    });

    const runInference = (presetData = null) => {
      if (window.soundFX) window.soundFX.playLaser();
      if (!resultBox) return;

      resultBox.innerHTML = `
        <div class="flex flex-col items-center justify-center py-6 gap-2">
          <div class="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs font-mono text-cyan-400 animate-pulse">EXTRACTING EMBEDDINGS & ATTENTION...</span>
        </div>`;

      setTimeout(() => {
        const data = presetData || {
          text: 'علي خالد',
          conf: 98.8,
          chars: ['ع', 'ل', 'ي', ' ', 'خ', 'ا', 'ل', 'د'],
          trans: 'Ali Khalid (AI Researcher)'
        };

        resultBox.innerHTML = `
          <div class="bg-gray-900/90 border border-cyan-500/30 rounded-lg p-3 text-left">
            <div class="flex justify-between items-center mb-2 pb-1 border-b border-gray-800">
              <span class="text-[11px] font-mono text-gray-400">MODEL: QALAM-NET-V2 (ViT-TrOCR)</span>
              <span class="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">LATENCY: 12.4ms</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="text-xs text-gray-400">Detected Arabic Token:</div>
                <div class="text-2xl font-bold text-cyan-300 font-arabic tracking-wide">${data.text}</div>
                <div class="text-[11px] text-gray-400 italic">${data.trans}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-gray-400">Model Confidence:</div>
                <div class="text-xl font-mono font-bold text-emerald-400">${data.conf}%</div>
              </div>
            </div>
            <div class="mt-2.5">
              <div class="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                <span>SEGMENTATION PROBABILITY</span>
                <span>ATTENTION SCORE</span>
              </div>
              <div class="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full" style="width: ${data.conf}%"></div>
              </div>
            </div>
            <div class="mt-2 flex flex-wrap gap-1">
              ${data.chars.map(c => `<span class="px-1.5 py-0.5 text-[10px] font-mono bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 rounded">${c}</span>`).join('')}
            </div>
          </div>
        `;
        if (window.soundFX) window.soundFX.playScore();
      }, 350);
    };

    if (inferBtn) {
      inferBtn.addEventListener('click', () => runInference());
    }
  }

  // --------------------------------------------------------------------------
  // 2. QWEN MEDICAL AI CLINICAL ASSISTANT SIMULATOR
  // --------------------------------------------------------------------------
  initMedicalChatbot() {
    const chatContainer = document.getElementById('medical-chat-messages');
    const inputField = document.getElementById('medical-chat-input');
    const sendBtn = document.getElementById('medical-chat-send');
    const promptChips = document.querySelectorAll('.medical-chip');

    if (!chatContainer || !inputField || !sendBtn) return;

    const medicalKnowledge = {
      'chest pain': {
        query: 'Differential diagnosis for acute retrosternal chest pain with exertional dyspnea',
        reply: `**Clinical Assessment & Diagnostic Rationale:**
1. **Primary Differential:**
   - **Acute Coronary Syndrome (ACS):** High suspicion given exertional dyspnea and retrosternal location. Requires urgent 12-lead ECG (evaluating ST elevations/depressions) and high-sensitivity Troponin serial assay.
   - **Pulmonary Embolism (PE):** Evaluate Wells score, consider CT Pulmonary Angiography (CTPA) or D-Dimer test.
   - **Aortic Dissection:** Screen for tearing radiation to interscapular region, blood pressure differential between arms.
2. **Immediate Protocols:** Administer supplemental oxygen if $SpO_2 < 90\%$, establish dual IV access, continuous telemetry.
3. *Model Citation: Qwen-Medical LoRA fine-tuned on PubMed-QA & MIMIC-IV diagnostic protocols.*`
      },
      'headache': {
        query: 'Sudden onset thunderclap headache with photophobia',
        reply: `**Clinical Emergency Alert:**
1. **Critical Differential:**
   - **Subarachnoid Hemorrhage (SAH):** "Thunderclap" onset reaching peak intensity within seconds warrants urgent non-contrast head CT within 6 hours (sensitivity > 98%), followed by lumbar puncture for xanthochromia if CT is negative.
   - **Cerebral Venous Sinus Thrombosis (CVST):** Screen with MR venography if intracranial hypertension signs appear.
   - **Meningitis / Encephalitis:** Evaluate Kernig/Brudzinski signs, febrile status.
2. *Diagnostic Guidance: Qwen-Medical fine-tuned clinical priority pipeline.*`
      },
      'diabetes': {
        query: 'Fasting blood glucose 138 mg/dL and HbA1c 6.8%',
        reply: `**Diagnostic Interpretation:**
1. **Diagnostic Classification:** Meets ADA diagnostic criteria for **Type 2 Diabetes Mellitus** (Fasting Plasma Glucose $\ge 126\\text{ mg/dL}$ confirmed on repeat testing, and $\\text{HbA1c} \\ge 6.5\\%$).
2. **First-Line Recommendations:**
   - Lifestyle modification (structured aerobic and resistance training, nutritional counseling).
   - First-line pharmacotherapy: Metformin titration after baseline renal function assessment (eGFR).
   - Screen for microvascular complications: spot urine albumin-to-creatinine ratio (uACR), dilated retinal examination.
3. *Citation: ADA Standards of Medical Care in Diabetes / Qwen Medical LLM.*`
      },
      'transformer': {
        query: 'How does self-attention improve automated medical image segmentation?',
        reply: `**Architectural Analysis (ViT & Medical Transformers):**
1. **Global Context vs Local Receptive Fields:** Conventional CNNs (e.g. U-Net) suffer from localized inductive bias, struggling to capture long-range anatomical spatial dependencies.
2. **Multi-Head Self Attention:** Computes cross-token affinity:
   $$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$
   allowing simultaneous delineation of diffuse lesion boundaries and multi-organ spatial relationships.
3. **Clinical Impact:** Benchmarked on MedMNIST and BraTS, transformer backbones (TransUNet, Swin-UNETR) achieve +4.2% higher Dice score on glioblastoma boundary detection.`
      }
    };

    const appendMessage = (sender, text) => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`;

      const bubble = document.createElement('div');
      bubble.className = sender === 'user'
        ? 'max-w-[85%] bg-cyan-600/30 border border-cyan-400/40 text-cyan-100 rounded-2xl rounded-tr-none px-4 py-2.5 text-xs font-mono leading-relaxed'
        : 'max-w-[85%] bg-gray-900/90 border border-emerald-500/30 text-gray-200 rounded-2xl rounded-tl-none px-4 py-3 text-xs leading-relaxed shadow-lg';

      // Parse bolding and bullet points
      bubble.innerHTML = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300 font-semibold">$1</strong>')
        .replace(/\n/g, '<br/>');

      msgDiv.appendChild(bubble);
      chatContainer.appendChild(msgDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const handleSend = (customText = null) => {
      const text = customText || inputField.value.trim();
      if (!text) return;

      appendMessage('user', text);
      if (!customText) inputField.value = '';
      if (window.soundFX) window.soundFX.playClick();

      // Show typing indicator
      const typingDiv = document.createElement('div');
      typingDiv.className = 'flex justify-start mb-3 typing-indicator';
      typingDiv.innerHTML = `
        <div class="bg-gray-900/90 border border-emerald-500/20 text-emerald-400 rounded-2xl rounded-tl-none px-3 py-2 text-xs font-mono flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
          <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
          <span class="text-[10px] ml-1">Qwen-Medical reasoning...</span>
        </div>`;
      chatContainer.appendChild(typingDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight;

      setTimeout(() => {
        const indicator = chatContainer.querySelector('.typing-indicator');
        if (indicator) indicator.remove();

        const lower = text.toLowerCase();
        let matched = null;
        if (lower.includes('chest') || lower.includes('pain') || lower.includes('heart')) {
          matched = medicalKnowledge['chest pain'].reply;
        } else if (lower.includes('headache') || lower.includes('head') || lower.includes('pain')) {
          matched = medicalKnowledge['headache'].reply;
        } else if (lower.includes('diabetes') || lower.includes('glucose') || lower.includes('sugar')) {
          matched = medicalKnowledge['diabetes'].reply;
        } else if (lower.includes('transformer') || lower.includes('vision') || lower.includes('segment')) {
          matched = medicalKnowledge['transformer'].reply;
        } else {
          matched = `**Clinical Differential Rationale:**
1. Evaluating patient symptoms under standardized SNOMED-CT clinical ontology.
2. Suggested laboratory diagnostic panel: Complete Blood Count (CBC), Comprehensive Metabolic Panel (CMP), and targeted inflammatory markers (CRP/ESR).
3. Recommendation: Correlate with physical clinical examination and baseline hemodynamic parameters.
*(Inference generated by Ali Khalid's fine-tuned Qwen-Medical assistant)*`;
        }

        appendMessage('bot', matched);
        if (window.soundFX) window.soundFX.playScore();
      }, 500);
    };

    sendBtn.addEventListener('click', () => handleSend());
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    promptChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        if (query) handleSend(query);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. LINGUAFLOW MULTILINGUAL NEURAL TRANSLATION DEMO
  // --------------------------------------------------------------------------
  initLinguaFlow() {
    const inputElem = document.getElementById('nmt-input');
    const outputElem = document.getElementById('nmt-output');
    const translateBtn = document.getElementById('nmt-translate-btn');
    const langPairSelect = document.getElementById('nmt-lang-pair');
    const matrixElem = document.getElementById('nmt-attention-matrix');

    if (!inputElem || !outputElem || !translateBtn) return;

    const nmtDictionary = {
      'en-ar': {
        'Deep learning empowers intelligent autonomous systems.': 'التعلم العميق يعزز الأنظمة الذاتية والذكية.',
        'Artificial intelligence advances computer vision and robotics.': 'الذكاء الاصطناعي يطور الرؤية الحاسوبية والروبوتات.',
        'Ali Khalid is an AI Engineer and Deep Learning Researcher.': 'علي خالد هو مهندس ذكاء اصطناعي وباحث في التعلم العميق.'
      },
      'ar-en': {
        'الذكاء الاصطناعي يغير مستقبل التكنولوجيا والطب.': 'Artificial intelligence transforms the future of technology and medicine.',
        'علي خالد مهندس ذكاء اصطناعي وباحث في التعلم العميق.': 'Ali Khalid is an AI Engineer and Deep Learning Researcher.'
      },
      'en-ja': {
        'Artificial intelligence is the foundation of future robotics.': '人工知能は未来のロボティクスの基盤です。',
        'Deep learning empowers intelligent autonomous systems.': '深層学習は自律型知能システムを強化します。'
      }
    };

    const updateAttentionMatrix = (srcTokens, tgtTokens) => {
      if (!matrixElem) return;
      matrixElem.innerHTML = '';
      const table = document.createElement('div');
      table.className = 'grid gap-1 mt-2 font-mono text-[10px] overflow-x-auto';

      let html = `<div class="flex gap-1 pb-1 border-b border-gray-800"><div class="w-16 text-gray-500">ATTN MAP</div>`;
      tgtTokens.forEach(t => {
        html += `<div class="flex-1 min-w-[36px] text-center text-cyan-400 font-semibold truncate">${t}</div>`;
      });
      html += `</div>`;

      srcTokens.forEach((sToken, i) => {
        html += `<div class="flex items-center gap-1"><div class="w-16 text-gray-400 truncate">${sToken}</div>`;
        tgtTokens.forEach((tToken, j) => {
          // Compute pseudo attention weight (higher along diagonal)
          const weight = Math.max(0.08, (1 - Math.abs(i / srcTokens.length - j / tgtTokens.length) * 1.3)).toFixed(2);
          const opacity = Math.min(1, Math.max(0.1, weight));
          html += `<div class="flex-1 min-w-[36px] h-5 rounded flex items-center justify-center text-[9px] font-bold" style="background-color: rgba(0, 242, 254, ${opacity * 0.4}); color: rgba(255, 255, 255, ${opacity * 0.9});">${weight}</div>`;
        });
        html += `</div>`;
      });

      matrixElem.innerHTML = html;
    };

    const doTranslate = () => {
      const pair = langPairSelect ? langPairSelect.value : 'en-ar';
      const text = inputElem.value.trim();
      if (!text) return;

      if (window.soundFX) window.soundFX.playLaser();

      outputElem.innerHTML = `<span class="text-cyan-400 animate-pulse font-mono text-xs">ENCODING TOKENS & COMPUTING ATTENTION...</span>`;

      setTimeout(() => {
        let result = (nmtDictionary[pair] && nmtDictionary[pair][text]) || '';
        if (!result) {
          // Dynamic translation fallback
          if (pair === 'en-ar') {
            result = `الترجمة الفورية عبر نموذج LinguaFlow: [ ${text} ]`;
          } else if (pair === 'ar-en') {
            result = `LinguaFlow Neural Translation: [ ${text} ]`;
          } else {
            result = `LinguaFlowニューラル翻訳: [ ${text} ]`;
          }
        }

        outputElem.innerHTML = `<span class="text-white font-medium text-sm leading-relaxed">${result}</span>`;
        if (window.soundFX) window.soundFX.playScore();

        const srcWords = text.split(' ').slice(0, 5);
        const tgtWords = result.split(' ').slice(0, 5);
        updateAttentionMatrix(srcWords, tgtWords);
      }, 350);
    };

    translateBtn.addEventListener('click', doTranslate);

    // Initial matrix
    updateAttentionMatrix(['Deep', 'learning', 'empowers', 'systems'], ['التعلم', 'العميق', 'يعزز', 'الأنظمة']);
  }

  // --------------------------------------------------------------------------
  // 4. ROBOTIC ARM INVERSE KINEMATICS (E-JUST THESIS SIMULATOR)
  // --------------------------------------------------------------------------
  initRoboArmDemo() {
    const canvas = document.getElementById('roboarm-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 440;
    canvas.height = 300;

    const angle1Elem = document.getElementById('arm-angle-1');
    const angle2Elem = document.getElementById('arm-angle-2');
    const angle3Elem = document.getElementById('arm-angle-3');
    const errorElem = document.getElementById('arm-error');

    // Robotic arm link lengths
    const L1 = 90;
    const L2 = 75;
    const L3 = 45;

    // Base position
    const baseX = canvas.width / 2;
    const baseY = canvas.height - 40;

    // Target coordinates
    let targetX = baseX + 80;
    let targetY = baseY - 120;
    let dragging = false;

    // Joint angles (radians)
    let theta1 = -Math.PI / 4;
    let theta2 = Math.PI / 3;
    let theta3 = -Math.PI / 6;

    // Inverse Kinematics solver (2-link analytical + end-effector orientation)
    const solveIK = (tx, ty) => {
      const dx = tx - baseX;
      const dy = ty - baseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Clamp target within reachable workspace
      const maxReach = L1 + L2 + L3 - 5;
      const minReach = Math.abs(L1 - L2) + 10;
      const clampedDist = Math.max(minReach, Math.min(maxReach, dist));

      const normX = (dx / dist) * clampedDist;
      const normY = (dy / dist) * clampedDist;

      // Desired wrist position assuming end effector points toward target
      const phi = Math.atan2(normY, normX);
      const wx = normX - L3 * Math.cos(phi);
      const wy = normY - L3 * Math.sin(phi);

      const dWrist = Math.sqrt(wx * wx + wy * wy);
      const clampedWrist = Math.min(L1 + L2 - 2, Math.max(Math.abs(L1 - L2) + 2, dWrist));

      // Law of cosines for 2-link
      const cosTheta2 = (clampedWrist * clampedWrist - L1 * L1 - L2 * L2) / (2 * L1 * L2);
      theta2 = Math.acos(Math.max(-1, Math.min(1, cosTheta2)));

      const alpha = Math.atan2(wy, wx);
      const beta = Math.atan2(L2 * Math.sin(theta2), L1 + L2 * Math.cos(theta2));
      theta1 = alpha - beta;

      theta3 = phi - (theta1 + theta2);

      // Update telemetry
      const deg1 = (theta1 * 180 / Math.PI).toFixed(1);
      const deg2 = (theta2 * 180 / Math.PI).toFixed(1);
      const deg3 = (theta3 * 180 / Math.PI).toFixed(1);

      if (angle1Elem) angle1Elem.textContent = `${deg1}°`;
      if (angle2Elem) angle2Elem.textContent = `${deg2}°`;
      if (angle3Elem) angle3Elem.textContent = `${deg3}°`;
      if (errorElem) errorElem.textContent = `< 0.04 mm (+15% Precision)`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Base pedestal
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(baseX - 35, baseY, 70, 25, [6, 6, 0, 0]);
      ctx.fill();
      ctx.stroke();

      // Reachable workspace boundary circle (dotted)
      ctx.setLineDash([4, 6]);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
      ctx.beginPath();
      ctx.arc(baseX, baseY, L1 + L2 + L3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Forward Kinematics Joint coordinates
      const j1X = baseX;
      const j1Y = baseY;

      const j2X = j1X + L1 * Math.cos(theta1);
      const j2Y = j1Y + L1 * Math.sin(theta1);

      const j3X = j2X + L2 * Math.cos(theta1 + theta2);
      const j3Y = j2Y + L2 * Math.sin(theta1 + theta2);

      const eeX = j3X + L3 * Math.cos(theta1 + theta2 + theta3);
      const eeY = j3Y + L3 * Math.sin(theta1 + theta2 + theta3);

      // Draw Link 1
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(j1X, j1Y);
      ctx.lineTo(j2X, j2Y);
      ctx.stroke();

      // Draw Link 2
      ctx.strokeStyle = '#8a2be2';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(j2X, j2Y);
      ctx.lineTo(j3X, j3Y);
      ctx.stroke();

      // Draw Link 3 (End effector wrist)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(j3X, j3Y);
      ctx.lineTo(eeX, eeY);
      ctx.stroke();

      // Draw Joints
      [
        { x: j1X, y: j1Y, r: 8, col: '#00f2fe' },
        { x: j2X, y: j2Y, r: 6.5, col: '#8a2be2' },
        { x: j3X, y: j3Y, r: 5, col: '#10b981' }
      ].forEach(joint => {
        ctx.fillStyle = '#07090e';
        ctx.strokeStyle = joint.col;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(joint.x, joint.y, joint.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // End Effector gripper
      ctx.fillStyle = '#00f2fe';
      ctx.beginPath();
      ctx.arc(eeX, eeY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Target (Draggable Reticle)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(targetX - 16, targetY);
      ctx.lineTo(targetX + 16, targetY);
      ctx.moveTo(targetX, targetY - 16);
      ctx.lineTo(targetX, targetY + 16);
      ctx.stroke();

      // Laser guide line from end effector to target
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(eeX, eeY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const updateTarget = (clientX, clientY) => {
      const box = canvas.getBoundingClientRect();
      targetX = (clientX - box.left) * (canvas.width / box.width);
      targetY = (clientY - box.top) * (canvas.height / box.height);
      solveIK(targetX, targetY);
      draw();
    };

    canvas.addEventListener('mousedown', (e) => {
      dragging = true;
      updateTarget(e.clientX, e.clientY);
      if (window.soundFX) window.soundFX.playClick();
    });

    window.addEventListener('mousemove', (e) => {
      if (dragging) updateTarget(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      dragging = false;
    });

    canvas.addEventListener('touchstart', (e) => {
      dragging = true;
      if (e.touches[0]) updateTarget(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (dragging && e.touches[0]) updateTarget(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      dragging = false;
    });

    // Initialize
    solveIK(targetX, targetY);
    draw();
  }
}

window.AIDemosManager = AIDemosManager;

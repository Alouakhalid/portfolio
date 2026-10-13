// ============================================================================
// MAIN APPLICATION BOOTSTRAPPER & HUD CONTROLLER [v3.0.0]
// Advanced Theme Manager, Audio Visualizer, Cyber Terminal, and 3D Spotlight
// ============================================================================

// Theme Manager
class ThemeManager {
  static init() {
    const saved = localStorage.getItem('ali_portfolio_theme') || 'cyan';
    this.setTheme(saved);

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
      themeSelect.value = saved;
      themeSelect.addEventListener('change', (e) => {
        this.setTheme(e.target.value);
        if (window.soundFX) window.soundFX.playWhoosh();
      });
    }
  }

  static setTheme(theme) {
    document.body.classList.remove('theme-cyan', 'theme-violet', 'theme-emerald', 'theme-amber');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('ali_portfolio_theme', theme);
  }
}
window.ThemeManager = ThemeManager;

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;

  // 1. Initialize Theme Manager
  ThemeManager.init();

  // 2. Initialize Neural Particle Background
  if (window.NeuralCanvas) {
    new window.NeuralCanvas('neural-bg-canvas');
  }

  // 3. Initialize Trilingual Localization
  if (window.I18nManager) {
    new window.I18nManager();
  }

  // 4. Initialize AI Playground Demos & Neural Arcade Games
  if (window.AIDemosManager) {
    new window.AIDemosManager();
  }
  if (window.NeuralArcade) {
    new window.NeuralArcade();
  }

  // 5. Initialize Cyber Terminal
  if (window.CyberTerminal) {
    new window.CyberTerminal('terminal-output', 'terminal-cli-input');
  }

  // 6. Interactive Mouse Spotlight Glow & 3D Tilt on Cards
  const updateSpotlight = (e) => {
    document.querySelectorAll('.cyber-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };
  window.addEventListener('mousemove', updateSpotlight);

  // 7. Real-Time Audio Frequency Spectrum Visualizer
  const spectrumCanvas = document.getElementById('audio-spectrum-canvas');
  if (spectrumCanvas) {
    const sCtx = spectrumCanvas.getContext('2d');
    const drawSpectrum = () => {
      sCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);
      const freq = window.soundFX ? window.soundFX.getFrequencyData() : null;

      const bars = 8;
      const barWidth = spectrumCanvas.width / bars - 2;

      for (let i = 0; i < bars; i++) {
        let val = 2;
        if (freq && window.soundFX.enabled) {
          val = Math.max(2, (freq[i * 2] / 255) * spectrumCanvas.height);
        } else if (window.soundFX && window.soundFX.enabled) {
          val = Math.sin(Date.now() * 0.005 + i) * 4 + 6;
        }

        sCtx.fillStyle = '#00f2fe';
        sCtx.shadowBlur = 4;
        sCtx.shadowColor = '#00f2fe';
        sCtx.fillRect(i * (barWidth + 2), spectrumCanvas.height - val, barWidth, val);
        sCtx.shadowBlur = 0;
      }
      requestAnimationFrame(drawSpectrum);
    };
    drawSpectrum();
  }

  // 8. Render Hugging Face Models Grid
  const renderHFModels = () => {
    const grid = document.getElementById('hf-models-grid');
    if (!grid || !data) return;

    grid.innerHTML = data.huggingface_models.map(m => `
      <div class="cyber-card p-5 flex flex-col justify-between group hud-bracket">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <span class="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              ${m.badge}
            </span>
            <span class="text-xs font-mono text-gray-400 flex items-center gap-1">
              <svg class="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              ${m.downloads}
            </span>
          </div>

          <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
            ${m.title}
          </h3>
          <div class="text-xs font-mono text-cyan-400/80 mb-2">${m.name}</div>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">
            ${m.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-4">
            ${m.tags.map(t => `<span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gray-800/80 text-gray-300 border border-gray-700/60">${t}</span>`).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between">
          <a href="${m.url}" target="_blank" rel="noopener noreferrer" class="btn-neon text-xs py-1.5 px-3 w-full text-center">
            VIEW ON HUGGING FACE →
          </a>
        </div>
      </div>
    `).join('');
  };

  // 9. Render GitHub Projects Grid with Category Filters
  const renderProjects = (filter = 'all') => {
    const grid = document.getElementById('github-projects-grid');
    if (!grid || !data) return;

    const filtered = filter === 'all'
      ? data.github_projects
      : data.github_projects.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => `
      <div class="cyber-card p-5 flex flex-col justify-between group hud-bracket">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-mono text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/30">
              ${p.stars}
            </span>
            <span class="text-xs font-mono text-gray-500 uppercase">${p.category}</span>
          </div>

          <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5">
            ${p.title}
          </h3>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">
            ${p.description}
          </p>

          <div class="flex flex-wrap gap-1 mb-4">
            ${p.tags.map(t => `<span class="px-2 py-0.5 text-[10px] font-mono bg-gray-900 border border-gray-700/50 text-gray-300 rounded">${t}</span>`).join('')}
          </div>
        </div>

        <div class="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn-neon-outline text-xs py-1.5 px-3 flex-1 text-center font-mono">
            GITHUB REPO
          </a>
          ${p.demoType !== 'none' ? `
            <a href="#demos-section" class="btn-neon text-xs py-1.5 px-3 flex-1 text-center font-mono">
              LIVE DEMO
            </a>
          ` : ''}
        </div>
      </div>
    `).join('');
  };

  // 10. Project Filter Tabs Event Listeners
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category || 'all';
      renderProjects(cat);
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  // 11. Render Work Experience Timeline
  const renderExperience = () => {
    const container = document.getElementById('experience-timeline');
    if (!container || !data) return;

    container.innerHTML = data.experience.map((exp) => `
      <div class="relative pl-6 pb-8 border-l border-cyan-500/30 last:pb-0">
        <div class="absolute -left-[9px] top-0.5 w-4 h-4 rounded-full bg-cyan-950 border-2 border-cyan-400 shadow-[0_0_8px_#00f2fe]"></div>
        <div class="cyber-card p-5 ml-2 hud-bracket">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4 class="text-base font-bold text-white">${exp.role}</h4>
            <span class="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">${exp.period}</span>
          </div>
          <div class="flex items-center gap-2 mb-3">
            <span class="text-sm font-semibold text-purple-400">${exp.company}</span>
            <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">${exp.badge}</span>
          </div>
          <ul class="space-y-1.5 text-xs text-gray-300">
            ${exp.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-cyan-400 mt-0.5">▸</span><span>${h}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  };

  // 12. Render Education & Certifications
  const renderEducationAndCerts = () => {
    const eduContainer = document.getElementById('education-container');
    const certsContainer = document.getElementById('certs-container');
    if (!data) return;

    if (eduContainer) {
      eduContainer.innerHTML = data.education.map(edu => `
        <div class="cyber-card p-5 mb-4 border-l-4 border-l-cyan-400 hud-bracket">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
            <h4 class="text-base font-bold text-white">${edu.degree}</h4>
            <span class="text-xs font-mono text-cyan-400">${edu.period}</span>
          </div>
          <div class="text-sm font-semibold text-purple-400 mb-2">${edu.institution}</div>
          <div class="p-2.5 rounded bg-gray-900/80 border border-gray-800 text-xs font-mono text-cyan-300 mb-3">
            ${edu.thesis}
          </div>
          <ul class="space-y-1 text-xs text-gray-300">
            ${edu.highlights.map(h => `<li class="flex items-start gap-2"><span class="text-cyan-400">▸</span><span>${h}</span></li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    if (certsContainer) {
      certsContainer.innerHTML = data.certifications.map(c => `
        <div class="cyber-card p-3 flex items-center justify-between">
          <div>
            <div class="text-xs font-bold text-white">${c.name}</div>
            <div class="text-[11px] font-mono text-gray-400">${c.issuer}</div>
          </div>
          <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">VERIFIED</span>
        </div>
      `).join('');
    }
  };

  // 13. Tab Switching Logic for Demos & Games
  const setupTabs = (tabGroupClass, contentGroupClass) => {
    const tabs = document.querySelectorAll(tabGroupClass);
    const contents = document.querySelectorAll(contentGroupClass);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.add('hidden'));

        tab.classList.add('active');
        const targetId = tab.dataset.target;
        const targetContent = document.getElementById(targetId);
        if (targetContent) targetContent.classList.remove('hidden');

        if (window.soundFX) window.soundFX.playClick();
      });
    });
  };

  setupTabs('.demo-tab', '.demo-content');
  setupTabs('.game-tab', '.game-content');

  // 14. Sound Toggle System
  const soundBtn = document.getElementById('sound-toggle-btn');
  const updateSoundUI = () => {
    if (!soundBtn || !window.soundFX) return;
    const isMuted = !window.soundFX.enabled;
    soundBtn.innerHTML = isMuted
      ? `<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg><span class="hidden sm:inline text-xs font-mono">SFX: OFF</span>`
      : `<svg class="w-4 h-4 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg><span class="hidden sm:inline text-xs font-mono text-cyan-400">SFX: ON</span>`;
  };

  if (soundBtn) {
    updateSoundUI();
    soundBtn.addEventListener('click', () => {
      window.soundFX.toggle();
      updateSoundUI();
    });
  }

  // 15. Command Palette (HUD Terminal Cmd+K)
  const cmdModal = document.getElementById('cmd-palette-modal');
  const cmdInput = document.getElementById('cmd-input');
  const cmdClose = document.getElementById('cmd-close');

  const openCmdPalette = () => {
    if (!cmdModal) return;
    cmdModal.classList.add('open');
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    if (window.soundFX) window.soundFX.playPowerUp();
  };

  const closeCmdPalette = () => {
    if (!cmdModal) return;
    cmdModal.classList.remove('open');
    if (window.soundFX) window.soundFX.playClick();
  };

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    }
    if (e.key === 'Escape') {
      closeCmdPalette();
      closeResumeModal();
    }
  });

  if (cmdClose) cmdClose.addEventListener('click', closeCmdPalette);
  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdPalette();
    });
  }

  // Command palette item clicks
  const cmdItems = document.querySelectorAll('.cmd-item');
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      closeCmdPalette();

      if (action === 'goto-models') {
        document.getElementById('models-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-demos') {
        document.getElementById('demos-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-games') {
        document.getElementById('games-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-projects') {
        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-terminal') {
        document.getElementById('terminal-section')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'toggle-sound') {
        window.soundFX.toggle();
        updateSoundUI();
      } else if (action === 'open-resume') {
        openResumeModal();
      } else if (action === 'copy-email') {
        navigator.clipboard?.writeText('ali88883737@gmail.com');
        alert('Email copied to clipboard: ali88883737@gmail.com');
      }
    });
  });

  // 16. Resume Modal System
  const resumeModal = document.getElementById('resume-modal');
  const resumeBtn = document.querySelectorAll('.open-resume-btn');
  const resumeClose = document.getElementById('resume-close');

  const openResumeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    if (window.soundFX) window.soundFX.playLaser();
  };

  const closeResumeModal = () => {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    if (window.soundFX) window.soundFX.playClick();
  };

  resumeBtn.forEach(btn => btn.addEventListener('click', openResumeModal));
  if (resumeClose) resumeClose.addEventListener('click', closeResumeModal);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResumeModal();
    });
  }

  // Initial Renders
  renderHFModels();
  renderProjects('all');
  renderExperience();
  renderEducationAndCerts();
});

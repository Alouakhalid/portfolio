// ============================================================================
// TRILINGUAL LOCALIZATION ENGINE (EN / AR / JA)
// Full RTL layout support for Arabic and dynamic DOM text mapping
// ============================================================================

const I18N_TRANSLATIONS = {
  en: {
    nav_home: "Overview",
    nav_models: "Hugging Face Models",
    nav_projects: "Projects",
    nav_demos: "AI Playground",
    nav_games: "Neural Arcade",
    nav_experience: "Experience",
    nav_skills: "Skills & Certs",
    nav_contact: "Contact",
    nav_cv: "Resume PDF",

    hero_badge: "AI ENGINEER • DEEP LEARNING RESEARCHER",
    hero_title_prefix: "HELLO, I AM",
    hero_explore_models: "EXPLORE HF MODELS",
    hero_play_games: "PLAY ARCADE GAMES",
    hero_try_demos: "TRY AI PLAYGROUND",
    hero_view_cv: "DOWNLOAD CV",

    stats_exp: "Years Experience",
    stats_downloads: "Hugging Face Downloads",
    stats_ecpc: "ECPC Finalist (Top 10%)",
    stats_precision: "Robotic Precision Gain",

    section_models_title: "HUGGING FACE MODEL HUB",
    section_models_subtitle: "Production NLP, OCR Transformer Architectures & Specialized LLMs",

    section_demos_title: "INTERACTIVE AI PLAYGROUND",
    section_demos_subtitle: "Test real-time neural inferences, OCR character recognition, and robotic inverse kinematics",
    tab_ocr: "Qalam-Net OCR",
    tab_medical: "Qwen Medical AI",
    tab_translation: "LinguaFlow NMT",
    tab_roboarm: "Robotic Arm IK",

    section_games_title: "NEURAL ARCADE (ENGINEERING GAMES)",
    section_games_subtitle: "Play interactive engineering games built with reinforcement learning, computer vision, and trajectory mathematics",
    tab_game_pong: "RL Pong Arena",
    tab_game_vision: "Vision Hunter",
    tab_game_spline: "Robo-Spline",

    section_projects_title: "GITHUB REPOSITORIES & PAPERS",
    section_projects_subtitle: "Open-source deep learning pipelines, agent orchestration, and mechatronic control",

    section_experience_title: "WORK EXPERIENCE & EDUCATION",
    section_experience_subtitle: "Production AI engineering, corporate training, research internships & E-JUST mechatronics",

    section_skills_title: "SKILLS & CERTIFICATIONS",
    section_skills_subtitle: "Specialized frameworks, verified certifications, and core research competencies",

    section_contact_title: "INITIATE TRANSMISSION",
    section_contact_subtitle: "Available for AI Engineering, Deep Learning Research, and Robotics opportunities",

    cmd_palette_hint: "Press Cmd+K or Ctrl+K for Neural HUD Command Terminal"
  },

  ar: {
    nav_home: "نظرة عامة",
    nav_models: "نماذج Hugging Face",
    nav_projects: "المشاريع",
    nav_demos: "مختبر الذكاء الاصطناعي",
    nav_games: "ألعاب هندسية",
    nav_experience: "الخبرات والتعليم",
    nav_skills: "المهارات والشهادات",
    nav_contact: "تواصل معي",
    nav_cv: "السيرة الذاتية PDF",

    hero_badge: "مهندس ذكاء اصطناعي • باحث في التعلم العميق",
    hero_title_prefix: "مرحباً، أنا",
    hero_explore_models: "استكشف نماذج Hugging Face",
    hero_play_games: "العب الألعاب الهندسية",
    hero_try_demos: "جرّب النماذج التفاعلية",
    hero_view_cv: "تحميل السيرة الذاتية",

    stats_exp: "سنوات خبرة",
    stats_downloads: "تنزيلات Hugging Face",
    stats_ecpc: "نهائي مسابقة ECPC البرمجية",
    stats_precision: "دقة إضافية في تحكم الروبوت",

    section_models_title: "نماذج HUGGING FACE الرسمية",
    section_models_subtitle: "نماذج معالجة اللغات الطبيعية، محولات التعرف البصري على الحروف، والنماذج التخصصية",

    section_demos_title: "مختبر الذكاء الاصطناعي التفاعلي",
    section_demos_subtitle: "اختبر الاستدلال العصبي المباشر، التعرف على الحروف العربية، ونظام حركة الروبوت",
    tab_ocr: "نموذج قلم-نت (OCR)",
    tab_medical: "مساعد Qwen الطبي",
    tab_translation: "ترجمة LinguaFlow",
    tab_roboarm: "محاكاة ذراع الروبوت",

    section_games_title: "منطقة الألعاب الهندسية (NEURAL ARCADE)",
    section_games_subtitle: "ألعاب تفاعلية مطورة بخوارزميات التعلم المعزز، الرؤية الحاسوبية، والرياضيات التطبيقية",
    tab_game_pong: "تنس التعلم المعزز (RL)",
    tab_game_vision: "صائد الرؤية الحاسوبية",
    tab_game_spline: "مسار الروبوت التكعيبي",

    section_projects_title: "مستودعات GITHUB والمشاريع البحثية",
    section_projects_subtitle: "خطوط إنتاج التعلم العميق مفتوحة المصدر، الوكلاء الأذكياء، وأنظمة الميكاترونيات",

    section_experience_title: "الخبرات العملية والمسار الأكاديمي",
    section_experience_subtitle: "تطوير أنظمة الذكاء الاصطناعي للإنتاج، تدريب النماذج، والجامعة المصرية اليابانية (E-JUST)",

    section_skills_title: "المهارات التقنية والشهادات المعتمدة",
    section_skills_subtitle: "أطر العمل المتخصصة، الشهادات العالمية المعتمدة، والمجالات البحثية",

    section_contact_title: "إرسال رسالة مباشرة",
    section_contact_subtitle: "متاح لفرص هندسة الذكاء الاصطناعي، أبحاث التعلم العميق، وتطبيقات الروبوتات",

    cmd_palette_hint: "اضغط Cmd+K أو Ctrl+K لفتح لوحة التحكم الذكية"
  },

  ja: {
    nav_home: "概要",
    nav_models: "Hugging Faceモデル",
    nav_projects: "プロジェクト",
    nav_demos: "AIプレイグラウンド",
    nav_games: "AIアーケードゲーム",
    nav_experience: "経歴・学歴",
    nav_skills: "スキル・認定資格",
    nav_contact: "お問い合わせ",
    nav_cv: "履歴書PDF",

    hero_badge: "AIエンジニア • 深層学習研究者",
    hero_title_prefix: "こんにちは、私は",
    hero_explore_models: "HFモデルを見る",
    hero_play_games: "ゲームをプレイ",
    hero_try_demos: "AIデモを体験",
    hero_view_cv: "履歴書ダウンロード",

    stats_exp: "年の開発経験",
    stats_downloads: "HFダウンロード数",
    stats_ecpc: "ECPC決勝 61位 (上位10%)",
    stats_precision: "ロボット制御精度向上",

    section_models_title: "HUGGING FACE モデルハブ",
    section_models_subtitle: "高精度自然言語処理、OCRトランスフォーマー構造、ドメイン特化型大規模言語モデル",

    section_demos_title: "インタラクティブAIプレイグラウンド",
    section_demos_subtitle: "リアルタイム推論、アラビア語文字認識、ロボット逆運動学シミュレータを体験",
    tab_ocr: "Qalam-Net OCR",
    tab_medical: "Qwen医療AI",
    tab_translation: "LinguaFlow翻訳",
    tab_roboarm: "ロボットアーム逆運動学",

    section_games_title: "ニューラル・アーケード（工学ゲーム）",
    section_games_subtitle: "強化学習、コンピュータビジョン、3次スプライン軌道制御を活用した本格ブラウザゲーム",
    tab_game_pong: "強化学習ポング",
    tab_game_vision: "ビジョンハンター",
    tab_game_spline: "ロボット軌道パズル",

    section_projects_title: "GITHUBリポジトリ ＆ 論文プロジェクト",
    section_projects_subtitle: "オープンソース深層学習パイプライン、マルチエージェント協調、メカトロニクス制御",

    section_experience_title: "職務経歴 ＆ 学歴",
    section_experience_subtitle: "実稼働AI開発、企業向けAI研修、研究所インターン、E-JUSTメカトロニクス専攻",

    section_skills_title: "技術スキル ＆ 認定資格",
    section_skills_subtitle: "主要フレームワーク、国際認定資格、学術研究におけるコアコンピテンシー",

    section_contact_title: "通信を開始（お問い合わせ）",
    section_contact_subtitle: "AIエンジニアリング、深層学習研究、ロボティクス開発のご相談を歓迎します",

    cmd_palette_hint: "Cmd+K または Ctrl+K でHUDコマンドパレットを開く"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('ali_portfolio_lang') || 'en';
    this.init();
  }

  init() {
    this.setLanguage(this.currentLang);
    this.bindEvents();
  }

  bindEvents() {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.value = this.currentLang;
      langSelect.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
        if (window.soundFX) window.soundFX.playClick();
      });
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang) {
          this.setLanguage(lang);
          if (window.soundFX) window.soundFX.playClick();
        }
      });
    });
  }

  setLanguage(lang) {
    if (!I18N_TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('ali_portfolio_lang', lang);

    // Apply RTL for Arabic
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
      document.body.classList.add('rtl-mode');
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
      document.body.classList.remove('rtl-mode');
    }

    // Update all i18n data elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.dataset.i18n;
      if (I18N_TRANSLATIONS[lang][key]) {
        el.textContent = I18N_TRANSLATIONS[lang][key];
      }
    });

    // Update dynamic profile elements if present
    const data = window.PORTFOLIO_DATA;
    if (data) {
      const nameElem = document.getElementById('hero-name');
      const titleElem = document.getElementById('hero-title');
      const bioElem = document.getElementById('hero-bio');

      if (nameElem) nameElem.textContent = lang === 'ar' ? data.profile.name_ar : (lang === 'ja' ? data.profile.name_ja : data.profile.name);
      if (titleElem) titleElem.textContent = lang === 'ar' ? data.profile.title_ar : (lang === 'ja' ? data.profile.title_ja : data.profile.title);
      if (bioElem) bioElem.textContent = lang === 'ar' ? data.profile.bio_ar : (lang === 'ja' ? data.profile.bio_ja : data.profile.bio);
    }
  }
}

window.I18nManager = I18nManager;

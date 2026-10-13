// ============================================================================
// ALI KHALID — PORTFOLIO DATA HUB
// AI Engineer | Deep Learning Researcher | NLP & Computer Vision Specialist
// ============================================================================

const PORTFOLIO_DATA = {
  profile: {
    name: "Ali Khalid",
    name_ar: "علي خالد",
    name_ja: "アリ・カリド",
    title: "AI Engineer & Deep Learning Researcher",
    title_ar: "مهندس ذكاء اصطناعي وباحث في التعلم العميق",
    title_ja: "AIエンジニア ＆ ディープラーニング研究者",
    subtitle: "Specializing in NLP, Computer Vision, Transformers & Mechatronic Robotics",
    subtitle_ar: "متخصص في معالجة اللغات الطبيعية، الرؤية الحاسوبية، ونظم الروبوتات الميكاترونيكية",
    subtitle_ja: "NLP、コンピュータビジョン、トランスフォーマー、メカトロニクスロボティクス専門",
    bio: "AI Engineer and Deep Learning Researcher with 4+ years of experience engineering production-grade intelligent systems. Proven expertise in multilingual NLP, OCR transformer architectures, computer vision, reinforcement learning, and modular robotic arm control at E-JUST.",
    bio_ar: "مهندس ذكاء اصطناعي وباحث في التعلم العميق بخبرة تزيد عن 4 سنوات في تطوير أنظمة ذكية فائقة الدقة. خبرة متقدمة في معالجة اللغات الطبيعية، نماذج التعرف الضوئي على الحروف، الرؤية الحاسوبية، والتعلم المعزز وأنظمة التحكم في الأذرع الروبوتية في الجامعة المصرية اليابانية للعلوم والتكنولوجيا (E-JUST).",
    bio_ja: "実稼働環境向けの高精度AIシステム開発において4年以上の実績を持つAIエンジニア・深層学習研究者。多言語NLP、OCRトランスフォーマー、コンピュータビジョン、強化学習、エジプト・日本科学技術大学（E-JUST）でのロボットアーム制御システムを専門としています。",
    email: "ali88883737@gmail.com",
    phone: "+201020456053",
    location: "Cairo, Egypt",
    location_ar: "القاهرة، مصر",
    location_ja: "エジプト、カイロ",
    github: "https://github.com/Alouakhalid",
    linkedin: "https://www.linkedin.com/in/ali-khalid-ali-khalid-85468225b/",
    huggingface: "https://huggingface.co/Ali0044",
    avatar: "assets/images/avatar.jpg",
    cvUrl: "assets/cv.pdf"
  },

  stats: [
    { value: "4+", label: "Years Experience", label_ar: "سنوات خبرة", label_ja: "年の開発経験", icon: "briefcase" },
    { value: "1,200+", label: "Hugging Face Downloads", label_ar: "تنزيلات Hugging Face", label_ja: "HFダウンロード数", icon: "download" },
    { value: "61st", label: "ECPC Finalist (Top 10%)", label_ar: "نهائي مسابقة ECPC البرمجية", label_ja: "ECPC決勝 61位 (上位10%)", icon: "trophy" },
    { value: "+15%", label: "Robotic Precision Gain", label_ar: "دقة إضافية في التحكم بالروبوت", label_ja: "ロボット制御精度向上", icon: "cpu" }
  ],

  huggingface_models: [
    {
      id: "linguaflow",
      name: "Ali0044/LinguaFlow",
      title: "LinguaFlow: Neural Machine Translation",
      title_ar: "LinguaFlow: ترجمة آلية عصبية متعددة اللغات",
      title_ja: "LinguaFlow: ニューラル機械翻訳モデル",
      downloads: "318+",
      tags: ["NMT", "Seq2Seq", "Transformers", "Multilingual"],
      description: "State-of-the-art neural machine translation pipeline utilizing bidirectional transformer attention for high-fidelity English-Arabic-Japanese translation.",
      description_ar: "نظام ترجمة آلية عصبية متقدم يعتمد على بنية المحولات والانتباه المزدوج لترجمة فائقة الدقة بين الإنجليزية، العربية، واليابانية.",
      description_ja: "英語・アラビア語・日本語の双方向トランスフォーマーアテンションを活用した高精度ニューラル機械翻訳パイプライン。",
      url: "https://huggingface.co/Ali0044/LinguaFlow",
      badge: "318+ Downloads",
      image: "assets/images/linguaflow.jpg"
    },
    {
      id: "qalam-net",
      name: "Ali0044/Qalam-Net",
      title: "Qalam-Net: Handwritten Arabic OCR",
      title_ar: "Qalam-Net: التعرف على الخط العربي اليدوي",
      title_ja: "Qalam-Net: アラビア語手書き文字OCR",
      downloads: "253+",
      tags: ["Vision Transformer", "OCR", "PyTorch", "Arabic NLP"],
      description: "Pioneering deep visual recognition architecture fine-tuned for complex Arabic handwritten calligraphy and historical manuscripts.",
      description_ar: "نموذج رؤية عميق رائد مخصص للتعرف على الخطوط العربية اليدوية المعقدة والمخطوطات التاريخية بدقة متناهية.",
      description_ja: "複雑なアラビア語手書き書道や歴史的古文書の認識に特化した先進的な画像トランスフォーマーモデル。",
      url: "https://huggingface.co/Ali0044/Qalam-Net",
      badge: "253+ Downloads",
      image: "assets/images/ocr.jpg"
    },
    {
      id: "qalam-net-v2",
      name: "Ali0044/Qalam_Net_V2",
      title: "Qalam-Net V2: Printed Arabic OCR SOTA",
      title_ar: "Qalam-Net V2: التعرف على النصوص المطبوعة SOTA",
      title_ja: "Qalam-Net V2: アラビア語活字印刷SOTA OCR",
      downloads: "Active SOTA",
      tags: ["OCR", "CNN-ViT", "Arabic Text", "Production"],
      description: "State-of-the-art document digitizer engineered for multi-column Arabic printed documents, books, and governmental records.",
      description_ar: "أحدث نظام رقمنة للوثائق مصمم للمستندات العربية المطبوعة والكتب والسجلات الرسمية متعددة الأعمدة.",
      description_ja: "複数列組のアラビア語印刷文書、書籍、公的記録のために設計された最先端ドキュメントデジタル化モデル。",
      url: "https://huggingface.co/Ali0044/Qalam_Net_V2",
      badge: "SOTA Architecture",
      image: "assets/images/ocr.jpg"
    },
    {
      id: "qwen-medical-chatbot",
      name: "Ali0044/qwen-medical-chatbot",
      title: "Qwen Medical AI Clinical Assistant",
      title_ar: "المساعد الطبي الذكي المدرب على بنية Qwen",
      title_ja: "Qwen医療AI臨床診断アシスタント",
      downloads: "Specialized LLM",
      tags: ["LLM", "Medical AI", "Fine-Tuning", "LoRA/PEFT"],
      description: "Domain-adapted large language model fine-tuned on extensive clinical datasets for medical question answering and clinical diagnostic rationale.",
      description_ar: "نموذج لغوي ضخم متخصص تم تدريبه وضبطه بدقة على مجموعات بيانات إكلينيكية للإجابة الطبية والتشخيص التوجيهي.",
      description_ja: "医療問答および臨床診断推論のために医療データセットでファインチューニングされたドメイン特化型大規模言語モデル。",
      url: "https://huggingface.co/Ali0044/qwen-medical-chatbot",
      badge: "Medical LLM",
      image: "assets/images/avatar.jpg"
    },
    {
      id: "trocr-03b",
      name: "Ali0044/TrOCR-0.3B",
      title: "TrOCR 0.3B Document Text Recognizer",
      title_ar: "نموذج TrOCR 0.3B للتعرف على نصوص الوثائق",
      title_ja: "TrOCR 0.3B 文書テキスト認識モデル",
      downloads: "Vision Transformer",
      tags: ["TrOCR", "HuggingFace", "0.3B Params", "Deep Learning"],
      description: "Fine-tuned 300M parameter Transformer-based OCR model combining visual encoder (DeiT/BEiT) and autoregressive language decoder.",
      description_ar: "نموذج محول بصري يحتوي على 300 مليون معامل يجمع بين التشفير البصري وفك التشفير اللغوي التلقائي لقراءة الوثائق.",
      description_ja: "ビジュアルエンコーダと自己回帰型言語デコーダを融合させた3億パラメータのトランスフォーマーOCRモデル。",
      url: "https://huggingface.co/Ali0044",
      badge: "0.3B Parameters",
      image: "assets/images/ocr.jpg"
    },
    {
      id: "image-text-to-text",
      name: "Ali0044/Image-Text-to-Text",
      title: "Multimodal Vision-Language Reasoning Pipeline",
      title_ar: "منظومة الاستدلال البصري اللغوي متعددة الوسائط",
      title_ja: "マルチモーダル視覚言語推論パイプライン",
      downloads: "70+",
      tags: ["Multimodal", "Vision-Language", "VQA", "Deep Learning"],
      description: "Advanced multimodal pipeline combining visual feature embeddings with sequence models for visual QA and dense captioning.",
      description_ar: "منظومة ذكاء اصطناعي متعددة الوسائط تدمج بين التضمين البصري والنماذج التسلسلية لفهم وتفسير الصور المعقدة.",
      description_ja: "画像特徴量埋め込みとシーケンスモデルを統合し、画像に対する質疑応答（VQA）と詳細キャプション生成を実現。",
      url: "https://huggingface.co/Ali0044",
      badge: "70+ Downloads",
      image: "assets/images/linguaflow.jpg"
    }
  ],

  github_projects: [
    {
      name: "Robotics-Arm",
      title: "Modular 3-DOF Robotic Arm Control System",
      title_ar: "نظام تحكم تركيبي للأذرع الروبوتية ثلاثية المحاور",
      title_ja: "モジュラー型3軸ロボットアーム制御システム",
      category: "robotics",
      stars: "E-JUST Thesis",
      description: "Undergraduate thesis project at E-JUST engineering a modular kinematic control architecture for robotic arms, boosting positioning precision by 15% over conventional PID controllers.",
      description_ar: "مشروع تخرج في الجامعة المصرية اليابانية (E-JUST) لتطوير خوارزمية تحكم حركي تركيبية للأذرع الروبوتية، محققة زيادة بنسبة 15% في دقة التموضع مقارنة بأنظمة PID التقليدية.",
      description_ja: "エジプト・日本科学技術大学（E-JUST）での卒業研究。従来のPID制御に比べ位置決め精度を15%向上させたモジュラー型運動学ロボットアーム制御システム。",
      tags: ["C++", "ROS", "Inverse Kinematics", "Mechatronics", "Python"],
      github: "https://github.com/Alouakhalid/Robotics-Arm",
      demoType: "roboarm",
      image: "assets/images/roboarm.jpg"
    },
    {
      name: "cubic-spline-path-of-robot-",
      title: "Cubic Spline Smooth Path Planner for Autonomous Robots",
      title_ar: "مخطط مسارات الروبوت باستخدام المنحنيات التكعيبية الناعمة",
      title_ja: "3次スプライン曲線を用いた自律ロボット軌道生成",
      category: "robotics",
      stars: "Algorithm",
      description: "Path generation algorithm for mobile robotic manipulators ensuring C2 continuity, minimal jerk, and dynamic collision avoidance across complex obstacle maps.",
      description_ar: "خوارزمية توليد وتنعيم مسارات الروبوت تضمن الاستمرارية الرياضية وأقل قدر من الارتجاج وتفادي العوائق في البيئات الديناميكية.",
      description_ja: "C2連続性と躍度（ジャーク）最小化を保証し、障害物を回避する自律移動ロボット向け3次スプライン軌道計画アルゴリズム。",
      tags: ["Kinematics", "Path Planning", "Optimization", "Python", "NumPy"],
      github: "https://github.com/Alouakhalid/cubic-spline-path-of-robot-",
      demoType: "spline",
      image: "assets/images/roboarm.jpg"
    },
    {
      name: "Trading_bot_Reinforcment",
      title: "Deep Reinforcement Learning Autonomous Trading Agent",
      title_ar: "وكيل تداول ذاتي يعتمد على التعلم المعزز العميق",
      title_ja: "深層強化学習（DRL）自動取引エージェント",
      category: "rl",
      stars: "DRL Agent",
      description: "Custom Deep Q-Network (DQN) and PPO agents trained on high-frequency market order books with risk-adjusted reward shaping and backtesting engines.",
      description_ar: "وكيل ذكي مدرب باستخدام شبكات DQN و PPO على بيانات السوق المالية لاتخاذ قرارات التداول الآلية مع تحسين نسب العائد إلى المخاطر.",
      description_ja: "高頻度市場データを用いてDQNおよびPPOアルゴリズムで訓練されたリスク調整型自動金融取引エージェント。",
      tags: ["Reinforcement Learning", "PyTorch", "Gymnasium", "Quantitative Finance"],
      github: "https://github.com/Alouakhalid/Trading_bot_Reinforcment",
      demoType: "rlpong",
      image: "assets/images/avatar.jpg"
    },
    {
      name: "NeuralLens",
      title: "NeuralLens: End-to-End Real-Time Computer Vision Suite",
      title_ar: "NeuralLens: منصة الرؤية الحاسوبية ومعالجة الصور المتقدمة",
      title_ja: "NeuralLens: リアルタイム・コンピュータビジョン統合スイート",
      category: "cv",
      stars: "Computer Vision",
      description: "Comprehensive visual intelligence pipeline incorporating object detection, multi-target tracking, semantic segmentation, and automated feature extraction.",
      description_ar: "منظومة رؤية متكاملة تشمل اكتشاف الكائنات، تتبع الأهداف المتعددة، التقسيم الدلالي للصور واستخراج الخصائص في الزمن الحقيقي.",
      description_ja: "物体検出、マルチターゲット追跡、セマンティックセグメンテーション、自動特徴量抽出を統合した包括的ビジョン基盤。",
      tags: ["YOLO", "OpenCV", "PyTorch", "Vision Transformers"],
      github: "https://github.com/Alouakhalid/NeuralLens",
      demoType: "vision",
      image: "assets/images/ocr.jpg"
    },
    {
      name: "Assiuitsheets_new_comer_solutions",
      title: "ECPC Finalist Competitive Programming Solutions",
      title_ar: "حلول البرمجة التنافسية المتقدمة (نهائي ECPC 61 من 600+)",
      title_ja: "ECPCファイナリスト 競技プログラミング高難度解法群",
      category: "algorithms",
      stars: "61st / 600+",
      description: "High-performance C++ algorithmic solutions in graph theory, dynamic programming, combinatorics, and data structures from the Egyptian Collegiate Programming Contest finalist journey.",
      description_ar: "حلول برمجية عالية الأداء بلغة C++ تغطي خوارزميات الرسوم البيانية، البرمجة الديناميكية، وهياكل البيانات المتقدمة من رحلة الوصول لنهائي مسابقة ECPC الوطنية (المركز 61 من بين أكثر من 600 فريق).",
      description_ja: "エジプト大学対抗プログラミング大会（ECPC）決勝進出（600チーム中61位）におけるグラフ理論、動的計画法、高度データ構造の高速C++解法集。",
      tags: ["C++", "Algorithms", "Graph Theory", "Dynamic Programming", "Data Structures"],
      github: "https://github.com/Alouakhalid/Assiuitsheets_new_comer_solutions",
      demoType: "none",
      image: "assets/images/avatar.jpg"
    },
    {
      name: "Empathy-chatbot",
      title: "Empathy-Driven Dialogue Agent & Sentiment Engine",
      title_ar: "شات بوت ذكي لتحليل المشاعر والتفاعل العاطفي",
      title_ja: "共感対話エージェント ＆ 感情分析エンジン",
      category: "nlp",
      stars: "NLP & Emotion",
      description: "Conversational agent combining fine-tuned transformer sentiment classifiers with empathetic response generation for human-centric AI interactions.",
      description_ar: "وكيل محادثة ذكي يدمج بين تصنيف المشاعر اللحظي وتوليد ردود متعاطفة ومتناغمة تعزز تجربة التفاعل مع المستخدمين.",
      description_ja: "感情分類器と共感型応答生成を組み合わせ、人間に寄り添った自然なインタラクションを実現する対話エージェント。",
      tags: ["Transformers", "BERT", "Sentiment Analysis", "Hugging Face"],
      github: "https://github.com/Alouakhalid/Empathy-chatbot",
      demoType: "chat",
      image: "assets/images/linguaflow.jpg"
    },
    {
      name: "FaceMask-Project",
      title: "Real-Time Face Mask & Biometric Verification",
      title_ar: "نظام كشف كمامات الوجه والتحقق البصري الفوري",
      title_ja: "リアルタイムマスク着用検出 ＆ 生体認証システム",
      category: "cv",
      stars: "CV Detector",
      description: "Lightweight convolutional neural network optimized for edge inference and real-time biometric and mask compliance detection.",
      description_ar: "شبكة عصبية التفافية خفيفة الوزن ومحسنة للعمل على الأجهزة الطرفية للتحقق الفوري من التزام ارتداء الكمامات.",
      description_ja: "エッジデバイスでの高速推論に最適化された軽量CNNによるリアルタイムマスク着用検出システム。",
      tags: ["CNN", "MobileNet", "Edge AI", "OpenCV"],
      github: "https://github.com/Alouakhalid/FaceMask-Project",
      demoType: "none",
      image: "assets/images/ocr.jpg"
    },
    {
      name: "langchain-and-langgraphe",
      title: "Multi-Agent Orchestration & RAG Graph Workflows",
      title_ar: "هندسة الوكلاء المتعددين وسلاسل الاسترجاع المدعوم RAG",
      title_ja: "マルチエージェントオーケストレーション ＆ RAGグラフワークフロー",
      category: "nlp",
      stars: "Agentic AI",
      description: "State-of-the-art agent workflows using LangChain and LangGraph for cyclic multi-agent deliberation, vector search, and tool execution.",
      description_ar: "تطوير وكلاء أذكياء متعددي المهام باستخدام LangChain و LangGraph للبحث في المتجهات وتنفيذ الأدوات وحل المسائل المعقدة.",
      description_ja: "LangChainおよびLangGraphを活用した循環型マルチエージェント協調、ベクトル検索、外部ツール実行パイプライン。",
      tags: ["LangChain", "LangGraph", "RAG", "Vector DB", "Agents"],
      github: "https://github.com/Alouakhalid/langchain-and-langgraphe",
      demoType: "none",
      image: "assets/images/linguaflow.jpg"
    }
  ],

  experience: [
    {
      role: "AI Trainer & Machine Learning Engineer",
      role_ar: "مدرب ذكاء اصطناعي ومهندس تعلم آلي",
      role_ja: "AIトレーナー ＆ 機械学習エンジニア",
      company: "Outlier AI",
      period: "Jan 2023 – Present",
      period_ar: "يناير 2023 – حتى الآن",
      period_ja: "2023年1月 – 現在",
      badge: "Current",
      highlights: [
        "Collaborated with data scientists to refine LLM training methodologies, increasing model accuracy by 15% over 6 months.",
        "Designed and curated training curriculum simplifying complex transformer & RL concepts across diverse technical teams.",
        "Led interactive workshops on cutting-edge generative AI capabilities and RLHF best practice adoption."
      ],
      highlights_ar: [
        "التعاون مع علماء البيانات لتحسين منهجيات تدريب النماذج اللغوية، مما رفع دقة النماذج بنسبة 15% خلال 6 أشهر.",
        "تصميم مواد تدريبية متخصصة لتبسيط مفاهيم الذكاء الاصطناعي المعقدة للفرق التقنية المختلفة.",
        "قيادة ورش عمل تفاعلية حول أحدث قدرات الذكاء الاصطناعي التوليدي والتعلم المعزز بملاحظات البشر (RLHF)."
      ],
      highlights_ja: [
        "データサイエンティストと協業しLLMの学習手法を改善、6ヶ月でモデル精度を15%向上。",
        "トランスフォーマーや強化学習の高度な概念を平易に解説する技術研修カリキュラムを策定。",
        "生成AIの最新機能とRLHF（人間フィードバックによる強化学習）の導入に関するワークショップを主導。"
      ]
    },
    {
      role: "Data Scientist (Freelance)",
      role_ar: "عالم بيانات (عمل حر)",
      role_ja: "データサイエンティスト（フリーランス）",
      company: "Upwork",
      period: "Jun 2021 – Present",
      period_ar: "يونيو 2021 – حتى الآن",
      period_ja: "2021年6月 – 現在",
      badge: "Top Rated",
      highlights: [
        "Delivered end-to-end custom ML models tailored to client business needs, translating unstructured data into predictive decisions.",
        "Architected robust preprocessing pipelines handling noisy multimodal datasets, boosting baseline performance significantly.",
        "Enforced rigorous code reviews and modular software architecture, speeding up deployment velocity."
      ],
      highlights_ar: [
        "تطوير نماذج تعلم آلي مخصصة لاحتياجات العملاء، وتحويل البيانات المعقدة إلى رؤى استراتيجية دقيقة.",
        "بناء خطوط معالجة بيانات قوية وموثوقة للتعامل مع البيانات غير المهيكلة ورفع كفاءة النماذج.",
        "المشاركة في مراجعات برمجية احترافية لضمان أفضل الممارسات البرمجية وتقليص مدة التسليم."
      ],
      highlights_ja: [
        "クライアントのビジネス課題に合わせたMLモデルを構築し、非構造化データを予測的インサイトへ変換。",
        "高ノイズのマルチモーダルデータに対応する前処理パイプラインを構築し、モデル精度を劇的に向上。",
        "ベストプラクティスに基づくコードレビューを徹底し、プロジェクトの開発速度と保守性を向上。"
      ]
    },
    {
      role: "NLP Engineer (Internship)",
      role_ar: "مهندس معالجة لغات طبيعية (تدريب)",
      role_ja: "NLPエンジニア（インターン）",
      company: "NTI (National Telecommunication Institute)",
      period: "Aug 2025",
      period_ar: "أغسطس 2025",
      period_ja: "2025年8月",
      badge: "Evaluation: 97.8%",
      highlights: [
        "Built transformer-based text classification & sentiment pipelines, delivering nuanced topic analysis.",
        "Conducted tokenization, feature extraction, and fine-tuning over massive Arabic & English textual corpora.",
        "Achieved a remarkable final evaluation score of 97.8% during the institute internship assessment."
      ],
      highlights_ar: [
        "بناء نماذج معالجة لغات طبيعية لتصنيف النصوص وتحليل المشاعر بدقة عالية.",
        "معالجة واستخراج الخصائص من كتل نصية ضخمة واستخلاص الأنماط اللغوية الدقيقة.",
        "تحقيق درجة تقييم استثنائية بلغت 97.8% خلال فترة التدريب المعتمد."
      ],
      highlights_ja: [
        "テキスト分類・感情分析のためのトランスフォーマーモデルを構築し、高精度なインサイトを抽出。",
        "大規模テキストコーパスの前処理および特徴量抽出パイプラインを実装。",
        "インターンシップ修了評価にて97.8%という極めて優秀なスコアを獲得。"
      ]
    },
    {
      role: "Computer Vision Engineer (Internship)",
      role_ar: "مهندس رؤية حاسوبية (تدريب)",
      role_ja: "コンピュータビジョンエンジニア（インターン）",
      company: "NAID",
      period: "Jul 2025 – Sep 2025",
      period_ar: "يوليو 2025 – سبتمبر 2025",
      period_ja: "2025年7月 – 9月",
      badge: "Real-Time CV",
      highlights: [
        "Developed computer vision algorithms for real-time edge image processing and object detection.",
        "Designed end-to-end synthetic & augmented data pipelines for validating CV architectures.",
        "Conducted ablation experiments on YOLO and ViT models to optimize latency vs. mAP trade-offs."
      ],
      highlights_ar: [
        "تطوير خوارزميات رؤية حاسوبية لتطبيقات معالجة الصور واكتشاف الكائنات في الزمن الحقيقي.",
        "تصميم خطوط معالجة بيانات متكاملة لتدريب واختبار نماذج الرؤية الحاسوبية بدقة فائقة.",
        "إجراء تجارب أداء مكثفة لتحسين كفاءة اكتشاف الكائنات وتقليل وقت الاستجابة."
      ],
      highlights_ja: [
        "リアルタイム画像処理および物体検出アルゴリズムを開発。",
        "CVモデルの学習・検証用エンドツーエンドデータパイプラインを設計・実装。",
        "YOLOおよびViTモデルの実験を主導し、推論遅延とmAP精度の最適化を実現。"
      ]
    },
    {
      role: "AI Engineer (Internship)",
      role_ar: "مهندس ذكاء اصطناعي (تدريب)",
      role_ja: "AIエンジニア（インターン）",
      company: "ITI (Information Technology Institute)",
      period: "Aug 2025",
      period_ar: "أغسطس 2025",
      period_ja: "2025年8月",
      badge: "Production AI",
      highlights: [
        "Developed predictive ML models boosting production forecast accuracy.",
        "Designed natural language algorithms enhancing user dialogue and query understanding.",
        "Investigated emerging generative architectures to advise technical engineering roadmaps."
      ],
      highlights_ar: [
        "تطوير نماذج تعلم آلي زادت من دقة التنبؤ والتحليل في بيئات الإنتاج الحية.",
        "تصميم خوارزميات معالجة لغات طبيعية لتعزيز جودة وتفاعل المستخدمين.",
        "بحث أحدث تقنيات الذكاء الاصطناعي التوليدي للمساهمة في رسم الخارطة التقنية للمشاريع."
      ],
      highlights_ja: [
        "実運用環境におけるデータ分析と予測精度を大幅に高めるMLモデルを開発。",
        "ユーザーインタラクションを向上させる自然言語処理アルゴリズムを設計。",
        "最新の生成AI技術を調査し、プロジェクトの技術ロードマップ策定に貢献。"
      ]
    }
  ],

  education: [
    {
      degree: "B.Sc. in Mechatronics Engineering",
      degree_ar: "بكالوريوس هندسة الميكاترونيات",
      degree_ja: "学士（メカトロニクス工学）",
      institution: "Egypt-Japan University of Science and Technology (E-JUST)",
      institution_ar: "الجامعة المصرية اليابانية للعلوم والتكنولوجيا (E-JUST)",
      institution_ja: "エジプト・日本科学技術大学 (E-JUST)",
      period: "Oct 2022 – Feb 2027",
      location: "New Burg El-Arab, Egypt",
      thesis: "Thesis: Modular control system for robotic arms, improving precision by 15% vs. traditional methods.",
      thesis_ar: "أطروحة التخرج: نظام تحكم تركيبي للأذرع الروبوتية، محققاً زيادة 15% في الدقة مقارنة بالطرق التقليدية.",
      thesis_ja: "卒業論文：モジュラー型ロボットアーム制御システム（従来手法比で精度15%向上）。",
      highlights: [
        "Specialization in robotic software development and artificial intelligence integration.",
        "Active member of the Mechatronics Club; led university team in national robotics competitions."
      ],
      highlights_ar: [
        "تخصص دقيق في تطوير برمجيات الروبوتات ودمج الذكاء الاصطناعي في المنظومات الميكانيكية.",
        "عضو نشط في نادي الميكاترونيات؛ قيادة فريق الجامعة في المسابقات الروبوتية الوطنية."
      ],
      highlights_ja: [
        "ロボットソフトウェア開発およびAI統合の専門分野を専攻。",
        "メカトロニクスクラブの主力メンバーとして、国内ロボットコンテストで大学チームを牽引。"
      ]
    }
  ],

  certifications: [
    { name: "AWS AI Engineer", issuer: "Amazon Web Services", category: "cloud" },
    { name: "Generative AI Engineer", issuer: "ITI / NVIDIA", category: "genai" },
    { name: "Machine Learning Scientist", issuer: "DataCamp", category: "ml" },
    { name: "Data Scientist", issuer: "DataCamp", category: "data" },
    { name: "Data Scientist", issuer: "IBM", category: "data" },
    { name: "NLP Engineer", issuer: "NTI", category: "nlp" },
    { name: "Computer Vision Engineer", issuer: "NAID", category: "cv" }
  ],

  skills: {
    ml: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Deep Learning", "Reinforcement Learning (DQN/PPO)", "Hugging Face"],
    nlp: ["Transformers", "BERT", "GPT", "TrOCR", "Arabic OCR", "Seq2Seq", "Tokenization", "Sentiment Analysis", "Topic Modeling", "LangChain"],
    cv: ["CNNs", "Vision Transformers (ViT)", "Diffusion Models", "YOLO", "OpenCV", "Real-Time Image Processing", "Object Detection"],
    robotics: ["C++ Programming", "Inverse Kinematics", "Cubic Spline Path Planning", "ROS", "Mechatronics Control", "Embedded AI"],
    data: ["Feature Engineering", "Data Preprocessing", "Statistical Modeling", "Git / GitHub", "AWS Cloud", "Linux / Bash"]
  },

  languages: [
    { name: "Arabic", level: "Native", code: "ar" },
    { name: "English", level: "Fluent", code: "en" },
    { name: "Japanese", level: "Proficient", code: "ja" }
  ]
};

// Export to window for global browser access
window.PORTFOLIO_DATA = PORTFOLIO_DATA;

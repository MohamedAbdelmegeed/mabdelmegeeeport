export type Language = "en" | "ar";

export const translations = {
  en: {
    // Navbar
    nav: {
      about: "About",
      skills: "Skills",
      journey: "Journey",
      development: "Development",
      projects: "Projects",
      contact: "Contact",
    },
    // Hero
    hero: {
      greeting: "> hello_world",
      name: "Mohamed Abdelmegeed",
      intro: "I'm ",
      subtitle: "FULL STACK DEVELOPER",
      gap: "Passionate about building elegant solutions.",
      cta: "Get in touch",
      cv: "Download CV",
    },
    // About
    about: {
      tag: "// about",
      title: "About ",
      titleHighlight: "Me",
      p1: "Full-Stack Developer passionate about transforming ideas into powerful, scalable web applications. With a solid foundation in software engineering, strong problem-solving skills, and hands-on experience with Python, Java, JavaScript, SQL, Git/GitHub and modern web technologies, I enjoy building efficient, reliable, and user-centered solutions. Committed to continuous learning, I aim to grow as a software engineer while gradually expanding into Data Science and AI to combine robust application development with intelligent, data-driven innovation.",
      p2: "I take pleasure in discovering how software can address real-world challenges. Enthusiastic about learning, contributing to team projects, and gaining practical experience.",
      p3: "Currently pursuing a Bachelor's in Computer Science & AI at Helwan National University while training in Data Science through the Digital Egypt Pioneers Initiative (DEPI).",
      h1Title: "Software Development",
      h1Desc: "Building clean, scalable applications",
      h2Title: "Data Science",
      h2Desc: "Extracting insights from complex data",
      h3Title: "Problem Solver",
      h3Desc: "Turning ideas into elegant solutions",
    },
    // Timeline
    timeline: {
      tag: "// journey",
      title: "Education & ",
      titleHighlight: "Experience",
      items: [
        {
          title: "B.Sc. Computer Science & AI",
          org: "Helwan National University",
          date: "Sep 2024 – Present",
          details: "Level 2 · GPA: 3.2 · Cairo, Egypt",
        },
        {
          title: "Data Engineering Trainee",
          org: "Digital Egypt Pioneers Initiative (DEPI)",
          date: "Nov 2025 – Present",
          details: "Intensive data science program by the Egyptian government",
        },
        {
          title: "Customer Service Representative",
          org: "Concentrix (Verizon Account)",
          date: "Jun 2025 – Oct 2025",
          details: "Handled customer inquiries and support for Verizon services",
        },
        {
          title: "Senior Mentor",
          org: "Royal Tot's Camp",
          date: "2023 , 2024",
          details: "Led mentoring programs and guided younger participants",
        },
      ],
    },
    // Skills
    skills: {
      tag: "// skills",
      title: "Tech ",
      titleHighlight: "Stack",
      toolsTitle: "Tools & IDEs",
      languagesTitle: "Languages",
    },
    // Projects
    projects: {
      tag: "// projects",
      title: "Featured ",
      titleHighlight: "Work",
      subtitle: "A selection of projects I've been working on.",
      items: [
        {
          title: "Leadership Institute (LDI) Website",
          description: "Developing a web-based platform for institutional presence and information delivery for the Ministry of Higher Education, Egypt.",
          status: "Finished",
        },
        {
          title: "CoreX Gym",
          description: "A modern fitness website featuring class schedules, membership plans, and an engaging UI for a premium gym experience.",
          status: "Finished",
        },
        {
          title: "A Fitness Coach Portfolio",
          description: "Personal Landing Page for Fitness Coach (Captain Fouad El-Agamy) Designed and developed a modern, responsive landing page for a gym and nutrition coach, The page is fully mobile-friendly, clean, and easy to customize, focusing on user experience and smooth interaction.",
          status: "Finished",
        },
        {
          title: "Hypermarket Full Java system ",
          description: "Developed a Java-based Hyper Market Management System using OOP principles and file handling to manage products, customers, and sales operations efficiently with a simple and structured console-based interface.",
          status: "Finished",
        },
        {
          title: "N-Puzzle Ai solver ",
          description: "An Intelligent N-Puzzle Solver (8, 15, and 24) implemented in Python using Best-First Search with multiple heuristics (e.g., Misplaced Tiles and Manhattan Distance) to optimize state-space search and improve solution efficiency.",
          status: "Finished",
        },
        {
          title: "More Projects Coming Soon",
          description: "Currently working on exciting projects in data science and web development. Stay tuned!",
          status: "Planned",
        },
      ],
    },
    // Professional Development
    development: {
      tag: "// growth",
      title: "Professional ",
      titleHighlight: "Development",
      activitiesTitle: "Activities & ",
      activitiesHighlight: "Leadership",
      events: [
        { date: "Sep 2025", title: "G-Force Student Activities Forum (2nd Edition)", org: "Galala National University" },
        { date: "Sep 2025", title: "Training on Protocol, Etiquette & Workplace Formalities", org: "Leadership Candidates Program" },
        { date: "Oct 2025", title: "Future Leaders Forum", org: "Leadership Development Institute (LDI), Ministry of Higher Education" },
        { date: "Nov 2025", title: "S.H.I.N.E Initiative", org: "Cairo University" },
        { date: "Nov 2025", title: "AI, Science & Innovation Celebration", org: "Helwan University (Sponsored by Roseatom)" },
      ],
      activities: [
        
        "Leadership Tech Support Member – Leadership Development Institute (LDI), Ministry of Higher Education",
        "Web Dev member in Tech Team – FCSIT Scientific Committee – HNU",
        "Faculty Leader for Level 2 – Computer Science – HNU",
        "Vice Head, Art Committee – Faculty Student Union",
      ],
    },
    // Contact
    contact: {
      tag: "// contact",
      title: "Let's ",
      titleHighlight: "Connect",
      subtitle: "I'm always open to new opportunities, collaborations, and interesting conversations.",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    // Footer
    footer: {
      text: "Mohamed Abdelmegeed · Built with passion & code",
    },
  },
  ar: {
    nav: {
      about: "عني",
      skills: "المهارات",
      journey: "المسيرة",
      development: "التطوير",
      projects: "المشاريع",
      contact: "تواصل",
    },
    hero: {
      greeting: "> مرحبا_بالعالم",
      name: "محمد عبدالمجيد",
      intro: "أنا ",
      subtitle: "مطور برمجيات. شغوف ببناء حلول أنيقة .",
      cta: "تواصل معي",
      cv: "تحميل السيرة الذاتية",
    },
    about: {
      tag: "// عني",
      title: "عن ",
      titleHighlight: "نفسي",
      p1: "مبرمج لديه شغف عميق بالبرمجة وحل المشكلات والتكنولوجيا. أبني حالياً أساساً متيناً في لغات مثل C و C++ و Python و JavaScript.",
      p2: "أستمتع باكتشاف كيف يمكن للبرمجيات معالجة التحديات الواقعية. متحمس للتعلم والمساهمة في المشاريع الجماعية واكتساب الخبرة العملية.",
      p3: "أدرس حالياً بكالوريوس علوم الحاسب والذكاء الاصطناعي في جامعة حلوان الأهلية بينما أتدرب في علم البيانات من خلال مبادرة رواد مصر الرقمية (DEPI).",
      h1Title: "تطوير البرمجيات",
      h1Desc: "بناء تطبيقات نظيفة وقابلة للتوسع",
      h2Title: "علم البيانات",
      h2Desc: "استخلاص رؤى من بيانات معقدة",
      h3Title: "حل المشكلات",
      h3Desc: "تحويل الأفكار إلى حلول أنيقة",
    },
    timeline: {
      tag: "// المسيرة",
      title: "التعليم و",
      titleHighlight: "الخبرة",
      items: [
        {
          title: "بكالوريوس علوم الحاسب والذكاء الاصطناعي",
          org: "جامعة حلوان الأهلية",
          date: "سبتمبر 2024 – الحالي",
          details: "المستوى الثاني · المعدل التراكمي: 3.26 · القاهرة، مصر",
        },
        {
          title: "متدرب في علم البيانات",
          org: "مبادرة رواد مصر الرقمية (DEPI)",
          date: "ديسمبر 2025 – الحالي",
          details: "برنامج مكثف في علم البيانات من الحكومة المصرية",
        },
        {
          title: "ممثل خدمة العملاء",
          org: "كونسنتركس (حساب فيريزون)",
          date: "يونيو 2025 – أكتوبر 2025",
          details: "التعامل مع استفسارات العملاء ودعم خدمات فيريزون",
        },
        {
          title: "مرشد أول",
          org: "معسكر رويال توتس",
          date: "2023 – 2024",
          details: "قيادة برامج الإرشاد وتوجيه المشاركين الأصغر سناً",
        },
      ],
    },
    skills: {
      tag: "// المهارات",
      title: "المجموعة ",
      titleHighlight: "التقنية",
      toolsTitle: "الأدوات وبيئات التطوير",
      languagesTitle: "اللغات",
    },
    projects: {
      tag: "// المشاريع",
      title: "أعمال ",
      titleHighlight: "مميزة",
      subtitle: "مجموعة مختارة من المشاريع التي عملت عليها.",
      items: [
        {
          title: "موقع معهد القيادة (LDI)",
          description: "تطوير منصة إلكترونية للتواجد المؤسسي وتقديم المعلومات لوزارة التعليم العالي، مصر.",
          status: "مكتمل",
        },
        {
          title: "CoreX Gym",
          description: "موقع لياقة بدنية حديث يتضمن جداول التمارين وخطط العضوية وواجهة مستخدم جذابة لتجربة صالة رياضية متميزة.",
          status: "مكتمل",
        },
        {
  title: "صفحة شخصية لمدرب لياقة بدنية",
  description: "ملف شخصي لمدرب لياقة بدنية (الكابتن فؤاد العجمي) تم تصميمه وتطويره كصفحة هبوط عصرية ومتجاوبة لمدرب جيم وتغذية. الصفحة متوافقة مع الموبايل وسهلة التعديل وتركز على تجربة المستخدم وسلاسة التفاعل.",
  status: "مكتمل",
},
{
  title: "نظام إدارة هايبر ماركت كامل بلغة Java",
  description: "تم تطوير نظام إدارة هايبر ماركت باستخدام Java يعتمد على مفاهيم البرمجة الكائنية (OOP) والتعامل مع الملفات لإدارة المنتجات والعملاء والمبيعات بشكل فعال من خلال واجهة نصية بسيطة ومنظمة.",
  status: "مكتمل",
},
{
  title: "محلّل N-Puzzle بالذكاء الاصطناعي",
  description: "تم تطوير محلل ذكي لمشكلة N-Puzzle (8، 15، و24) باستخدام Python وخوارزمية Best-First Search مع عدة دوال heuristic لتحسين البحث في فضاء الحالات وتقليل عدد الحالات التي يتم استكشافها للوصول للحل بكفاءة أعلى.",
  status: "مكتمل",
},
        {
          title: "المزيد من المشاريع قريباً",
          description: "أعمل حالياً على مشاريع مثيرة في علم البيانات وتطوير الويب. ترقبوا!",
          status: "مخطط",
        },
      ],
    },
    development: {
      tag: "// النمو",
      title: "التطوير ",
      titleHighlight: "المهني",
      activitiesTitle: "الأنشطة و",
      activitiesHighlight: "القيادة",
      events: [
        { date: "سبتمبر 2025", title: "منتدى أنشطة طلاب جي-فورس (الإصدار الثاني)", org: "جامعة الجلالة الأهلية" },
        { date: "سبتمبر 2025", title: "تدريب على البروتوكول والإتيكيت وآداب العمل", org: "برنامج مرشحي القيادة" },
        { date: "أكتوبر 2025", title: "منتدى قادة المستقبل", org: "معهد تنمية القيادات (LDI)، وزارة التعليم العالي" },
        { date: "نوفمبر 2025", title: "مبادرة S.H.I.N.E", org: "جامعة القاهرة" },
        { date: "نوفمبر 2025", title: "احتفالية الذكاء الاصطناعي والعلوم والابتكار", org: "جامعة حلوان (برعاية روساتوم)" },
      ],
      activities: [
        "عضو دعم قيادي – معهد تنمية القيادات (LDI)، وزارة التعليم العالي",
        "قائد دفعة المستوى الثاني – علوم الحاسب – جامعة حلوان الأهلية",
        "نائب رئيس لجنة الفنون – اتحاد طلاب الكلية",
      ],
    },
    contact: {
      tag: "// تواصل",
      title: "هيا ",
      titleHighlight: "نتواصل",
      subtitle: "أنا دائماً منفتح على الفرص الجديدة والتعاون والمحادثات الممتعة.",
      email: "البريد الإلكتروني",
      linkedin: "لينكد إن",
      github: "جيت هب",
    },
    footer: {
      text: "محمد عبدالمجيد · بُني بشغف وكود",
    },
  },
} as const;

export type Translations = (typeof translations)[Language];

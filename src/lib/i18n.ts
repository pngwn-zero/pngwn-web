export type LanguageCode = "en" | "es" | "fr" | "de" | "pt" | "ja";

export function isLanguageCode(value: string): value is LanguageCode {
  return value === "en" || value === "es" || value === "fr" || value === "de" || value === "pt" || value === "ja";
}

export const LANGUAGE_OPTIONS: Array<{ code: LanguageCode; label: string; flag: string }> = [
  { code: "en", label: "English", flag: "🇺🇸🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
];

export type LandingCopy = {
  languageLabel: string;
  nav: { contact: string; about: string };
  quote: {
    line1Prefix: string;
    highlight: string;
    line2: string;
    line3: string;
    line4: string;
    line5: string;
    attribution: string;
  };
  why: { pink: string; rest: string };
  bullets: {
    one: { title: string; highlight: string; subtitle: string };
    two: { title: string; subtitlePrefix: string; subtitleHighlight: string };
    three: { title: string; highlight: string; subtitle: string };
  };
  free: {
    title1: string;
    title2: string;
    headline: string;
    noCatch: string;
    visitPrefix: string;
    visitLink: string;
    visitSuffix: string;
  };
  waitlist: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    messages: {
      successPrimary: string;
      successSecondary: string;
      duplicatePrimary: string;
      duplicateSecondary: string;
      invalidPrimary: string;
      invalidSecondary: string;
      fallbackPrimary: string;
      fallbackSecondary: string;
    };
  };
  footer: {
    chatPrompt: string;
    email: string;
    siteText: string;
    yearText: string;
  };
  pages: {
    aboutTitle: string;
    aboutBody: string;
    contactTitle: string;
    contactBody: string;
    homeLink: string;
  };
};

export const LANDING_COPY: Record<LanguageCode, LandingCopy> = {
  en: {
    languageLabel: "Language",
    nav: { contact: "contact", about: "about" },
    quote: {
      line1Prefix: '"the',
      highlight: "most accurate",
      line2: "daily weather app",
      line3: "for people who are",
      line4: "exposed to the",
      line5: 'elements"',
      attribution: "- the penguin, probably",
    },
    why: { pink: "why", rest: " pngwn?" },
    bullets: {
      one: {
        title: "weather -> outfit,",
        highlight: "instantly",
        subtitle: "Dress right the first time",
      },
      two: {
        title: "because windchill hits everyone differently",
        subtitlePrefix: "Comfort should be",
        subtitleHighlight: "personalized",
      },
      three: {
        title: 'your daily "what do I wear?"',
        highlight: "solved",
        subtitle: "Let the penguin decide how many layers",
      },
    },
    free: {
      title1: "and we saved",
      title2: "the best for last:",
      headline: "100% free for every feature",
      noCatch: "No catch",
      visitPrefix: "Visit our",
      visitLink: "how we make money",
      visitSuffix: "page to learn more",
    },
    waitlist: {
      title: "join the waitlist",
      subtitle: "and get important updates from the penguin",
      placeholder: "email@domain.com",
      button: "join",
      messages: {
        successPrimary: "the penguin will contact you shortly",
        successSecondary: "the penguin values your inbox and avoids unnecessary messages",
        duplicatePrimary: "duplicate email detected",
        duplicateSecondary: "the penguin recommends an amnesia consultation",
        invalidPrimary: "the penguin can't parse this email format",
        invalidSecondary: "use a format like name@domain.com",
        fallbackPrimary: "the penguin hit turbulence while processing your request",
        fallbackSecondary: "please try again in a moment",
      },
    },
    footer: {
      chatPrompt: "want to chat?",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "about pngwn",
      aboutBody:
        "pngwn helps you decide what to wear using personalized weather guidance learned from your real routines.",
      contactTitle: "contact pngwn",
      contactBody: "Questions, ideas, or feedback? Reach us at hello@pngwn.org.",
      homeLink: "back to home",
    },
  },
  es: {
    languageLabel: "Idioma",
    nav: { contact: "contacto", about: "acerca de" },
    quote: {
      line1Prefix: '"la',
      highlight: "más precisa",
      line2: "app diaria del clima",
      line3: "para personas que están",
      line4: "expuestas a los",
      line5: 'elementos"',
      attribution: "- el pingüino, probablemente",
    },
    why: { pink: "por qué", rest: " pngwn?" },
    bullets: {
      one: {
        title: "clima -> outfit,",
        highlight: "al instante",
        subtitle: "Vístete bien desde la primera vez",
      },
      two: {
        title: "porque el viento frío afecta distinto a cada persona",
        subtitlePrefix: "La comodidad debe ser",
        subtitleHighlight: "personalizada",
      },
      three: {
        title: 'tu "¿qué me pongo?" diario',
        highlight: "resuelto",
        subtitle: "Deja que el pingüino decida cuántas capas",
      },
    },
    free: {
      title1: "y guardamos",
      title2: "lo mejor para el final:",
      headline: "100% gratis en todas las funciones",
      noCatch: "Sin truco",
      visitPrefix: "Visita nuestra página de",
      visitLink: "cómo ganamos dinero",
      visitSuffix: "para saber más",
    },
    waitlist: {
      title: "únete a la lista de espera",
      subtitle: "y recibe actualizaciones importantes del pingüino",
      placeholder: "correo@dominio.com",
      button: "unirme",
      messages: {
        successPrimary: "el pingüino te contactará pronto",
        successSecondary: "el pingüino valora tu bandeja y evita mensajes innecesarios",
        duplicatePrimary: "correo duplicado detectado",
        duplicateSecondary: "el pingüino recomienda una consulta de amnesia",
        invalidPrimary: "el pingüino no puede leer ese formato de correo",
        invalidSecondary: "usa un formato como nombre@dominio.com",
        fallbackPrimary: "el pingüino tuvo turbulencias al procesar tu solicitud",
        fallbackSecondary: "inténtalo de nuevo en un momento",
      },
    },
    footer: {
      chatPrompt: "¿quieres hablar?",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "sobre pngwn",
      aboutBody:
        "pngwn te ayuda a decidir qué vestir con orientación climática personalizada basada en tu rutina real.",
      contactTitle: "contactar a pngwn",
      contactBody: "¿Preguntas, ideas o feedback? Escríbenos a hello@pngwn.org.",
      homeLink: "volver al inicio",
    },
  },
  fr: {
    languageLabel: "Langue",
    nav: { contact: "contact", about: "à propos" },
    quote: {
      line1Prefix: '"la',
      highlight: "plus précise",
      line2: "appli météo quotidienne",
      line3: "pour les personnes",
      line4: "exposées aux",
      line5: 'éléments"',
      attribution: "- le pingouin, probablement",
    },
    why: { pink: "pourquoi", rest: " pngwn ?" },
    bullets: {
      one: {
        title: "météo -> tenue,",
        highlight: "instantanément",
        subtitle: "Habille-toi correctement du premier coup",
      },
      two: {
        title: "car le ressenti du vent est différent pour chacun",
        subtitlePrefix: "Le confort doit être",
        subtitleHighlight: "personnalisé",
      },
      three: {
        title: 'ton "je mets quoi ?" quotidien',
        highlight: "résolu",
        subtitle: "Laisse le pingouin décider du nombre de couches",
      },
    },
    free: {
      title1: "et on a gardé",
      title2: "le meilleur pour la fin :",
      headline: "100% gratuit pour toutes les fonctionnalités",
      noCatch: "Sans piège",
      visitPrefix: "Visite notre page",
      visitLink: "comment on gagne de l'argent",
      visitSuffix: "pour en savoir plus",
    },
    waitlist: {
      title: "rejoins la liste d'attente",
      subtitle: "et reçois les mises à jour importantes du pingouin",
      placeholder: "email@domaine.com",
      button: "rejoindre",
      messages: {
        successPrimary: "le pingouin te contactera bientôt",
        successSecondary: "le pingouin respecte ta boîte mail et évite le superflu",
        duplicatePrimary: "email en double détecté",
        duplicateSecondary: "le pingouin conseille une consultation amnésie",
        invalidPrimary: "le pingouin ne comprend pas ce format d'email",
        invalidSecondary: "utilise un format comme nom@domaine.com",
        fallbackPrimary: "le pingouin a rencontré une turbulence",
        fallbackSecondary: "réessaie dans un instant",
      },
    },
    footer: {
      chatPrompt: "on discute ?",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "à propos de pngwn",
      aboutBody:
        "pngwn t'aide à choisir ta tenue grâce à une météo personnalisée basée sur ton usage réel.",
      contactTitle: "contacter pngwn",
      contactBody: "Questions, idées, retours ? Écris-nous à hello@pngwn.org.",
      homeLink: "retour à l'accueil",
    },
  },
  de: {
    languageLabel: "Sprache",
    nav: { contact: "kontakt", about: "über uns" },
    quote: {
      line1Prefix: '"die',
      highlight: "präziseste",
      line2: "tägliche Wetter-App",
      line3: "für Menschen, die",
      line4: "den Elementen",
      line5: 'ausgesetzt sind"',
      attribution: "- der Pinguin, vermutlich",
    },
    why: { pink: "warum", rest: " pngwn?" },
    bullets: {
      one: {
        title: "wetter -> outfit,",
        highlight: "sofort",
        subtitle: "Zieh dich direkt richtig an",
      },
      two: {
        title: "weil Windchill jeden anders trifft",
        subtitlePrefix: "Komfort sollte",
        subtitleHighlight: "personalisiert sein",
      },
      three: {
        title: 'dein tägliches "was soll ich anziehen?"',
        highlight: "gelöst",
        subtitle: "Lass den Pinguin die Lagen entscheiden",
      },
    },
    free: {
      title1: "und wir haben",
      title2: "das Beste zum Schluss:",
      headline: "100% kostenlos für jede Funktion",
      noCatch: "Kein Haken",
      visitPrefix: "Besuche unsere Seite",
      visitLink: "wie wir Geld verdienen",
      visitSuffix: "für mehr Infos",
    },
    waitlist: {
      title: "tritt der Warteliste bei",
      subtitle: "und erhalte wichtige Updates vom Pinguin",
      placeholder: "email@domain.com",
      button: "beitreten",
      messages: {
        successPrimary: "der Pinguin meldet sich in Kürze",
        successSecondary: "der Pinguin schätzt dein Postfach und vermeidet Spam",
        duplicatePrimary: "doppelte E-Mail erkannt",
        duplicateSecondary: "der Pinguin empfiehlt eine Amnesie-Beratung",
        invalidPrimary: "der Pinguin versteht dieses E-Mail-Format nicht",
        invalidSecondary: "verwende ein Format wie name@domain.com",
        fallbackPrimary: "der Pinguin hatte Turbulenzen bei der Verarbeitung",
        fallbackSecondary: "bitte in einem Moment erneut versuchen",
      },
    },
    footer: {
      chatPrompt: "lust zu reden?",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "über pngwn",
      aboutBody:
        "pngwn hilft dir bei der Outfit-Wahl mit personalisierter Wetterlogik basierend auf deiner realen Routine.",
      contactTitle: "pngwn kontaktieren",
      contactBody: "Fragen, Ideen oder Feedback? Schreib uns an hello@pngwn.org.",
      homeLink: "zurück zur Startseite",
    },
  },
  pt: {
    languageLabel: "Idioma",
    nav: { contact: "contato", about: "sobre" },
    quote: {
      line1Prefix: '"o app de clima',
      highlight: "mais preciso",
      line2: "do dia a dia",
      line3: "para pessoas que ficam",
      line4: "expostas aos",
      line5: 'elementos"',
      attribution: "- o pinguim, provavelmente",
    },
    why: { pink: "por que", rest: " pngwn?" },
    bullets: {
      one: {
        title: "clima -> roupa,",
        highlight: "na hora",
        subtitle: "Acerte no look logo de primeira",
      },
      two: {
        title: "porque sensação térmica afeta cada pessoa",
        subtitlePrefix: "Conforto precisa ser",
        subtitleHighlight: "personalizado",
      },
      three: {
        title: 'seu "o que eu visto?" diário',
        highlight: "resolvido",
        subtitle: "Deixe o pinguim decidir as camadas",
      },
    },
    free: {
      title1: "e guardamos",
      title2: "o melhor para o final:",
      headline: "100% grátis para todos os recursos",
      noCatch: "Sem pegadinha",
      visitPrefix: "Visite nossa página de",
      visitLink: "como ganhamos dinheiro",
      visitSuffix: "para saber mais",
    },
    waitlist: {
      title: "entre na lista de espera",
      subtitle: "e receba atualizações importantes do pinguim",
      placeholder: "email@dominio.com",
      button: "entrar",
      messages: {
        successPrimary: "o pinguim vai falar com você em breve",
        successSecondary: "o pinguim respeita sua caixa e evita mensagens desnecessárias",
        duplicatePrimary: "email duplicado detectado",
        duplicateSecondary: "o pinguim recomenda consulta de amnésia",
        invalidPrimary: "o pinguim não entendeu esse formato de email",
        invalidSecondary: "use um formato como nome@dominio.com",
        fallbackPrimary: "o pinguim encontrou turbulência no processamento",
        fallbackSecondary: "tente novamente em instantes",
      },
    },
    footer: {
      chatPrompt: "quer conversar?",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "sobre o pngwn",
      aboutBody:
        "o pngwn ajuda você a decidir o que vestir com previsão personalizada baseada na sua rotina real.",
      contactTitle: "contato do pngwn",
      contactBody: "Dúvidas, ideias ou feedback? Fale com hello@pngwn.org.",
      homeLink: "voltar para a home",
    },
  },
  ja: {
    languageLabel: "言語",
    nav: { contact: "連絡先", about: "概要" },
    quote: {
      line1Prefix: "「",
      highlight: "最も正確な",
      line2: "毎日の天気アプリ",
      line3: "屋外環境にさらされる",
      line4: "人のための",
      line5: "アプリ」",
      attribution: "- たぶんペンギンより",
    },
    why: { pink: "なぜ", rest: " pngwn?" },
    bullets: {
      one: {
        title: "天気 -> 服装、",
        highlight: "すぐ決まる",
        subtitle: "最初からちょうどいい服装に",
      },
      two: {
        title: "体感温度は人それぞれ違うから",
        subtitlePrefix: "快適さは",
        subtitleHighlight: "パーソナライズ",
      },
      three: {
        title: "毎日の「何を着る？」を",
        highlight: "解決",
        subtitle: "重ね着はペンギンにおまかせ",
      },
    },
    free: {
      title1: "そして最後に",
      title2: "いちばん大事なこと:",
      headline: "全機能100%無料",
      noCatch: "条件なし",
      visitPrefix: "詳しくは",
      visitLink: "収益の仕組み",
      visitSuffix: "ページへ",
    },
    waitlist: {
      title: "ウェイトリストに参加",
      subtitle: "ペンギンから重要なお知らせを受け取る",
      placeholder: "email@domain.com",
      button: "参加",
      messages: {
        successPrimary: "まもなくペンギンから連絡があります",
        successSecondary: "ペンギンはあなたの受信箱を尊重し、不要な連絡を避けます",
        duplicatePrimary: "重複メールを検知しました",
        duplicateSecondary: "ペンギンは記憶外来の受診をおすすめします",
        invalidPrimary: "このメール形式は認識できません",
        invalidSecondary: "name@domain.com の形式で入力してください",
        fallbackPrimary: "処理中にペンギンが乱気流に遭遇しました",
        fallbackSecondary: "少し待ってから再試行してください",
      },
    },
    footer: {
      chatPrompt: "話してみる？",
      email: "hello@pngwn.org",
      siteText: "pngwn.org",
      yearText: "2026 pngwn",
    },
    pages: {
      aboutTitle: "pngwnについて",
      aboutBody: "pngwnは、実際の行動パターンから学び、今日の服装を提案する天気ガイドです。",
      contactTitle: "pngwnへの連絡",
      contactBody: "質問・提案・感想は hello@pngwn.org まで。",
      homeLink: "ホームへ戻る",
    },
  },
};

/*
 * Built-in website assistant — works with no server and no API key.
 * It matches the visitor's question against a small knowledge base about the app
 * and answers in the language the question was written in.
 *
 * Answers only state what the website itself says about the app. Anything not
 * confirmed (pricing, offline use, release date…) gets an honest "not announced yet".
 */

import type { Lang } from '../data/content';

export interface BotReply {
  text: string;
  /** Optional button that scrolls to a section of the page. */
  link?: { label: string; href: string };
  /** Show the suggestion chips after this reply. */
  suggest?: boolean;
}

interface Intent {
  id: string;
  /** Keywords (already normalized). Arabic and English are both listed so either works. */
  keywords: string[];
  answer: Record<Lang, BotReply>;
}

/** Lower-case and unify common Arabic spelling variants so matching is forgiving. */
export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '') // diacritics + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const detectLang = (s: string): Lang => (/[؀-ۿ]/.test(s) ? 'ar' : 'en');

const intents: Intent[] = [
  {
    id: 'greeting',
    keywords: ['مرحبا', 'اهلا', 'هلا', 'السلام', 'سلام', 'مساء', 'صباح', 'كيفك', 'كيف حالك', 'hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer: {
      ar: { text: 'أهلاً وسهلاً! 👋 أنا المساعد الذكي لدفتري لديون. اسألني عن مميزات التطبيق، تسجيل الديون، الدفعات، أو كيف تبلّش.', suggest: true },
      en: { text: 'Hi there! 👋 I’m the Daftari Lidyoon assistant. Ask me about the app’s features, recording debts, payments, or how to get started.', suggest: true },
    },
  },
  {
    id: 'thanks',
    keywords: ['شكرا', 'مشكور', 'يعطيك العافيه', 'تسلم', 'thanks', 'thank you', 'thx', 'appreciate'],
    answer: {
      ar: { text: 'العفو! 🌟 إذا عندك أي سؤال ثاني أنا موجود.' },
      en: { text: 'You’re welcome! 🌟 I’m here if you have any other questions.' },
    },
  },
  {
    id: 'bye',
    keywords: ['مع السلامه', 'باي', 'وداعا', 'bye', 'goodbye', 'see you'],
    answer: {
      ar: { text: 'مع السلامة! 👋 ديونك مرتبة.. وحساباتك أوضح.' },
      en: { text: 'Goodbye! 👋 Organized debts.. clearer accounts.' },
    },
  },
  {
    id: 'what',
    keywords: ['شو هو', 'ما هو', 'شو التطبيق', 'ايش التطبيق', 'عن التطبيق', 'دفتري', 'لديون', 'تعريف', 'فكره', 'what is this', 'what is the app', 'about the app', 'daftari', 'lidyoon', 'tell me about'],
    answer: {
      ar: {
        text: 'دفتري لديون تطبيق عربي لإدارة الديون وحسابات العملاء. بدل الدفتر الورقي بتسجّل الديون، بتتابع الدفعات، وبتعرف المتبقي على كل عميل بنظرة وحدة.',
        link: { label: 'عن التطبيق', href: '#about' },
      },
      en: {
        text: 'Daftari Lidyoon is a debt and customer-accounts app. Instead of a paper notebook, you record debts, track payments and see what each customer owes at a glance.',
        link: { label: 'About the app', href: '#about' },
      },
    },
  },
  {
    id: 'audience',
    keywords: ['لمين', 'مين بيستخدم', 'مناسب', 'محل', 'محلات', 'تاجر', 'تجار', 'بقاله', 'سوبر ماركت', 'مشروع', 'who is it for', 'shop', 'store', 'merchant', 'small business', 'suitable'],
    answer: {
      ar: { text: 'التطبيق مناسب لأصحاب المحلات والتجّار والمشاريع الصغيرة، ولأي حدا ببيع بالدَّين أو بده ينظّم ديونه وحسابات عملائه.' },
      en: { text: 'It’s built for shop owners, merchants and small businesses — anyone who sells on credit or wants to organize debts and customer accounts.' },
    },
  },
  {
    id: 'features',
    keywords: ['مميزات', 'ميزات', 'خصائص', 'شو بيعمل', 'ايش بيعمل', 'شو بيقدم', 'خدمات', 'features', 'what can it do', 'capabilities', 'functions'],
    answer: {
      ar: {
        text: 'أهم المميزات:\n• إدارة الديون وتسجيلها بثوانٍ\n• متابعة المدفوعات (كاملة أو جزئية)\n• صفحة خاصة لحساب كل عميل\n• تقارير وإحصائيات مالية واضحة\n• مساعد ذكي يجاوبك عن حساباتك',
        link: { label: 'شوف المميزات', href: '#features' },
      },
      en: {
        text: 'Key features:\n• Record and manage debts in seconds\n• Track payments (full or partial)\n• A dedicated account page per customer\n• Clear financial reports & insights\n• A smart assistant for questions about your accounts',
        link: { label: 'See features', href: '#features' },
      },
    },
  },
  {
    id: 'debts',
    keywords: ['سجل دين', 'اسجل', 'تسجيل', 'اضيف دين', 'دين جديد', 'ديون', 'دين', 'record debt', 'add debt', 'new debt', 'debt', 'debts'],
    answer: {
      ar: { text: 'تسجيل الدين سهل: بتختار العميل (أو بتضيفه)، بتكتب المبلغ والتاريخ وملاحظة إذا بدك، وخلص. الدين بيتسجّل على حساب العميل مباشرة.' },
      en: { text: 'Recording a debt is simple: pick (or add) the customer, enter the amount, the date and an optional note — done. It’s added straight to the customer’s account.' },
    },
  },
  {
    id: 'payments',
    keywords: ['دفعه', 'دفعات', 'سداد', 'جزئي', 'جزئيه', 'تقسيط', 'اقساط', 'دفع', 'المتبقي', 'الباقي', 'payment', 'payments', 'partial', 'installment', 'remaining', 'balance', 'pay'],
    answer: {
      ar: {
        text: 'أكيد، بتقدر تسجّل أي دفعة مهما كان مبلغها، كاملة أو جزئية، والتطبيق بيحسب المتبقي على العميل تلقائياً. جرّب الفكرة بنفسك بالحاسبة بالموقع 👇',
        link: { label: 'جرّب الحاسبة', href: '#calculator' },
      },
      en: {
        text: 'Yes — record any payment, full or partial, and the app calculates the customer’s remaining balance automatically. Try the idea yourself with the calculator 👇',
        link: { label: 'Try the calculator', href: '#calculator' },
      },
    },
  },
  {
    id: 'customers',
    keywords: ['عميل', 'عملاء', 'زبون', 'زباين', 'زبائن', 'حساب كل', 'رصيد', 'customer', 'customers', 'client', 'clients', 'account'],
    answer: {
      ar: { text: 'لكل عميل صفحة خاصة فيها كل ديونه ودفعاته ورصيده الحالي. وبتقدر تبحث عن أي عميل وتوصل لحسابه فوراً.' },
      en: { text: 'Every customer has a dedicated page with all their debts, payments and current balance — and you can search for any customer instantly.' },
    },
  },
  {
    id: 'reports',
    keywords: ['تقرير', 'تقارير', 'احصائيات', 'احصائيه', 'رسوم', 'ارباح', 'report', 'reports', 'statistics', 'stats', 'insights', 'charts', 'analytics'],
    answer: {
      ar: { text: 'نعم، التطبيق بيعرضلك إجمالي المستحقات، المبالغ المحصّلة، وحركة حساباتك بأرقام ورسوم واضحة.' },
      en: { text: 'Yes — the app shows your total receivables, amounts collected and account activity with clear numbers and charts.' },
    },
  },
  {
    id: 'reminders',
    keywords: ['تذكير', 'يذكر', 'ذكرني', 'تنبيه', 'تنبيهات', 'انسى', 'نسيان', 'موعد', 'مواعيد', 'remind', 'reminder', 'reminders', 'notification', 'forget', 'due date'],
    answer: {
      ar: { text: 'التطبيق بيساعدك ما تنسى المستحقات: بتشوف مين عليه دفعات مستحقة، وبيذكّرك بمواعيد السداد.' },
      en: { text: 'The app helps you never forget dues — you can see who has payments due and get reminded of due dates.' },
    },
  },
  {
    id: 'myData',
    keywords: ['مين عليه', 'كم حصلت', 'كم علي', 'حساباتي', 'ديوني', 'who owes', 'how much did i', 'my debts', 'my customers'],
    answer: {
      ar: { text: 'داخل التطبيق، المساعد الذكي بيجاوبك من بيانات دفترك مباشرة (مثل: مين عليه ديون متأخرة؟). أما هون بالموقع فأنا بجاوب عن التطبيق نفسه، لأنه ما في وصول لحساباتك.' },
      en: { text: 'Inside the app, the smart assistant answers from your own ledger (e.g. “who has overdue debts?”). Here on the website I answer questions about the app itself — I have no access to your accounts.' },
    },
  },
  {
    id: 'security',
    keywords: ['امان', 'امن', 'امنه', 'امينه', 'محفوظه', 'خصوصيه', 'بياناتي', 'حمايه', 'محميه', 'سريه', 'بصمه', 'قفل', 'نسخ احتياطي', 'security', 'secure', 'privacy', 'safe', 'data safe', 'protect', 'backup', 'lock'],
    answer: {
      ar: { text: 'بياناتك تخصّك وحدك، وحمايتها جزء أساسي من تصميم التطبيق. تفاصيل الأمان موجودة بقسم الأمان والخصوصية.', link: { label: 'الأمان والخصوصية', href: '#security' } },
      en: { text: 'Your data belongs to you, and protecting it is a core part of the app’s design. See the security & privacy section for details.', link: { label: 'Security & privacy', href: '#security' } },
    },
  },
  {
    id: 'price',
    keywords: ['سعر', 'اسعار', 'كم سعره', 'مجاني', 'ببلاش', 'اشتراك', 'تكلفه', 'فلوس', 'price', 'pricing', 'cost', 'free', 'subscription', 'how much'],
    answer: {
      ar: { text: 'تفاصيل الأسعار لسا ما انعلنت رسمياً. تابعنا، وأول ما تنزل بتلاقيها على صفحة التطبيق بالمتاجر. وإذا عندك استفسار خاص، تواصل مع الفريق.', link: { label: 'تواصل معنا', href: '#contact' } },
      en: { text: 'Pricing hasn’t been officially announced yet. Stay tuned — it will be on the store page at launch. For anything specific, contact the team.', link: { label: 'Contact us', href: '#contact' } },
    },
  },
  {
    id: 'download',
    keywords: ['تحميل', 'تنزيل', 'نزل', 'نزّل', 'حمل', 'وين القاه', 'متجر', 'اندرويد', 'ايفون', 'جوجل بلاي', 'اب ستور', 'ابدا', 'بلش', 'متي بينزل', 'download', 'install', 'android', 'iphone', 'ios', 'google play', 'app store', 'get started', 'start', 'where can i'],
    answer: {
      ar: { text: 'التطبيق قريباً على Google Play وApp Store 📱 لما ينزل: حمّله، أضف عملاءك، وابدأ تسجّل ديونك بخطوات بسيطة.', link: { label: 'روابط التحميل', href: '#download' } },
      en: { text: 'The app is coming soon to Google Play and the App Store 📱 Once it’s out: download it, add your customers and start recording debts in a few simple steps.', link: { label: 'Download links', href: '#download' } },
    },
  },
  {
    id: 'how',
    keywords: ['كيف بيشتغل', 'كيف يعمل', 'طريقه', 'خطوات', 'كيف استخدم', 'استخدام', 'how does it work', 'how it works', 'steps', 'how to use'],
    answer: {
      ar: { text: 'ببساطة 3 خطوات:\n1. سجّل ديونك وحسابات عملائك\n2. تابع المدفوعات والمبالغ المستحقة\n3. حافظ على حساباتك منظمة وواضحة', link: { label: 'كيف يعمل', href: '#how' } },
      en: { text: 'Just 3 steps:\n1. Record your debts and customer accounts\n2. Track payments and amounts due\n3. Keep your accounts organized and clear', link: { label: 'How it works', href: '#how' } },
    },
  },
  {
    id: 'language',
    keywords: ['لغه', 'عربي', 'انجليزي', 'انكليزي', 'language', 'arabic', 'english'],
    answer: {
      ar: { text: 'التطبيق مصمّم بواجهة عربية سهلة، والموقع متوفر بالعربي والإنجليزي (زر EN فوق).' },
      en: { text: 'The app is designed Arabic-first with an easy interface, and this website is available in Arabic and English (the language button at the top).' },
    },
  },
  {
    id: 'offline',
    keywords: ['بدون نت', 'بدون انترنت', 'اوفلاين', 'انترنت', 'offline', 'without internet', 'internet'],
    answer: {
      ar: { text: 'ما عندي معلومة مؤكدة عن هالتفصيلة لسا. اسأل الفريق مباشرة وبيجاوبوك بدقة.', link: { label: 'تواصل معنا', href: '#contact' } },
      en: { text: 'I don’t have confirmed information about that yet. Ask the team directly for an accurate answer.', link: { label: 'Contact us', href: '#contact' } },
    },
  },
  {
    id: 'contact',
    keywords: ['تواصل', 'اتصال', 'رقم', 'ايميل', 'بريد', 'واتساب', 'دعم', 'مساعده', 'فريق', 'contact', 'support', 'email', 'phone', 'whatsapp', 'team', 'help'],
    answer: {
      ar: { text: 'بتقدر تبعت رسالتك للفريق من نموذج "تواصل معنا" بالموقع، وبيرجعولك.', link: { label: 'تواصل معنا', href: '#contact' } },
      en: { text: 'You can send the team a message through the “Contact us” form on this site and they’ll get back to you.', link: { label: 'Contact us', href: '#contact' } },
    },
  },
  {
    id: 'bot',
    keywords: ['مين انت', 'شو انت', 'انت مين', 'روبوت', 'ذكاء', 'مساعد', 'who are you', 'are you a bot', 'robot', 'ai', 'assistant'],
    answer: {
      ar: { text: 'أنا المساعد الذكي لدفتري لديون 🤖 هون بالموقع بجاوب عن التطبيق، وجوّا التطبيق المساعد بيجاوبك عن حساباتك أنت.' },
      en: { text: 'I’m the Daftari Lidyoon smart assistant 🤖 Here on the website I answer questions about the app; inside the app, the assistant answers questions about your own accounts.' },
    },
  },
];

const fallback: Record<Lang, BotReply> = {
  ar: { text: 'ما فهمت سؤالك تماماً 🤔 جرّب تسألني عن: المميزات، تسجيل الديون، الدفعات، التقارير، أو كيف تبلّش.', suggest: true },
  en: { text: 'I didn’t quite get that 🤔 Try asking about: features, recording debts, payments, reports, or how to get started.', suggest: true },
};

/** Picks the best-matching intent. Longer (more specific) keyword matches score higher. */
export function localReply(question: string): BotReply {
  const lang = detectLang(question);
  const q = ` ${normalize(question)} `;
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) {
      const key = normalize(k);
      // Latin + very short keys: whole words only ("hey" must not match "they").
      // Arabic: substring, because words take attached prefixes (ال، و، ب، ل…).
      const wholeWord = /[a-z]/.test(key) || key.length <= 2;
      const hit = wholeWord ? q.includes(` ${key} `) : q.includes(key);
      if (hit) score += key.split(' ').length * 2 + key.length / 10;
    }
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }
  return best ? best.answer[lang] : fallback[lang];
}

/** Suggestion chips shown to the visitor. */
export const suggestions: Record<Lang, string[]> = {
  ar: ['شو هو دفتري لديون؟', 'شو المميزات؟', 'بقدر أسجّل دفعات جزئية؟', 'كيف بنزّل التطبيق؟'],
  en: ['What is Daftari Lidyoon?', 'What are the features?', 'Can I record partial payments?', 'How do I download the app?'],
};

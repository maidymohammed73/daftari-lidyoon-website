import {
  BarChart3,
  BellRing,
  BookOpenCheck,
  ClipboardList,
  Eye,
  MousePointerClick,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { extras, type Extras } from './extras';

export type Lang = 'ar' | 'en';

/**
 * Language-independent configuration.
 * Replace the placeholder links once they exist — nothing here is a real account.
 */
export const siteConfig = {
  /** Link for the "Start now" buttons (app store / download page). */
  appUrl: '#download',
  /** Store links — leave empty to show "coming soon" badges. */
  googlePlayUrl: '',
  appStoreUrl: '',
  /**
   * Contact form target. Fill ONE of these and the form will open it with the message:
   * whatsapp: international digits only, e.g. '970591234567'.
   * Leave both empty → the form shows a friendly "not connected yet" message.
   */
  contactWhatsapp: '',
  contactEmail: '',
  /**
   * Smart assistant mode:
   * 'local' → built-in answers (free, works anywhere, no server).
   * 'ai'    → real AI via the Netlify function in netlify/functions/assistant.mts
   *           (needs ANTHROPIC_API_KEY on Netlify). Falls back to 'local' on any error.
   */
  assistantMode: 'local' as 'local' | 'ai',
  /** Social links — set `href` to the real profile URL when available. */
  social: [
    { key: 'facebook', href: '#' },
    { key: 'instagram', href: '#' },
    { key: 'whatsapp', href: '#' },
    { key: 'x', href: '#' },
  ] as const,
};

export type SocialKey = (typeof siteConfig.social)[number]['key'];

/** All section ids, in page order (shared by both languages). Used by the footer. */
export const sectionIds = [
  'home',
  'about',
  'features',
  'how',
  'showcase',
  'assistant',
  'calculator',
  'benefits',
  'faq',
  'contact',
] as const;
export type SectionId = (typeof sectionIds)[number];

/** The shorter list shown in the header. */
export const headerIds: SectionId[] = ['home', 'features', 'how', 'showcase', 'calculator', 'faq', 'contact'];

/** A title with a gradient-highlighted part in the middle. */
export interface Rich {
  pre?: string;
  hl: string;
  post?: string;
}

export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

type Status = 'paid' | 'partial' | 'due';

export type Content = BaseContent & Extras;

interface BaseContent {
  name: string;
  tagline: string;
  meta: { title: string; description: string };
  ui: {
    skip: string;
    mainNav: string;
    homeAria: string;
    openMenu: string;
    closeMenu: string;
    start: string;
    switchLang: string;
    langShort: string;
    toDark: string;
    toLight: string;
    logoAlt: string;
  };
  nav: Record<SectionId, string>;
  hero: {
    title: Rich;
    subtitle: string;
    primary: string;
    secondary: string;
    audience: string[];
    paymentLogged: string;
    collectionRate: string;
    reminder: string;
    phoneLabel: string;
  };
  about: {
    eyebrow: string;
    title: Rich;
    description: string;
    points: { title: string; text: string }[];
    before: string;
    beforeItems: string[];
    after: string;
    afterItems: string[];
    progress: string;
  };
  features: { eyebrow: string; title: Rich; description: string; items: IconItem[] };
  how: { eyebrow: string; title: string; description: string; steps: IconItem[] };
  showcase: {
    eyebrow: string;
    title: Rich;
    description: string;
    disclaimer: string;
    swipe: string;
    phonePrefix: string;
    shots: { title: string; caption: string }[];
  };
  benefits: {
    eyebrow: string;
    title: Rich;
    description: string;
    quoteText: string;
    items: IconItem[];
  };
  cta: { title: string; description: string; button: string };
  footer: {
    description: string;
    socialLabel: string;
    social: Record<SocialKey, string>;
    linkSoon: string;
    quickLinks: string;
    contactTitle: string;
    contact: { phone: string; email: string; location: string };
    rights: string;
    backToTop: string;
  };
  /** Text inside the illustrative phone screens (sample data only). */
  screens: {
    tabs: [string, string, string, string];
    status: Record<Status, string>;
    names: string[];
    dashboard: {
      greeting: string;
      title: string;
      totalDue: string;
      customers: string;
      growth: string;
      collected: string;
      newDebts: string;
      weekly: string;
      last7: string;
      recent: string;
      cashPayment: string;
      newDebt: string;
    };
    customers: {
      count: string;
      title: string;
      search: string;
      filters: [string, string, string];
      lastTx: string[];
    };
    debts: {
      title: string;
      since: string;
      total: string;
      remaining: string;
      recorded: string;
      amount: string;
      items: { item: string; date: string }[];
    };
    payments: {
      month: string;
      title: string;
      rate: string;
      collected: string;
      of: string;
      reminderPre: string;
      reminderBold: string;
      reminderPost: string;
      recent: string;
      dates: string[];
    };
  };
}

/* ------------------------------------------------------------------ */
/*                               Arabic                               */
/* ------------------------------------------------------------------ */

const ar: BaseContent = {
  name: 'دفتري لديون',
  tagline: 'ديونك مرتبة .. وحساباتك أوضح',
  meta: {
    title: 'دفتري لديون | ديونك مرتبة.. وحساباتك أوضح',
    description:
      'دفتري لديون تطبيق عربي لإدارة الديون وحسابات العملاء. سجّل ديونك، تابع المدفوعات والمستحقات، واحصل على تقارير واضحة في مكان واحد.',
  },
  ui: {
    skip: 'تخطَّ إلى المحتوى',
    mainNav: 'التنقل الرئيسي',
    homeAria: 'دفتري لديون — الصفحة الرئيسية',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    start: 'ابدأ الآن',
    switchLang: 'Switch to English',
    langShort: 'EN',
    toDark: 'تفعيل الوضع الليلي',
    toLight: 'تفعيل الوضع النهاري',
    logoAlt: 'شعار دفتري لديون — ديونك مرتبة .. وحساباتك أوضح',
  },
  nav: {
    home: 'الرئيسية',
    about: 'عن التطبيق',
    features: 'المميزات',
    how: 'كيف يعمل',
    showcase: 'الواجهات',
    assistant: 'المساعد الذكي',
    calculator: 'الحاسبة',
    benefits: 'الفوائد',
    faq: 'الأسئلة',
    contact: 'تواصل معنا',
  },
  hero: {
    title: { pre: 'ودّع ', hl: 'لخبطة', post: ' الحسابات!' },
    subtitle: 'كل ديونك وحساباتك بمكان واحد. نظّم معاملاتك وتابع مستحقاتك بكل سهولة.',
    primary: 'اكتشف التطبيق',
    secondary: 'تعرّف على المميزات',
    audience: ['أصحاب المحلات', 'التجّار', 'المشاريع الصغيرة', 'البيع بالدَّين'],
    paymentLogged: 'تم تسجيل دفعة',
    collectionRate: 'نسبة التحصيل',
    reminder: 'تذكير بموعد سداد',
    phoneLabel: 'واجهة توضيحية للوحة التحكم في تطبيق دفتري لديون',
  },
  about: {
    eyebrow: 'عن التطبيق',
    title: { pre: 'دفتري لديون.. ', hl: 'تنظيم أسهل', post: ' لحساباتك' },
    description:
      'دفتر رقمي ذكي مصمّم لأصحاب المحلات والتجّار وكل من يبيع بالدَّين. يحوّل الدفتر الورقي إلى حسابات واضحة ومرتبة على جوالك.',
    points: [
      { title: 'تنظيم الديون', text: 'كل دين مسجّل بتاريخه ومبلغه وصاحبه، بدل أوراق تضيع وأرقام تتلخبط.' },
      { title: 'إدارة حسابات العملاء', text: 'ملف لكل عميل يجمع معاملاته ورصيده، فتعرف وضعه بلحظة.' },
      { title: 'متابعة الدفعات', text: 'سجّل أي دفعة والتطبيق يحسب المتبقي تلقائياً بدون آلة حاسبة.' },
    ],
    before: 'قبل',
    beforeItems: ['أوراق ودفاتر مبعثرة', 'حسابات يدوية وأخطاء', 'نسيان مين عليه دين'],
    after: 'مع دفتري لديون',
    afterItems: ['كل الحسابات بمكان واحد', 'حساب تلقائي للمتبقي', 'متابعة واضحة للمستحقات'],
    progress: 'المحصّل من المستحقات',
  },
  features: {
    eyebrow: 'المميزات',
    title: { pre: 'كل اللي تحتاجه ', hl: 'لإدارة ديونك' },
    description: 'أدوات بسيطة وقوية تخلّيك مسيطر على حساباتك من غير تعقيد.',
    items: [
      { icon: ClipboardList, title: 'إدارة الديون', description: 'سجّل كل دين بتاريخه ومبلغه وصاحبه خلال ثوانٍ، وارجع له وقت ما تحتاج.' },
      { icon: Wallet, title: 'متابعة المدفوعات', description: 'سجّل الدفعات الجزئية والكاملة، والرصيد المتبقي يتحدّث تلقائياً.' },
      { icon: Users, title: 'تنظيم حسابات العملاء', description: 'لكل عميل صفحة خاصة فيها سجل معاملاته ورصيده الحالي بوضوح.' },
      { icon: BarChart3, title: 'التقارير والإحصائيات المالية', description: 'أرقام ورسوم واضحة تبيّن لك المستحق والمحصّل وحركة حساباتك.' },
    ],
  },
  how: {
    eyebrow: 'خطوات بسيطة',
    title: 'كيف يعمل التطبيق؟',
    description: 'ثلاث خطوات وتصير حساباتك مرتبة وواضحة.',
    steps: [
      { icon: BookOpenCheck, title: 'سجّل ديونك وحسابات عملائك', description: 'أضف عملاءك وسجّل الديون بخطوات بسيطة وبدون تعقيد.' },
      { icon: BellRing, title: 'تابع المدفوعات والمبالغ المستحقة', description: 'اعرف مين دفع، ومين عليه، وكم المتبقي بنظرة وحدة.' },
      { icon: ShieldCheck, title: 'حافظ على حساباتك منظمة وواضحة', description: 'كل شيء مرتب ومحفوظ، فتتابع شغلك وأنت مرتاح البال.' },
    ],
  },
  showcase: {
    eyebrow: 'واجهات التطبيق',
    title: { pre: 'تصميم بسيط.. ', hl: 'ومعلومات واضحة' },
    description: 'نظرة على الشاشات الرئيسية في دفتري لديون.',
    disclaimer: 'واجهات توضيحية — البيانات المعروضة أمثلة فقط',
    swipe: 'اسحب لعرض باقي الشاشات',
    phonePrefix: 'واجهة توضيحية:',
    shots: [
      { title: 'لوحة التحكم', caption: 'ملخص المستحقات والتحصيل بنظرة واحدة' },
      { title: 'حسابات العملاء', caption: 'كل عملائك وأرصدتهم في قائمة مرتبة' },
      { title: 'سجل الديون', caption: 'تفاصيل كل دين والمبلغ المتبقي منه' },
      { title: 'متابعة المدفوعات', caption: 'الدفعات الأخيرة ونسبة التحصيل' },
    ],
  },
  benefits: {
    eyebrow: 'ليش دفتري لديون؟',
    title: { pre: 'فوائد تحسّ فيها ', hl: 'من أول يوم' },
    description: 'وقت أقل في الحسابات، ووقت أكثر لشغلك وزبائنك.',
    quoteText: 'الشعار اللي بنينا عليه التطبيق: وضوح كامل لكل قرش لك أو عليك.',
    items: [
      { icon: MousePointerClick, title: 'سهولة الاستخدام', description: 'واجهة عربية بسيطة مصمّمة لصاحب المحل، مش للمحاسبين فقط.' },
      { icon: ClipboardList, title: 'تنظيم الحسابات', description: 'بدل الأوراق والدفاتر المبعثرة، كل الحسابات بمكان واحد مرتب.' },
      { icon: Eye, title: 'تقليل الأخطاء والنسيان', description: 'حسابات تلقائية وسجل كامل يقلّل الأخطاء ويمنع ضياع أي مبلغ.' },
      { icon: Zap, title: 'الوصول السريع للمعلومات', description: 'ابحث عن أي عميل أو معاملة واعرف رصيده فوراً.' },
    ],
  },
  cta: {
    title: 'خلي حساباتك أوضح!',
    description: 'ابدأ بتنظيم ديونك وحساباتك اليوم.',
    button: 'ابدأ الآن',
  },
  footer: {
    description:
      'دفتري لديون تطبيق عربي لإدارة الديون وحسابات العملاء، يساعد أصحاب المحلات والتجّار على تسجيل الديون ومتابعة المدفوعات بكل سهولة.',
    socialLabel: 'حسابات التواصل الاجتماعي',
    social: { facebook: 'فيسبوك', instagram: 'إنستغرام', whatsapp: 'واتساب', x: 'إكس' },
    linkSoon: 'يُضاف الرابط لاحقاً',
    quickLinks: 'روابط سريعة',
    contactTitle: 'تواصل معنا',
    contact: {
      phone: 'رقم الهاتف (يُضاف لاحقاً)',
      email: 'البريد الإلكتروني (يُضاف لاحقاً)',
      location: 'العنوان (يُضاف لاحقاً)',
    },
    rights: 'جميع الحقوق محفوظة.',
    backToTop: 'العودة للأعلى',
  },
  screens: {
    tabs: ['الرئيسية', 'العملاء', 'الديون', 'التقارير'],
    status: { paid: 'مسدّد', partial: 'جزئي', due: 'مستحق' },
    names: ['أبو محمد', 'سوبر ماركت النور', 'أم خالد', 'محل الأمانة', 'أحمد يوسف', 'ورشة السلام'],
    dashboard: {
      greeting: 'صباح الخير 👋',
      title: 'لوحة التحكم',
      totalDue: 'إجمالي المستحقات',
      customers: '48 عميل',
      growth: '+12% هذا الشهر',
      collected: 'محصّل',
      newDebts: 'ديون جديدة',
      weekly: 'التحصيل الأسبوعي',
      last7: 'آخر 7 أيام',
      recent: 'آخر المعاملات',
      cashPayment: 'دفعة نقدية',
      newDebt: 'دين جديد',
    },
    customers: {
      count: '48 عميل',
      title: 'العملاء',
      search: 'ابحث عن عميل...',
      filters: ['الكل', 'عليهم مستحقات', 'مسدّدين'],
      lastTx: [
        'آخر معاملة: اليوم',
        'آخر معاملة: أمس',
        'آخر معاملة: قبل 3 أيام',
        'آخر معاملة: الأسبوع الماضي',
        'آخر معاملة: اليوم',
        'آخر معاملة: قبل يومين',
      ],
    },
    debts: {
      title: 'سجل الديون',
      since: 'عميل منذ 2024',
      total: 'إجمالي الديون',
      remaining: 'المتبقي',
      recorded: 'الديون المسجّلة',
      amount: 'المبلغ',
      items: [
        { item: 'مواد تموينية', date: '02 نوفمبر' },
        { item: 'بضاعة متنوعة', date: '25 أكتوبر' },
        { item: 'مشروبات', date: '18 أكتوبر' },
        { item: 'منظفات', date: '06 أكتوبر' },
      ],
    },
    payments: {
      month: 'نوفمبر',
      title: 'متابعة المدفوعات',
      rate: 'نسبة التحصيل هذا الشهر',
      collected: 'تم تحصيل',
      of: 'من',
      reminderPre: 'تذكير:',
      reminderBold: '3 عملاء',
      reminderPost: 'عندهم دفعات مستحقة هذا الأسبوع',
      recent: 'الدفعات الأخيرة',
      dates: ['اليوم · 10:24 ص', 'أمس · 6:10 م', '10 نوفمبر', '08 نوفمبر'],
    },
  },
};

/* ------------------------------------------------------------------ */
/*                               English                              */
/* ------------------------------------------------------------------ */

const en: BaseContent = {
  name: 'Daftari Lidyoon',
  tagline: 'Organized debts.. clearer accounts',
  meta: {
    title: 'Daftari Lidyoon | Organized debts, clearer accounts',
    description:
      'Daftari Lidyoon is a debt and customer-accounts app. Record debts, track payments and dues, and get clear reports — all in one place.',
  },
  ui: {
    skip: 'Skip to content',
    mainNav: 'Main navigation',
    homeAria: 'Daftari Lidyoon — Home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    start: 'Start now',
    switchLang: 'التبديل إلى العربية',
    langShort: 'ع',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    logoAlt: 'Daftari Lidyoon logo — Organized debts, clearer accounts',
  },
  nav: {
    home: 'Home',
    about: 'About',
    features: 'Features',
    how: 'How it works',
    showcase: 'Screens',
    assistant: 'Smart assistant',
    calculator: 'Calculator',
    benefits: 'Benefits',
    faq: 'FAQ',
    contact: 'Contact',
  },
  hero: {
    title: { pre: 'Say goodbye to ', hl: 'messy', post: ' accounts!' },
    subtitle: 'All your debts and accounts in one place. Organize your transactions and track what you’re owed with ease.',
    primary: 'Discover the app',
    secondary: 'Explore features',
    audience: ['Shop owners', 'Merchants', 'Small businesses', 'Selling on credit'],
    paymentLogged: 'Payment recorded',
    collectionRate: 'Collection rate',
    reminder: 'Payment due reminder',
    phoneLabel: 'Illustrative dashboard screen of the Daftari Lidyoon app',
  },
  about: {
    eyebrow: 'About the app',
    title: { pre: 'Daftari Lidyoon.. ', hl: 'easier organization', post: ' for your accounts' },
    description:
      'A smart digital ledger built for shop owners, merchants and anyone who sells on credit. It turns the paper notebook into clear, organized accounts on your phone.',
    points: [
      { title: 'Organize debts', text: 'Every debt recorded with its date, amount and customer — no more lost papers or mixed-up numbers.' },
      { title: 'Manage customer accounts', text: 'A profile for every customer with their transactions and balance, so you know where they stand instantly.' },
      { title: 'Track payments', text: 'Record any payment and the app calculates the remaining balance automatically.' },
    ],
    before: 'Before',
    beforeItems: ['Scattered papers & notebooks', 'Manual math & mistakes', 'Forgetting who owes what'],
    after: 'With Daftari Lidyoon',
    afterItems: ['All accounts in one place', 'Automatic balance calculation', 'Clear tracking of dues'],
    progress: 'Collected from dues',
  },
  features: {
    eyebrow: 'Features',
    title: { pre: 'Everything you need ', hl: 'to manage debts' },
    description: 'Simple, powerful tools that keep you in control of your accounts — without the complexity.',
    items: [
      { icon: ClipboardList, title: 'Debt management', description: 'Record every debt with its date, amount and customer in seconds, and find it whenever you need.' },
      { icon: Wallet, title: 'Payment tracking', description: 'Log partial and full payments — the remaining balance updates automatically.' },
      { icon: Users, title: 'Customer accounts', description: 'Each customer gets a dedicated page with their full history and current balance.' },
      { icon: BarChart3, title: 'Financial reports & insights', description: 'Clear numbers and charts showing what’s due, what’s collected and how your accounts move.' },
    ],
  },
  how: {
    eyebrow: 'Simple steps',
    title: 'How does it work?',
    description: 'Three steps and your accounts are organized and clear.',
    steps: [
      { icon: BookOpenCheck, title: 'Record your debts and customer accounts', description: 'Add your customers and record debts in a few simple steps.' },
      { icon: BellRing, title: 'Track payments and amounts due', description: 'See who paid, who owes, and how much is left — at a glance.' },
      { icon: ShieldCheck, title: 'Keep your accounts organized and clear', description: 'Everything is tidy and saved, so you can run your business with peace of mind.' },
    ],
  },
  showcase: {
    eyebrow: 'App screens',
    title: { pre: 'Simple design.. ', hl: 'clear information' },
    description: 'A look at the main screens of Daftari Lidyoon.',
    disclaimer: 'Illustrative screens — the data shown is sample data only',
    swipe: 'Swipe to see more screens',
    phonePrefix: 'Illustrative screen:',
    shots: [
      { title: 'Dashboard', caption: 'Dues and collections summarized at a glance' },
      { title: 'Customer accounts', caption: 'All your customers and balances in a tidy list' },
      { title: 'Debt records', caption: 'Details of every debt and what remains' },
      { title: 'Payment tracking', caption: 'Recent payments and collection rate' },
    ],
  },
  benefits: {
    eyebrow: 'Why Daftari Lidyoon?',
    title: { pre: 'Benefits you’ll feel ', hl: 'from day one' },
    description: 'Less time on accounts, more time for your business and customers.',
    quoteText: 'The promise the app is built on: full clarity on every cent owed to you or by you.',
    items: [
      { icon: MousePointerClick, title: 'Easy to use', description: 'A simple interface designed for shop owners — not just accountants.' },
      { icon: ClipboardList, title: 'Organized accounts', description: 'Instead of scattered papers, every account lives in one organized place.' },
      { icon: Eye, title: 'Fewer errors & less forgetting', description: 'Automatic calculations and a full history reduce mistakes and lost amounts.' },
      { icon: Zap, title: 'Quick access to information', description: 'Search any customer or transaction and see their balance instantly.' },
    ],
  },
  cta: {
    title: 'Make your accounts clearer!',
    description: 'Start organizing your debts and accounts today.',
    button: 'Start now',
  },
  footer: {
    description:
      'Daftari Lidyoon is a debt and customer-accounts app that helps shop owners and merchants record debts and track payments with ease.',
    socialLabel: 'Social media accounts',
    social: { facebook: 'Facebook', instagram: 'Instagram', whatsapp: 'WhatsApp', x: 'X' },
    linkSoon: 'link coming soon',
    quickLinks: 'Quick links',
    contactTitle: 'Contact us',
    contact: {
      phone: 'Phone number (coming soon)',
      email: 'Email address (coming soon)',
      location: 'Address (coming soon)',
    },
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  screens: {
    tabs: ['Home', 'Customers', 'Debts', 'Reports'],
    status: { paid: 'Paid', partial: 'Partial', due: 'Due' },
    names: ['Abu Mohammad', 'Al-Noor Market', 'Um Khaled', 'Al-Amana Store', 'Ahmad Yousef', 'Al-Salam Workshop'],
    dashboard: {
      greeting: 'Good morning 👋',
      title: 'Dashboard',
      totalDue: 'Total receivables',
      customers: '48 customers',
      growth: '+12% this month',
      collected: 'Collected',
      newDebts: 'New debts',
      weekly: 'Weekly collections',
      last7: 'Last 7 days',
      recent: 'Recent transactions',
      cashPayment: 'Cash payment',
      newDebt: 'New debt',
    },
    customers: {
      count: '48 customers',
      title: 'Customers',
      search: 'Search customers...',
      filters: ['All', 'Owing', 'Paid up'],
      lastTx: ['Last activity: today', 'Last activity: yesterday', 'Last activity: 3 days ago', 'Last activity: last week', 'Last activity: today', 'Last activity: 2 days ago'],
    },
    debts: {
      title: 'Debt records',
      since: 'Customer since 2024',
      total: 'Total debts',
      remaining: 'Remaining',
      recorded: 'Recorded debts',
      amount: 'Amount',
      items: [
        { item: 'Groceries', date: 'Nov 02' },
        { item: 'Assorted goods', date: 'Oct 25' },
        { item: 'Beverages', date: 'Oct 18' },
        { item: 'Cleaning supplies', date: 'Oct 06' },
      ],
    },
    payments: {
      month: 'November',
      title: 'Payment tracking',
      rate: 'Collection rate this month',
      collected: 'Collected',
      of: 'of',
      reminderPre: 'Reminder:',
      reminderBold: '3 customers',
      reminderPost: 'have payments due this week',
      recent: 'Recent payments',
      dates: ['Today · 10:24 AM', 'Yesterday · 6:10 PM', 'Nov 10', 'Nov 08'],
    },
  },
};

export const translations: Record<Lang, Content> = {
  ar: { ...ar, ...extras.ar },
  en: { ...en, ...extras.en },
};

import {
  CloudUpload,
  FileClock,
  Fingerprint,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { Rich } from './content';

/*
 * Content for the extra sections: stats, smart assistant, comparison, calculator,
 * security, FAQ, contact form, store badges and the legal pages.
 *
 * ⚠️ Review before publishing: the security items and the legal pages describe how the
 * app handles data. Make sure they match what the real app actually does.
 */

export interface LegalDoc {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export interface Extras {
  stats: { value: number; suffix: string; label: string }[];
  assistant: {
    eyebrow: string;
    title: Rich;
    description: string;
    points: string[];
    botName: string;
    online: string;
    greeting: string;
    inputPlaceholder: string;
    inputLabel: string;
    send: string;
    reset: string;
    typing: string;
    tryAsking: string;
    note: string;
    floating: string;
  };
  compare: {
    eyebrow: string;
    title: Rich;
    description: string;
    feature: string;
    paper: string;
    app: string;
    rows: { label: string; paper: string | false; app: string | true }[];
  };
  calculator: {
    eyebrow: string;
    title: Rich;
    description: string;
    customer: string;
    defaultCustomer: string;
    debt: string;
    payment: string;
    add: string;
    payments: string;
    noPayments: string;
    remove: string;
    total: string;
    paid: string;
    remaining: string;
    progress: string;
    reset: string;
    fullyPaid: string;
    overpaid: string;
    invalid: string;
    note: string;
    currency: string;
  };
  security: {
    eyebrow: string;
    title: Rich;
    description: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  faq: { eyebrow: string; title: Rich; description: string; items: { q: string; a: string }[] };
  contactForm: {
    eyebrow: string;
    title: Rich;
    description: string;
    name: string;
    namePh: string;
    reach: string;
    reachPh: string;
    message: string;
    messagePh: string;
    submit: string;
    errName: string;
    errMessage: string;
    sent: string;
    notConnected: string;
    another: string;
    optional: string;
  };
  stores: { comingSoon: string; getOn: string; googlePlay: string; appStore: string };
  legal: {
    privacy: LegalDoc;
    terms: LegalDoc;
    draftNotice: string;
    updated: string;
    back: string;
    privacyLink: string;
    termsLink: string;
  };
  backToTop: string;
}

const securityIcons = [Fingerprint, CloudUpload, ShieldCheck, FileClock];

/* ------------------------------------------------------------------ */
/*                               Arabic                               */
/* ------------------------------------------------------------------ */

const ar: Extras = {
  stats: [
    { value: 3, suffix: '', label: 'خطوات بسيطة للبدء' },
    { value: 4, suffix: '', label: 'أدوات أساسية لإدارة حساباتك' },
    { value: 24, suffix: '/7', label: 'حساباتك معك على جوالك' },
    { value: 100, suffix: '%', label: 'واجهة عربية سهلة' },
  ],
  assistant: {
    eyebrow: 'المساعد الذكي',
    title: { pre: 'اسأل ', hl: 'مساعدك الذكي', post: ' عن حساباتك' },
    description: 'جرّبه هون الآن: اكتب أي سؤال عن التطبيق والمساعد بيجاوبك فوراً. وجوّا التطبيق، بيجاوبك من بيانات دفترك أنت.',
    points: ['اعرف مين عليه ديون متأخرة', 'ملخص سريع لوضع حساباتك', 'اقتراحات لمتابعة التحصيل'],
    botName: 'المساعد الذكي',
    online: 'متصل',
    greeting: 'أهلاً! 👋 أنا المساعد الذكي لدفتري لديون. اسألني أي سؤال عن التطبيق.',
    inputPlaceholder: 'اكتب سؤالك...',
    inputLabel: 'سؤالك للمساعد الذكي',
    send: 'إرسال',
    reset: 'محادثة جديدة',
    typing: 'المساعد يكتب…',
    tryAsking: 'جرّب تسأل:',
    note: 'المساعد يجاوب عن التطبيق فقط، ولا يطّلع على أي بيانات شخصية.',
    floating: 'اسأل المساعد',
  },
  compare: {
    eyebrow: 'المقارنة',
    title: { pre: 'الدفتر الورقي ', hl: 'ضد دفتري لديون' },
    description: 'نفس الشغل اللي بتعمله كل يوم.. بس أسرع وأدق.',
    feature: 'المهمة',
    paper: 'الدفتر الورقي',
    app: 'دفتري لديون',
    rows: [
      { label: 'تسجيل دين جديد', paper: 'كتابة يدوية', app: 'خلال ثوانٍ' },
      { label: 'حساب المبلغ المتبقي', paper: 'آلة حاسبة وأخطاء', app: 'تلقائي ودقيق' },
      { label: 'الوصول لحساب عميل', paper: 'تقليب الصفحات', app: 'بحث فوري' },
      { label: 'التذكير بالمستحقات', paper: false, app: true },
      { label: 'تقارير وإحصائيات', paper: false, app: true },
      { label: 'كل الحسابات بمكان واحد', paper: false, app: true },
    ],
  },
  calculator: {
    eyebrow: 'جرّب بنفسك',
    title: { pre: 'حاسبة ', hl: 'الدين والدفعات' },
    description: 'جرّب فكرة التطبيق هون: سجّل دين، أضف الدفعات، وشوف المتبقي يتحدّث فوراً.',
    customer: 'اسم العميل',
    defaultCustomer: 'أبو محمد',
    debt: 'مبلغ الدين',
    payment: 'مبلغ الدفعة',
    add: 'إضافة دفعة',
    payments: 'الدفعات المسجّلة',
    noPayments: 'لا يوجد دفعات بعد — أضف أول دفعة.',
    remove: 'حذف الدفعة',
    total: 'إجمالي الدين',
    paid: 'المدفوع',
    remaining: 'المتبقي',
    progress: 'نسبة السداد',
    reset: 'إعادة تعيين',
    fullyPaid: 'تم سداد الدين بالكامل 🎉',
    overpaid: 'المدفوع أكثر من الدين بمبلغ',
    invalid: 'أدخل مبلغاً أكبر من صفر',
    note: 'حاسبة تجريبية للتوضيح فقط، ولا تحفظ أي بيانات.',
    currency: '₪',
  },
  security: {
    eyebrow: 'الأمان والخصوصية',
    title: { pre: 'حساباتك ', hl: 'بأمان' },
    description: 'بيانات حساباتك تخصّك وحدك، وحمايتها جزء أساسي من تصميم التطبيق.',
    items: [
      { title: 'قفل التطبيق', description: 'حماية الدخول للتطبيق برمز سري أو بصمة.' },
      { title: 'نسخ احتياطي', description: 'نسخة احتياطية لحساباتك حتى ما تضيع لو غيّرت جوالك.' },
      { title: 'خصوصية كاملة', description: 'بياناتك ملكك، ولا تُباع أو تُشارك مع أي طرف.' },
      { title: 'سجل واضح', description: 'كل دين ودفعة محفوظين بتاريخهم للرجوع لهم وقت الحاجة.' },
    ].map((item, i) => ({ ...item, icon: securityIcons[i] })),
  },
  faq: {
    eyebrow: 'الأسئلة الشائعة',
    title: { pre: 'عندك ', hl: 'سؤال؟' },
    description: 'جمعنالك أكثر الأسئلة اللي بتوصلنا.',
    items: [
      {
        q: 'شو هو دفتري لديون؟',
        a: 'تطبيق عربي لإدارة الديون وحسابات العملاء. بيساعدك تسجّل الديون، تتابع الدفعات، وتعرف المتبقي على كل عميل بدل الدفتر الورقي.',
      },
      {
        q: 'لمين التطبيق مناسب؟',
        a: 'لأصحاب المحلات والتجّار والمشاريع الصغيرة، ولأي حدا ببيع بالدَّين أو بده ينظّم ديونه وحسابات عملائه.',
      },
      {
        q: 'هل بقدر أسجّل دفعات جزئية؟',
        a: 'أكيد. سجّل أي دفعة مهما كان مبلغها، والتطبيق بيحسب المتبقي على العميل تلقائياً.',
      },
      {
        q: 'هل بقدر أشوف حساب كل عميل لحاله؟',
        a: 'نعم، لكل عميل صفحة خاصة فيها كل ديونه ودفعاته ورصيده الحالي.',
      },
      {
        q: 'هل في تقارير؟',
        a: 'نعم، التطبيق بيعرضلك إجمالي المستحقات والمحصّل وحركة حساباتك بأرقام ورسوم واضحة.',
      },
      {
        q: 'كيف بلّش؟',
        a: 'التطبيق قريباً على المتاجر. تابعنا، ولما ينزل حمّله، أضف عملاءك، وابدأ تسجّل ديونك بخطوات بسيطة.',
      },
    ],
  },
  contactForm: {
    eyebrow: 'تواصل معنا',
    title: { pre: 'يسعدنا ', hl: 'نسمع منك' },
    description: 'عندك سؤال أو اقتراح؟ اكتبلنا والفريق برجعلك.',
    name: 'الاسم',
    namePh: 'اسمك الكريم',
    reach: 'رقم الهاتف أو البريد',
    reachPh: 'كيف نتواصل معك',
    message: 'رسالتك',
    messagePh: 'اكتب رسالتك هنا...',
    submit: 'إرسال الرسالة',
    errName: 'الرجاء كتابة الاسم',
    errMessage: 'الرسالة لازم تكون 10 أحرف على الأقل',
    sent: 'تم فتح تطبيق المراسلة لإرسال رسالتك ✅',
    notConnected: 'شكراً لك! النموذج جاهز، وسيتم ربطه بوسيلة التواصل الرسمية قريباً.',
    another: 'إرسال رسالة أخرى',
    optional: '(اختياري)',
  },
  stores: { comingSoon: 'قريباً على', getOn: 'حمّله من', googlePlay: 'Google Play', appStore: 'App Store' },
  legal: {
    draftNotice: 'هذه صيغة نموذجية أولية، يُنصح بمراجعتها قانونياً ومطابقتها مع التطبيق قبل النشر الرسمي.',
    updated: 'آخر تحديث: نوفمبر 2026',
    back: 'العودة للرئيسية',
    privacyLink: 'سياسة الخصوصية',
    termsLink: 'الشروط والأحكام',
    privacy: {
      title: 'سياسة الخصوصية',
      intro: 'توضّح هذه السياسة كيف يتعامل تطبيق «دفتري لديون» مع بياناتك، وما هي حقوقك تجاهها.',
      sections: [
        {
          heading: 'البيانات التي نتعامل معها',
          body: 'البيانات التي تُدخلها بنفسك داخل التطبيق، مثل أسماء العملاء ومبالغ الديون والدفعات وملاحظاتك، إضافة إلى بيانات تقنية أساسية لازمة لتشغيل التطبيق بشكل صحيح.',
        },
        {
          heading: 'كيف نستخدم البيانات',
          body: 'نستخدم بياناتك فقط لتشغيل ميزات التطبيق: تسجيل الديون، حساب الأرصدة، إعداد التقارير، وتحسين تجربة الاستخدام.',
        },
        {
          heading: 'مشاركة البيانات',
          body: 'لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية. قد تُشارك فقط إذا طُلب ذلك بموجب القانون.',
        },
        {
          heading: 'حماية البيانات',
          body: 'نتخذ إجراءات تقنية وتنظيمية معقولة لحماية بياناتك من الوصول غير المصرّح به أو الفقدان.',
        },
        {
          heading: 'حقوقك',
          body: 'يحق لك الوصول إلى بياناتك وتعديلها أو حذفها في أي وقت من داخل التطبيق أو بالتواصل معنا.',
        },
        {
          heading: 'التواصل',
          body: 'لأي استفسار بخصوص الخصوصية، تواصل معنا عبر وسائل التواصل الموضّحة في الموقع.',
        },
      ],
    },
    terms: {
      title: 'الشروط والأحكام',
      intro: 'باستخدامك لتطبيق «دفتري لديون» فإنك توافق على الشروط التالية.',
      sections: [
        {
          heading: 'استخدام التطبيق',
          body: 'التطبيق أداة لتنظيم الديون وحسابات العملاء، ويجب استخدامه لأغراض مشروعة فقط.',
        },
        {
          heading: 'مسؤولية المستخدم',
          body: 'أنت مسؤول عن صحة البيانات التي تُدخلها وعن الحفاظ على سرية وصولك إلى التطبيق وجهازك.',
        },
        {
          heading: 'حدود المسؤولية',
          body: 'التطبيق وسيلة مساعدة للتنظيم وليس بديلاً عن الاستشارة المحاسبية أو القانونية المتخصصة. لا نتحمّل مسؤولية القرارات المبنية على بيانات غير صحيحة.',
        },
        {
          heading: 'الملكية الفكرية',
          body: 'جميع حقوق التطبيق وتصميمه وشعاره وهويته البصرية محفوظة لأصحابها، ولا يجوز نسخها أو استخدامها دون إذن.',
        },
        {
          heading: 'التعديلات',
          body: 'قد نقوم بتحديث هذه الشروط من وقت لآخر، وسيتم نشر النسخة المحدّثة على هذه الصفحة.',
        },
      ],
    },
  },
  backToTop: 'العودة للأعلى',
};

/* ------------------------------------------------------------------ */
/*                               English                              */
/* ------------------------------------------------------------------ */

const en: Extras = {
  stats: [
    { value: 3, suffix: '', label: 'Simple steps to get started' },
    { value: 4, suffix: '', label: 'Core tools to manage your accounts' },
    { value: 24, suffix: '/7', label: 'Your accounts, always on your phone' },
    { value: 100, suffix: '%', label: 'Arabic-first, easy interface' },
  ],
  assistant: {
    eyebrow: 'Smart assistant',
    title: { pre: 'Ask your ', hl: 'smart assistant', post: ' about your accounts' },
    description: 'Try it right here: ask anything about the app and the assistant answers instantly. Inside the app, it answers from your own ledger data.',
    points: ['Find out who has overdue debts', 'A quick summary of your accounts', 'Suggestions to follow up on collections'],
    botName: 'Smart assistant',
    online: 'Online',
    greeting: 'Hi! 👋 I’m the Daftari Lidyoon smart assistant. Ask me anything about the app.',
    inputPlaceholder: 'Type your question...',
    inputLabel: 'Your question for the smart assistant',
    send: 'Send',
    reset: 'New chat',
    typing: 'Assistant is typing…',
    tryAsking: 'Try asking:',
    note: 'The assistant answers about the app only and doesn’t see any personal data.',
    floating: 'Ask the assistant',
  },
  compare: {
    eyebrow: 'Comparison',
    title: { pre: 'Paper notebook ', hl: 'vs. Daftari Lidyoon' },
    description: 'The same work you do every day.. just faster and more accurate.',
    feature: 'Task',
    paper: 'Paper notebook',
    app: 'Daftari Lidyoon',
    rows: [
      { label: 'Recording a new debt', paper: 'Handwritten', app: 'In seconds' },
      { label: 'Calculating the balance', paper: 'Calculator & mistakes', app: 'Automatic & accurate' },
      { label: 'Finding a customer', paper: 'Flipping pages', app: 'Instant search' },
      { label: 'Reminders for dues', paper: false, app: true },
      { label: 'Reports & insights', paper: false, app: true },
      { label: 'All accounts in one place', paper: false, app: true },
    ],
  },
  calculator: {
    eyebrow: 'Try it yourself',
    title: { pre: 'Debt & payment ', hl: 'calculator' },
    description: 'Try the idea behind the app: record a debt, add payments, and watch the balance update instantly.',
    customer: 'Customer name',
    defaultCustomer: 'Abu Mohammad',
    debt: 'Debt amount',
    payment: 'Payment amount',
    add: 'Add payment',
    payments: 'Recorded payments',
    noPayments: 'No payments yet — add the first one.',
    remove: 'Remove payment',
    total: 'Total debt',
    paid: 'Paid',
    remaining: 'Remaining',
    progress: 'Repayment progress',
    reset: 'Reset',
    fullyPaid: 'Debt fully paid 🎉',
    overpaid: 'Paid more than the debt by',
    invalid: 'Enter an amount greater than zero',
    note: 'A demo calculator for illustration only — nothing is saved.',
    currency: '₪',
  },
  security: {
    eyebrow: 'Security & privacy',
    title: { pre: 'Your accounts, ', hl: 'safe and secure' },
    description: 'Your account data belongs to you alone, and protecting it is a core part of the app’s design.',
    items: [
      { title: 'App lock', description: 'Protect access to the app with a passcode or fingerprint.' },
      { title: 'Backup', description: 'A backup of your accounts so nothing is lost if you change phones.' },
      { title: 'Full privacy', description: 'Your data is yours — never sold or shared with anyone.' },
      { title: 'Clear history', description: 'Every debt and payment is saved with its date for future reference.' },
    ].map((item, i) => ({ ...item, icon: securityIcons[i] })),
  },
  faq: {
    eyebrow: 'FAQ',
    title: { pre: 'Got a ', hl: 'question?' },
    description: 'The questions we hear most often.',
    items: [
      {
        q: 'What is Daftari Lidyoon?',
        a: 'A debt and customer-accounts app. It helps you record debts, track payments and know what each customer owes — instead of a paper notebook.',
      },
      {
        q: 'Who is it for?',
        a: 'Shop owners, merchants and small businesses — anyone who sells on credit or wants to organize debts and customer accounts.',
      },
      {
        q: 'Can I record partial payments?',
        a: 'Absolutely. Record any payment of any amount, and the app calculates the customer’s remaining balance automatically.',
      },
      {
        q: 'Can I see each customer’s account separately?',
        a: 'Yes — every customer has a dedicated page with all their debts, payments and current balance.',
      },
      {
        q: 'Are there reports?',
        a: 'Yes. The app shows your total receivables, collections and account activity with clear numbers and charts.',
      },
      {
        q: 'How do I get started?',
        a: 'The app is coming soon to the stores. Once it’s out, download it, add your customers and start recording debts in a few simple steps.',
      },
    ],
  },
  contactForm: {
    eyebrow: 'Contact us',
    title: { pre: 'We’d love to ', hl: 'hear from you' },
    description: 'Have a question or suggestion? Write to us and the team will get back to you.',
    name: 'Name',
    namePh: 'Your name',
    reach: 'Phone or email',
    reachPh: 'How can we reach you',
    message: 'Message',
    messagePh: 'Write your message here...',
    submit: 'Send message',
    errName: 'Please enter your name',
    errMessage: 'Message must be at least 10 characters',
    sent: 'Your messaging app was opened to send your message ✅',
    notConnected: 'Thank you! The form is ready and will be connected to our official contact channel soon.',
    another: 'Send another message',
    optional: '(optional)',
  },
  stores: { comingSoon: 'Coming soon on', getOn: 'Get it on', googlePlay: 'Google Play', appStore: 'App Store' },
  legal: {
    draftNotice: 'This is a preliminary template. Have it reviewed legally and matched to the app before official publication.',
    updated: 'Last updated: November 2026',
    back: 'Back to home',
    privacyLink: 'Privacy policy',
    termsLink: 'Terms & conditions',
    privacy: {
      title: 'Privacy policy',
      intro: 'This policy explains how the Daftari Lidyoon app handles your data and what rights you have over it.',
      sections: [
        {
          heading: 'Data we handle',
          body: 'Data you enter yourself in the app — such as customer names, debt amounts, payments and notes — plus basic technical data needed for the app to work correctly.',
        },
        {
          heading: 'How we use data',
          body: 'We use your data only to run the app’s features: recording debts, calculating balances, preparing reports and improving the experience.',
        },
        {
          heading: 'Sharing data',
          body: 'We do not sell your data or share it with third parties for marketing. It may only be disclosed where required by law.',
        },
        {
          heading: 'Protecting data',
          body: 'We take reasonable technical and organizational measures to protect your data against unauthorized access or loss.',
        },
        {
          heading: 'Your rights',
          body: 'You may access, edit or delete your data at any time from within the app or by contacting us.',
        },
        {
          heading: 'Contact',
          body: 'For any privacy question, reach us through the contact channels shown on the website.',
        },
      ],
    },
    terms: {
      title: 'Terms & conditions',
      intro: 'By using the Daftari Lidyoon app, you agree to the following terms.',
      sections: [
        {
          heading: 'Using the app',
          body: 'The app is a tool for organizing debts and customer accounts and must be used for lawful purposes only.',
        },
        {
          heading: 'User responsibility',
          body: 'You are responsible for the accuracy of the data you enter and for keeping access to the app and your device secure.',
        },
        {
          heading: 'Limitation of liability',
          body: 'The app is an organizational aid, not a substitute for professional accounting or legal advice. We are not liable for decisions based on incorrect data.',
        },
        {
          heading: 'Intellectual property',
          body: 'All rights to the app, its design, logo and visual identity are reserved by their owners and may not be copied or used without permission.',
        },
        {
          heading: 'Changes',
          body: 'We may update these terms from time to time; the updated version will be published on this page.',
        },
      ],
    },
  },
  backToTop: 'Back to top',
};

export const extras: Record<'ar' | 'en', Extras> = { ar, en };

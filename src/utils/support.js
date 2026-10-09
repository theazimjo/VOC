// Where people can get help with VOCABRY.
export const SUPPORT = {
  telegramUser: 'azimjonxolmirzayevs',
  telegramUrl: 'https://t.me/azimjonxolmirzayevs',
  phone: '+998932550566',
  phoneLabel: '+998 93 255 05 66',
};

const TEXT = {
  en: { title: 'Help', telegram: 'Write on Telegram', call: 'Call us', hint: 'Something not working? Write or call, we will help.' },
  uz: { title: 'Yordam', telegram: 'Telegramda yozing', call: "Qo'ng'iroq qiling", hint: "Biror narsa ishlamayaptimi? Yozing yoki qo'ng'iroq qiling, yordam beramiz." },
  ru: { title: 'Помощь', telegram: 'Написать в Telegram', call: 'Позвонить', hint: 'Что-то не работает? Напишите или позвоните, поможем.' },
};

export const supportText = (language) => TEXT[language] || TEXT.en;

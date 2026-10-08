// The privacy policy is a static page (public/privacy.html: English, Uzbek and
// Russian on one URL) so it opens without the app, a login or JavaScript - which
// is what Google Play wants for the "Privacy policy URL" of the store listing.
export const PRIVACY_URL = '/privacy.html';

const LABELS = {
  en: 'Privacy policy',
  uz: 'Maxfiylik siyosati',
  ru: 'Политика конфиденциальности',
};

export const privacyLabel = (language) => LABELS[language] || LABELS.en;

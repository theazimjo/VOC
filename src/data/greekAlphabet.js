// Modern (Demotic) Greek alphabet — 24 letters. This dataset only powers the
// standalone Greek section's Alphabet page (src/pages/greek), a track that's
// deliberately isolated from every other language's grammar/vocabulary data.
//
// `ipa` is a rough Uzbek-reader-friendly phonetic hint, not strict IPA.
// `note` flags modern-Greek quirks (iotacism, β/γ shifts) worth calling out
// explicitly since they trip up beginners coming from Latin-alphabet reading
// habits.
export const GREEK_ALPHABET = [
  {
    id: 'alpha', upper: 'Α', lower: 'α', nameGreek: 'Άλφα', nameLatin: 'Alpha', nameUz: 'Alfa',
    ipa: "ingliz 'a'si (father so'zidagi kabi)", type: 'vowel',
    example: { greek: 'άνθρωπος', translit: 'ánthropos', uz: 'inson' },
  },
  {
    id: 'beta', upper: 'Β', lower: 'β', nameGreek: 'Βήτα', nameLatin: 'Beta', nameUz: 'Vita',
    ipa: "'v' tovushi (lotin 'b' emas!)", type: 'consonant',
    example: { greek: 'βιβλίο', translit: 'vivlío', uz: 'kitob' },
    note: "Zamonaviy yunon tilida β harfi 'b' emas, 'v' deb o'qiladi.",
  },
  {
    id: 'gamma', upper: 'Γ', lower: 'γ', nameGreek: 'Γάμμα', nameLatin: 'Gamma', nameUz: 'Gamma',
    ipa: "yumshoq 'g', e/i oldida 'y' ga yaqin", type: 'consonant',
    example: { greek: 'γάτα', translit: 'gáta', uz: 'mushuk' },
    note: "ε yoki ι dan oldin γ tovushi inglizcha 'y' (yes so'zidagi)ga o'xshaydi.",
  },
  {
    id: 'delta', upper: 'Δ', lower: 'δ', nameGreek: 'Δέλτα', nameLatin: 'Delta', nameUz: 'Delta',
    ipa: "'th' (this so'zidagi kabi jarangli)", type: 'consonant',
    example: { greek: 'δρόμος', translit: 'drómos', uz: "yo'l" },
  },
  {
    id: 'epsilon', upper: 'Ε', lower: 'ε', nameGreek: 'Έψιλον', nameLatin: 'Epsilon', nameUz: 'Epsilon',
    ipa: "'e' (bed so'zidagi kabi)", type: 'vowel',
    example: { greek: 'ελπίδα', translit: 'elpída', uz: 'umid' },
  },
  {
    id: 'zeta', upper: 'Ζ', lower: 'ζ', nameGreek: 'Ζήτα', nameLatin: 'Zeta', nameUz: 'Zita',
    ipa: "'z'", type: 'consonant',
    example: { greek: 'ζωή', translit: 'zoí', uz: 'hayot' },
  },
  {
    id: 'eta', upper: 'Η', lower: 'η', nameGreek: 'Ήτα', nameLatin: 'Eta', nameUz: 'Ita',
    ipa: "'i' (ee kabi cho'ziq)", type: 'vowel',
    example: { greek: 'ήλιος', translit: 'ílios', uz: 'quyosh' },
    note: "η, ι, υ va ει, οι birikmalari — hammasi bir xil 'i' tovushi (iotasizm hodisasi).",
  },
  {
    id: 'theta', upper: 'Θ', lower: 'θ', nameGreek: 'Θήτα', nameLatin: 'Theta', nameUz: 'Tita',
    ipa: "'th' (think so'zidagi kabi jarangsiz)", type: 'consonant',
    example: { greek: 'θάλασσα', translit: 'thálassa', uz: 'dengiz' },
  },
  {
    id: 'iota', upper: 'Ι', lower: 'ι', nameGreek: 'Ιώτα', nameLatin: 'Iota', nameUz: 'Iota',
    ipa: "'i'", type: 'vowel',
    example: { greek: 'ιστορία', translit: 'istoría', uz: 'tarix' },
  },
  {
    id: 'kappa', upper: 'Κ', lower: 'κ', nameGreek: 'Κάππα', nameLatin: 'Kappa', nameUz: 'Kappa',
    ipa: "'k'", type: 'consonant',
    example: { greek: 'καρδιά', translit: 'kardiá', uz: 'yurak' },
  },
  {
    id: 'lambda', upper: 'Λ', lower: 'λ', nameGreek: 'Λάμδα', nameLatin: 'Lambda', nameUz: 'Lambda',
    ipa: "'l'", type: 'consonant',
    example: { greek: 'λουλούδι', translit: 'louloúdi', uz: 'gul' },
  },
  {
    id: 'mu', upper: 'Μ', lower: 'μ', nameGreek: 'Μι', nameLatin: 'Mu', nameUz: 'Mi',
    ipa: "'m'", type: 'consonant',
    example: { greek: 'μήλο', translit: 'mílo', uz: 'olma' },
  },
  {
    id: 'nu', upper: 'Ν', lower: 'ν', nameGreek: 'Νι', nameLatin: 'Nu', nameUz: 'Ni',
    ipa: "'n'", type: 'consonant',
    example: { greek: 'νερό', translit: 'neró', uz: 'suv' },
  },
  {
    id: 'xi', upper: 'Ξ', lower: 'ξ', nameGreek: 'Ξι', nameLatin: 'Xi', nameUz: 'Ksi',
    ipa: "'ks'", type: 'consonant',
    example: { greek: 'ξένος', translit: 'xénos', uz: 'notanish, musofir' },
  },
  {
    id: 'omicron', upper: 'Ο', lower: 'ο', nameGreek: 'Όμικρον', nameLatin: 'Omicron', nameUz: 'Omikron',
    ipa: "'o' (not so'zidagi kabi qisqa)", type: 'vowel',
    example: { greek: 'όνειρο', translit: 'óneiro', uz: 'tush (orzu)' },
    note: 'ο va ω bir xil tovush — ikkalasi ham qisqa "o".',
  },
  {
    id: 'pi', upper: 'Π', lower: 'π', nameGreek: 'Πι', nameLatin: 'Pi', nameUz: 'Pi',
    ipa: "'p'", type: 'consonant',
    example: { greek: 'πόρτα', translit: 'pórta', uz: 'eshik' },
  },
  {
    id: 'rho', upper: 'Ρ', lower: 'ρ', nameGreek: 'Ρο', nameLatin: 'Rho', nameUz: 'Ro',
    ipa: "yumaloq 'r'", type: 'consonant',
    example: { greek: 'ρολόι', translit: 'rolói', uz: 'soat' },
  },
  {
    id: 'sigma', upper: 'Σ', lower: 'σ', finalLower: 'ς', nameGreek: 'Σίγμα', nameLatin: 'Sigma', nameUz: 'Sigma',
    ipa: "'s'", type: 'consonant',
    example: { greek: 'σπίτι', translit: 'spíti', uz: 'uy' },
    note: "So'z oxirida σ o'rniga ς yoziladi, tovushi bir xil.",
  },
  {
    id: 'tau', upper: 'Τ', lower: 'τ', nameGreek: 'Ταυ', nameLatin: 'Tau', nameUz: 'Tau',
    ipa: "'t'", type: 'consonant',
    example: { greek: 'ταξίδι', translit: 'taxídi', uz: 'sayohat' },
  },
  {
    id: 'upsilon', upper: 'Υ', lower: 'υ', nameGreek: 'Ύψιλον', nameLatin: 'Upsilon', nameUz: 'Ipsilon',
    ipa: "'i'", type: 'vowel',
    example: { greek: 'ύπνος', translit: 'ýpnos', uz: 'uyqu' },
    note: 'υ ham η/ι bilan bir xil "i" tovushini beradi.',
  },
  {
    id: 'phi', upper: 'Φ', lower: 'φ', nameGreek: 'Φι', nameLatin: 'Phi', nameUz: 'Fi',
    ipa: "'f'", type: 'consonant',
    example: { greek: 'φως', translit: 'fos', uz: "yorug'lik" },
  },
  {
    id: 'chi', upper: 'Χ', lower: 'χ', nameGreek: 'Χι', nameLatin: 'Chi', nameUz: 'Xi',
    ipa: "qattiq 'x' (tomoqdan chiquvchi)", type: 'consonant',
    example: { greek: 'χρόνος', translit: 'chrónos', uz: 'vaqt' },
  },
  {
    id: 'psi', upper: 'Ψ', lower: 'ψ', nameGreek: 'Ψι', nameLatin: 'Psi', nameUz: 'Psi',
    ipa: "'ps'", type: 'consonant',
    example: { greek: 'ψάρι', translit: 'psári', uz: 'baliq' },
  },
  {
    id: 'omega', upper: 'Ω', lower: 'ω', nameGreek: 'Ωμέγα', nameLatin: 'Omega', nameUz: 'Omega',
    ipa: "'o' (omicron bilan bir xil)", type: 'vowel',
    example: { greek: 'ώρα', translit: 'óra', uz: 'soat, vaqt' },
  },
];

export const GREEK_ALPHABET_COUNT = GREEK_ALPHABET.length;

// Kept apart from irregularVerbsCorpPack.js on purpose: that file builds its
// pack from marketData (~1 MB of words), and everything that only needs the id
// (helpers, practice screens, corp layouts) would otherwise drag the whole
// word bank into the app's startup bundle.
//
// Canonical pack id - used both as the corp customPacks key (same id in every
// center, see corpService.ensureIrregularVerbsPack) and as the flat
// word-storage key (see utils/helpers.corpWordStorageId) so a student's
// mastery on a given verb is one shared record no matter which group/center/
// individual pack it was practiced through.
export const IRREGULAR_VERBS_PACK_ID = 'irregular-verbs';

// Bump when the verb list or its sets change (irregularVerbGroups.js, marketData).
// Centers store it on their copy of the pack; a center that already has this
// version is left alone, so opening the admin or teacher panel does not download
// the ~1 MB word bank and rewrite the pack every time.
export const IRREGULAR_VERBS_CONTENT_VERSION = 2;

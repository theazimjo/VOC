/**
 * Utility for fetching dictionary definitions and translations.
 */
export async function lookupWord(word) {
  if (!word || !word.trim()) return null;
  const cleanWord = word.trim().toLowerCase();
  
  const result = {
    word: word.trim(),
    translation: '',
    definition: '',
    example: '',
    partOfSpeech: 'noun'
  };

  try {
    // 1. Fetch details from Free Dictionary API
    const dictPromise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`)
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);

    // 2. Fetch Uzbek translation from MyMemory API
    const transPromise = fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanWord)}&langpair=en|uz`)
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);

    const [dictData, transData] = await Promise.all([dictPromise, transPromise]);

    // Parse Dictionary Data
    if (dictData && dictData.length > 0) {
      const entry = dictData[0];
      const meaning = entry.meanings?.[0];
      if (meaning) {
        result.partOfSpeech = meaning.partOfSpeech || 'noun';
        const defObj = meaning.definitions?.[0];
        if (defObj) {
          result.definition = defObj.definition || '';
          result.example = defObj.example || '';
        }
      }
    }

    // Parse Translation Data
    if (transData && transData.responseData) {
      const translation = transData.responseData.translatedText;
      if (translation && !translation.toLowerCase().includes("mymemory")) {
        // Clean translation results (remove dots, trim)
        result.translation = translation.toLowerCase().trim().replace(/[.]+$/, '');
      }
    }

    return result;
  } catch (error) {
    console.error("Dictionary lookup error:", error);
    return null;
  }
}

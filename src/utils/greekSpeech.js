// Greek pronunciation playback for the standalone Greek track.
//
// The browser's own SpeechSynthesis API can't produce this reliably: on a
// typical Windows/Chrome install there's no local "el-GR" voice, and
// Chrome's bundled remote (Google) voices don't cover Greek either — so
// setting utterance.lang='el-GR' just makes the default (English) voice
// misread the raw Greek script instead of failing loudly.
//
// Instead, each letter's name and example word are pre-rendered, real
// Greek-TTS audio clips checked into public/audio/greek/ (see
// scripts/fetch-greek-audio note in git history — generated once, offline
// from then on, so playback needs no network call and no OS voice pack).
// speechSynthesis is kept only as a last-resort fallback for the unlikely
// case an audio file fails to load.
let currentAudio = null;

function playClip(src) {
  return new Promise((resolve, reject) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    const audio = new Audio(src);
    currentAudio = audio;
    audio.addEventListener('ended', resolve, { once: true });
    audio.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true });
    audio.play().catch(reject);
  });
}

function speakWithBrowserVoice(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
}

// `letterId` matches an id in src/data/greekAlphabet.js; `kind` is 'name' or
// 'example'. `fallbackText` (the Latin transliteration) is what gets read
// by an English voice if the clip can't be played for some reason.
export async function speakGreekClip(letterId, kind, fallbackText) {
  try {
    await playClip(`/audio/greek/${letterId}-${kind}.mp3`);
  } catch {
    speakWithBrowserVoice(fallbackText);
  }
}

// Same idea for the vocabulary track: `wordId` matches an id in
// src/data/greekVocabulary.js, pre-rendered to public/audio/greek/vocab/.
export async function speakGreekVocab(wordId, fallbackText) {
  try {
    await playClip(`/audio/greek/vocab/${wordId}.mp3`);
  } catch {
    speakWithBrowserVoice(fallbackText);
  }
}

// Grammar track: `clipId` is a value from GREEK_GRAMMAR_AUDIO_MAP (see
// greekGrammarSpeakable.js's extractGreekSpeakable + greekGrammarAudioMap.js
// — not every quiz option/answer has one, since mixed Greek+Uzbek text is
// deliberately excluded there). No text fallback is passed here: unlike
// the alphabet/vocab tracks, there's no per-string Latin transliteration on
// hand for arbitrary grammar sentences, so a missing clip just no-ops
// rather than mispronouncing through the browser voice.
export async function speakGreekGrammarClip(clipId) {
  if (!clipId) return;
  try {
    await playClip(`/audio/greek/grammar/${clipId}.mp3`);
  } catch {
    // No reliable fallback for arbitrary grammar sentences — see above.
  }
}

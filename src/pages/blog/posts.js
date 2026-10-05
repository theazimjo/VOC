// Built-in posts (shipped with the app). Posts written in the super-admin
// panel live in the database and are merged with these (see useBlogPosts.js).
//
// Shape (same as database posts): { slug, date, cover, minutes, en }
// where the block is { title, excerpt, body } and body is the small
// Markdown described in markdown.js. The blog is English only.
//
// Numbers in "measured-not-guessed" come from packages/memory-engine
// (`npm run fit:memory`) on the 2026-10-05 export. Update both together.

export const BUILT_IN_POSTS = [
  {
    slug: 'measured-not-guessed',
    date: '2026-10-05',
    cover: 'compare',
    minutes: 5,
    en: {
      title: 'Our model did worse than a plain average',
      excerpt: 'We tested the forgetting model inside VOC on real reviews for the first time. We did not like the result, but it showed us what to look at.',
      body: `VOC works out, for every word, the chance that a person can recall it right now. When we wrote the model it all felt logical: words fade as time passes, every review strengthens them. One thing was missing. We had never checked it against what real learners actually answered.

So we did. We took more than 37,000 reviews from 24 learners. No names, no emails, just answer history. Eight learners were set aside: the model never sees them while it trains, and we test on exactly those.

For comparison we used the simplest thing there is, the same guess for everyone. Learners were getting about 89 percent of words right, so just saying "correct" every time is already a decent guess. If our model could not beat that, what was it for?

## It did not come out well

:::bars All reviews, unseen learners
note: How well it separates words you will forget from words you will remember (AUC). 0.5 is chance, 1 is perfect.
The same average guess for everyone | 0.50 | base
Classic forgetting curve | 0.53 | mid
New VOC model | 0.78 | model
:::

The old model scored 0.53. Chance is 0.50, so there is barely any difference. Checking its probabilities across all the data showed something odd too: in the 461 reviews where it said "this person will almost certainly forget, 3 percent", learners actually got the word right 67 percent of the time. The model expected far more forgetting than there was.

## Looking at the data

First we checked the code for a bug and did not find one. Then we looked at the data itself. 67 percent of the reviews happened inside a single practice session, less than an hour after the previous review of that word. If a word shows up twice in a row in a game or a quiz, there is no time to forget it. Recall was 89 percent under an hour, 92 percent after one to three days, and still around 88 after weeks. Time was hardly changing anything.

:::figure sessions

On top of that, most answers were the "I knew it" button or picking from options, and a guess can be right when you pick. So this data was about practising, not about forgetting, and a forgetting curve has nothing to grab onto in data like that.

## What worked

So we changed the question: what actually affects recall? The strongest signal was the word's own record with that person, meaning how often they had got it right before. After that came the confidence reported on the last review, how many times the word had been seen, and the person's overall accuracy. We built a new estimate from those four. On unseen learners it scored 0.78, and its probabilities came out close to reality: when it says 80 percent, it is right about 80 percent of the time.

:::figure factors

One more check, to be fair. A forgetting model is really written for spaced reviews, so we looked separately at reviews that came at least 6 hours after the previous one. There the old model came back to life. We also added the open FSRS-6 algorithm (from its open source code, default settings) and it landed in the same place. Both were overconfident in their own probabilities.

:::bars Spaced reviews only
note: Reviews at least 6 hours after the previous one, AUC.
The same average guess for everyone | 0.50 | base
Classic forgetting curve | 0.69 | mid
FSRS-6 (default settings) | 0.69 | mid
New VOC model | 0.72 | model
:::

Our new model was trained on these learners' data and FSRS was not. So we do not say "we beat FSRS". We say "it performs at that level".

## What we do not know

There are only 24 learners, 8 in the test, so please do not lean on these numbers; they show a direction. Genuinely spaced reviews are also still rare. That is why the review schedule, meaning when a word comes back, still runs on the older logic. When there is more data we will measure again and write the result here.

In the app, this changed: the "recall" percentage and "words at risk" now come from the word's history with you, not from elapsed time. We also started logging the session and the answer type (typed or chosen) for every review. Next time we will measure those two separately.`,
    },
  },
  {
    slug: 'why-new-words-disappear',
    date: '2026-10-05',
    cover: 'curve',
    minutes: 3,
    en: {
      title: 'Why a new word disappears by tomorrow',
      excerpt: 'You learn ten words in the morning and by evening half are gone. That is normal, and you can slow it down.',
      body: `You learn ten new words in the morning. By evening you remember five or six, and after a week almost none. The first time it happens, most people blame themselves: my memory is bad, they say. It is not. People just work like that.

## Forgetting starts fast

In 1885 the German scientist Hermann Ebbinghaus tried this on himself. He memorised lists of nonsense syllables and counted how many he still knew after different delays. The biggest loss came right at the start, then the curve flattened out. Later studies have backed that shape, while the exact speed changes from word to word and from person to person.

The good news is that every time you recall a word, forgetting slows down. That is why review gaps keep growing: today, tomorrow, in a week, in a month. The whole craft is one thing, bringing a word back while it is slipping but has not vanished yet. Review too early and you waste the time, too late and you are close to learning it from scratch.

## What helps in practice

Try to recall a word before you look at the answer. Making yourself remember beats reading the translation; researchers call this the testing effect. Writing the word or saying it out loud is better still, since it takes more effort and so it sticks more.

Spread your reviews over days instead of doing ten in one. And if you can, sleep between them, because newly learned material consolidates while you sleep.

One more thing: not every word is forgotten the same way. "Table" stays after one look, while "reluctant" slips away even after ten tries. So giving every word the same schedule is wasteful. Easy words eat time, and hard words do not come back often enough.

:::figure factors

VOC keeps a separate estimate for each word. It looks at how the word has been going for you, how confident you were, and whether you typed the answer or picked it. A correct typed answer counts for more. Hard words come back often, easy words less. We also measured how well this works on real data, and [wrote about that separately](/blog/measured-not-guessed).`,
    },
  },
];

export const getBuiltIn = (slug) => BUILT_IN_POSTS.find((p) => p.slug === slug) || null;

/** The post's text block (the blog is English only). */
export function pickLang(post) {
  return post.en || { title: '', excerpt: '', body: '' };
}

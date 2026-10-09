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
    slug: 'two-learners-one-word',
    date: '2026-10-09',
    cover: 'twolearners',
    minutes: 6,
    en: {
      title: 'Two learners, one word: how VOC decides when it comes back',
      excerpt: 'Dilnoza loses a new word in about five days, Jasur in about three. A fixed schedule suits neither. Here is what VOC does instead, step by step.',
      body: `Picture two students from the same class. Same ten new words on Monday, same homework. Dilnoza's memory holds a new word for about five days before it fades. Jasur's holds it for about three. Nobody did anything wrong. People differ, and so do words.

A fixed plan, "tomorrow, then in a week, then in a month", is too slow for Jasur and too busy for Dilnoza. VOC does not use a plan. It keeps a number for every word, separately for every person, and updates that number after each answer. Here is how, in order.

## 1. One number for each person and word

For every word you have, VOC stores one number: how many days that memory lasts. We call it stability and write it S. The chance that you still remember the word after t days is e^(−t/S). In plain words, after S days about a third of it is left (37 percent).

For Dilnoza's word S is about 5. For Jasur's it is about 3. A brand-new word starts at 1 day for everyone, because VOC cannot know who you are yet; the number settles where your memory really is after a few answers. In this story we skip ahead to the settled numbers.

## 2. A word comes back at 75 percent

VOC does not wait until a word is gone, and it does not call it back too early. It picks the moment when your chance of remembering has dropped to 75 percent, which is 0.29 × S days after the last review. For Dilnoza that is day 1.4. For Jasur it is day 0.9, about 21 hours.

:::figure twolearners

Read the picture like this: each line is the chance of remembering the word. When it touches the dashed line, the word is due, you answer, and the line jumps back to the top. Dilnoza's gaps open up quickly: 1.4, 3.1, 3.6, 8.3, 15.4 days. Jasur's reviews stay close together at first, and on day 2.2 he got one wrong. We will come back to that.

## 3. What a correct answer is worth

When you answer correctly, S grows. How much depends on how the answer went, and VOC never asks you "how sure were you?". It reads that from your speed: under 2.5 seconds counts as full confidence, under 5 seconds a little less, under 8 seconds less again, slower than that even less. Then it adds up a few more things. This is Dilnoza's first review:

:::figure growth

- A fast answer earns a small extra bonus, a very slow one loses a little.
- A word that was already fading is worth more than one you reviewed too early, up to +0.30. Making your memory work is what strengthens it.
- If you slept between the two reviews, +0.15. Sleep really does help memories settle.
- If you typed or said the word instead of tapping, another +0.15.

So Dilnoza's 5 days became 10.9. Jasur's first answer was slower, so his 3 days became 4.7.

## 4. A wrong answer halves it

On day 2.2 Jasur typed the word and got it wrong. His S went from 4.7 to 2.4, and VOC brought the word back 17 hours later. It is not a punishment. It is just an honest update: this word is shakier than we thought.

## 5. Hard words and easy words

Besides S, every word has a difficulty between 0 and 1. It starts in the middle. A wrong answer pushes it up, a correct one nudges it down, a confident one a little more. Then it works as a multiplier: an easy word grows up to 30 percent faster, a hard word up to 30 percent slower. This is why "table" and "reluctant" end up on different schedules even for the same person.

## 6. Topic groups, and what "context" means here

You may have wondered whether VOC understands a word through its context. Here is the honest answer, because it is narrower than it sounds. VOC puts every word into a group: about fifteen everyday topics (food, health, travel, family, money and so on), four word types (verbs, adjectives, adverbs, nouns), and any topic you or your teacher set on a word. For each group it compares what it predicted with what actually happened.

If you remember the words of one group better than predicted, their growth is raised, by up to 40 percent. If you remember them worse, it is lowered, by up to 30 percent. VOC needs at least five reviews in a group before it trusts the comparison. So the "context" is the group a word belongs to, not the sentence around it.

Sentences matter somewhere else. When you tap a word while reading a chapter, VOC uses the sentence to pick the translation that fits that sentence. That makes the right meaning appear, but it does not change the schedule.

## 7. Typing counts more than tapping

A flashcard "I know" is easy to press. A quiz can be guessed. So VOC does not treat all answers the same. In the personal Review session it also decides on its own how to ask: a word you have never seen is shown as a flashcard, because there is nothing to retrieve yet; after that, any word whose memory is shorter than 5 days is asked by typing; strong words are mostly tapped, but about one in five is still typed so that VOC keeps checking. (Group students get the same idea in step 8.)

There is one more rule, and it matters: tapping alone cannot take a word past about 65 percent mastery. Until you have answered it correctly by typing or saying it, in two different exercises (for example spelling and pronunciation), its memory is held at about 12.6 days. Look back at Dilnoza. On day 4.6 she typed the word and the model wanted 25 days, but it was held at 12.6. A few days later she said it aloud, the two different exercises were done, and the word jumped to 28.9 days.

## 8. One button

In group mode students do not pick exercises. They press Practice, and VOC builds the session for that person:

:::figure flow

Words from older topics that started to fade come back first. Then the new words of the topic as flashcards, five at first and fewer later if you are struggling. Then the words you have seen but never typed. Then a rotation of quiz, match and spelling for words you have typed once. When everything is strong, the session is short.

## Where the two end up

Dilnoza needed five reviews in 32 days. Her word now lasts about 95 days in her memory and comes back in 27 days. Jasur needed six reviews in 11 days, one of them a miss. His word lasts about 26 days and comes back in 8. Different roads, the same word learned, and neither of them had to choose a plan.

## What we have not proven

The growth numbers in step 3 (0.35, 0.40, 0.20, and the rest) are judgement calls. They are sensible and we tested them on made-up learners, but we have not fitted them to real data yet. We did measure something else on real data: how well VOC predicts whether you remember a word. [That story is here](/blog/measured-not-guessed), and it is also why the schedule you see in this post still runs on the older logic. When we have more genuinely spaced reviews, we will fit these numbers too and write down what changed.`,
    },
  },
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

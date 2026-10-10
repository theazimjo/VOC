# VOCABRY on the Microsoft Store

VOCABRY for Windows is the web app (`https://vocabry.uz`) packaged as an MSIX. It opens in its own
window, updates whenever the site is deployed, and needs no separate build.

What is already in the repo: a complete web manifest (`public/manifest.json`: id, scope, 192/512 and
maskable icons, screenshots, shortcuts), a service worker with offline support, and the "Download"
section on the landing page (installs the app from Edge/Chrome today).

## Status (2026-10-10)

- Partner Center product **VOCABRY** is reserved. Store ID `9NGJ2603XW6F`, listing link
  `https://apps.microsoft.com/detail/9NGJ2603XW6F` (live only after the app is published).
- Identity: `Name = AzimLabs.VOCABRY`, `Publisher = CN=A52E6ACB-27B9-4FA8-A73E-D54FBFF6083A`,
  `PublisherDisplayName = Azim Labs`.
- Package v1.0.1.0 was built with the PWABuilder service and uploaded to draft submission 1
  (the build is kept outside git in `D:\android-build\windows`).
- Draft submission 1 is complete (Pricing free, Properties, Age ratings 3+, Packages, Store listing
  with 4 desktop screenshots, Submission options). Certified and live in the Store (2026-10-10): https://apps.microsoft.com/detail/9NGJ2603XW6F, `MS_STORE_URL` is set.
  The package declares `runFullTrust` (every PWABuilder package does); certification asks why, answer:
  "The app is a web app (https://vocabry.uz) hosted in the Microsoft Edge WebView; it needs no extra access."

## One-time: your Microsoft account (only you can do this)

1. Open <https://partner.microsoft.com/dashboard/registration/developer> and register as an
   **Individual** developer (one-time fee, about 19 USD; a company account costs more and needs
   company documents). Verification can take a few days.
2. In Partner Center: **Apps and games > New product > MSIX or PWA app**, reserve the name **VOCABRY**
   (if taken, "VOCABRY - Vocabulary").
3. Open **Product management > Product identity** and note three values:
   - `Package/Identity/Name`, like `12345YourName.VOCABRY`
   - `Package/Identity/Publisher`, like `CN=XXXXXXXX-XXXX-...`
   - `Package/Properties/PublisherDisplayName`

## Build the package

1. Open <https://www.pwabuilder.com>, enter `https://vocabry.uz`, press **Start**.
2. Choose **Package for stores > Windows**. Under "Other options" paste the three values from step 3
   above, set **Package ID** to `Package/Identity/Name`, **Publisher ID** to `Publisher`, **Version** `1.0.0.0`.
3. Download the zip and take the `.msixbundle` (or `.msix`) from it. Do not sign it yourself:
   the Store signs it.

(Give me the three values and I can run the same packaging from the command line instead.)

## Submit

1. Partner Center > your product > **Start your submission**.
2. **Packages**: upload the `.msixbundle`.
3. **Store listing** (English; add Russian and Uzbek if you want): text below.
4. **Properties**: category **Education**; privacy policy URL `https://vocabry.uz/privacy.html`.
5. **Age ratings**: answer the questionnaire (no violence, no user-to-user chat, no purchases).
   VOCABRY has accounts for learners under 13, so mention that the privacy policy covers children.
6. **Pricing**: Free.
7. Submit. Review usually takes 1 to 3 business days.

## Store listing text

**Name:** VOCABRY

**Short description (up to 100 characters):**
Learn English vocabulary with practice timed to when you are about to forget each word.

**Description:**
VOCABRY keeps track of every English word separately for each learner and brings it back right
before it is forgotten. Practice a few minutes a day instead of cramming.

- One Practice button builds the session: new words, writing, speaking and words about to fade
- Read texts and tap any word to see its translation, then add it to your words
- Flashcards, multiple choice, spelling, speaking, matching and speed rounds
- Goals, streaks and an activity calendar
- Works offline and syncs when you are back online
- For learning centers: groups, homework, teacher and admin panels, progress for every student
- Interface in Uzbek, Russian and English

**Keywords:** vocabulary, English, flashcards, spaced repetition, learning center, IELTS, words

**Screenshots:** at least 1, up to 10, PNG or JPG, at least 1366 x 768. Take them from the installed
Windows app (student home, practice, reading, the teacher and admin panels). The phone screenshots
in `play-store/` are not suitable for the Windows listing.

## After it is published

Set `MS_STORE_URL` in `src/utils/pwaInstall.js` to the listing link
(`https://apps.microsoft.com/detail/<product id>`). The landing page then shows the
"Get it from Microsoft Store" button. Updating the app later needs no new package: deploy the site.

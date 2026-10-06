# Center Admin design reference

Source of truth: Typing.com's School Admin panel, captured in
`.claude/image.png` (teacher detail, empty classes), `.claude/image copy.png`
(dashboard), `.claude/image copy 2.png` (Custom Lessons, empty state +
sidebar), `.claude/image copy 3.png` (Account Settings form), `.claude/image
copy 4.png` (teacher detail, populated Classes tab — a table). When building
or changing a `/corp/admin/*` page, check these first — don't invent a new
layout shape for something that already has a reference screenshot.

This module has **two established page shapes**. Pick the one that matches
what the page actually is; don't blend them.

## 1. List/table page — the Faculty pattern

Used for: a page whose whole job is one table. Applied to `AdminTeachers.jsx`
(Faculty), `AdminGroups.jsx` (Groups), `AdminStudents.jsx` (Students),
`AdminCourses.jsx` (Courses) — every top-level list page in the sidebar now
follows this, including the ones that predate the Typing.com redesign and
keep their own (Uzbek) copy: this pattern is about the visual shell, not the
language — see "Language" below.

- `<Page hideHeader>` — no big title, no toolbar chrome above the card.
- Everything lives inside one `<section className="ca-card is-faculty-card">`
  (white, 8px radius, hairline border, `0 1px 3px` shadow, `padding: 0`).
- `.faculty-toolbar` inside the card, `justify-content: space-between`:
  - Left (`.faculty-toolbar-left`): either icon buttons (`.faculty-icon-btn`,
    32×32) plus a destructive bulk action (`.faculty-btn-delete`) when the
    page has multi-select (Faculty, and the Classes tab table), *or* filter
    controls (`SearchField` / `select` / `Segmented`) wrapped in
    `.faculty-toolbar-filters` when it doesn't (Groups, Students, Courses —
    add `.faculty-toolbar-wrap` on `.faculty-toolbar` too, so the filter row
    wraps on narrow screens instead of overflowing).
  - Right (`.faculty-toolbar-right`): the primary action, `.faculty-btn-invite`
    (solid blue) — "Invite Faculty" / "Yangi kurs", etc. A secondary,
    non-destructive toolbar button (e.g. "Class Settings") uses
    `.faculty-btn-secondary` instead of `.faculty-btn-delete`'s red hover.
- Table: `.faculty-table-head` (uppercase 11px gray labels on
  `--sa-surface-2`, hairline top/bottom borders) + `.faculty-table-row`
  (grid row, hover tint, `cursor: pointer`, whole row navigates — see
  `AdminTeachers.jsx`'s `onClick={() => open(t)}` on the row, with
  `stopPropagation` on the checkbox and name link). Each page's own column
  set gets its own `grid-template-columns` override scoped by an extra class
  on `.faculty-table` (`.groups-table`, `.students-table`, `.courses-table`,
  `.teacher-classes-table` — see `uits.css`), reusing `.faculty-table-head`/
  `.faculty-table-row`'s base look rather than re-styling from scratch.
- Empty state: plain `<EmptyState icon title text action={<Button>...} />`
  inside `<div className="sa-group" style={{ padding: 20 }}>` — no
  illustration. A table with zero rows isn't the same thing as "this one
  person/thing has nothing in it" (see the "no classes" banner below).

## 2. Detail/profile page — the Teacher Detail pattern

Used for: a page about one entity with its own sub-sections
(`AdminTeacherDetail.jsx`). Matches `.claude/image.png` almost exactly.

- `<Page hideHeader>` — **no `back` prop**: the back link, header and tabs
  render inside `.teacher-detail-topband`, a full-bleed white band (negative
  margins cancel `.ca-content`'s 24px padding) that renders its own back
  button (`.sa-back` + `ChevronLeft`, same look Page would've given it).
  Only the tab body below the band sits on the layout's tinted
  `.corp-admin-main-pane` background (`#f6fdff` + soft radial accents) — the
  reference's white area stops right at the bottom of the tab row.
- Header (`.teacher-detail-header`): big title (`.teacher-detail-title`,
  26px/700) on the left with a small status pill underneath
  (`.teacher-role-badge` — amber `#fdf1e0` bg / `#b45309` text, matches the
  reference's "School Admin" chip); an outlined pill button on the right
  (`.teacher-settings-btn` — blue outline, icon + label, e.g. "School Admin
  Settings").
- Sub-tabs (`.teacher-nav-tabs` / `.teacher-nav-tab`): underline style —
  gray inactive, blue text + 2px blue underline when active, full-width
  hairline border under the whole row. This is a **different** tab
  component from `.ca-tabs`/`.ca-tab` (the chip-style segmented control used
  on Settings pages, section 3) — don't swap one for the other.
- Empty state for something this entity owns (e.g. "has no classes"):
  `.teacher-empty-banner` — a plain paper card with a centered
  `.teacher-empty-center-box` (title + one CTA). No illustration (removed on
  purpose; keep it typographic, like the landing page).
- Populated sections mostly use the shared `Section` + `Row` components
  (`super-admin/ui.jsx`), *except* when the tab's content is itself a list
  worth a table — the populated Classes tab (`.claude/image copy 4.png`)
  reuses the **Faculty table shell** (`.ca-card.is-faculty-card` /
  `.faculty-toolbar` / `.faculty-table*`) inline inside the tab body, with
  its own column set and a `.faculty-btn-secondary` toolbar-button variant
  (same shape as `.faculty-btn-delete` but a neutral blue hover instead of
  red, for non-destructive bulk actions like "Class Settings" / "Archive").
  So: the *page* follows the detail-page shell (section 2's header/tabs),
  but an individual *tab's body* can follow the list-page pattern (section 1)
  when that's what the reference shows for it — the two patterns compose,
  they aren't mutually exclusive per page.
- `AdminProfileDetail.jsx` (`/corp/admin/admins/:uid`) reuses this same
  shell for an admin who has no `centers/{id}/teachers/{}` record (the
  center's original admin, or a co-admin invited via `inviteCenterAdmin` —
  see `admins` in `CenterDataContext.jsx`, backed by `centers/{id}.adminUid`
  and the `coAdmins` map). Same topband/header/role-badge/all-4-tabs as
  Teacher Detail (School/Classes/Reports/Logins) — an admin can own classes
  exactly the way a teacher does (a group's `teacherId` is just a foreign
  key to whoever runs it, see `ClassesTab.jsx`), so Classes/Reports are
  real, not fabricated: `CenterDataContext`'s `teacherById` resolves both
  real teacher ids and admin uids, so an admin-owned class's owner name
  still shows correctly in Groups/Group Detail. Faculty's admin rows
  (including your own) open this page, not a modal and not Settings.
  Classes/Reports content is shared with Teacher Detail via
  `ClassesTab.jsx`'s `<ClassesTab>`/`<ReportsTab>` — don't fork this logic
  per page; add an `ownerId` (a teacherId or an admin uid) instead.

## 3. Settings / form page

Used for: `AdminSettings.jsx`. Matches `.claude/image copy 3.png`.

- `<Page icon title subtitle action={tabs}>` (NOT `hideHeader` — this page
  uses the persistent toolbar header, with `.ca-tabs`/`.ca-tab` as the
  `action` — the segmented chip-style tab control, styled in the toolbar
  itself rather than inline in the body).
- **Any** non-`hideHeader` `<Page>` in this module renders this toolbar bar
  (`.ca-toolbar` — sticky, icon box + title/sub on the left, `action` on the
  right; `back` becomes a small square button inline in it, not the
  full-width `.sa-back` link `hideHeader` pages draw themselves). This used
  to be silently dropped — `ui.jsx`'s `Page` had the CSS for it
  (`.ca-toolbar*` in `uits.css`) but the component's `'toolbar'`-style
  branch never actually rendered `title`/`subtitle`/`action`/`icon`, so
  every page using them without `hideHeader` (Settings' tabs, Course
  Editor's add-topic button, Group/Student Detail's title) was invisible.
  Fixed in `ui.jsx`. `PageStyleContext` is `'toolbar'` for the teacher panel
  too, so that fix wasn't center-admin-only.
- Each topic is its own `<section className="ca-card">` inside
  `.ca-stack`, with a `.ca-card-head` (icon + title + sub) and a form using
  `Field`/`sa-input`.
- Two-column layout for paired fields (`.ca-form-grid`), full-width via
  `.is-full` for single fields like an address.

## 4. Dashboard

`AdminHome.jsx`. Matches `.claude/image copy.png` (Typing.com's own
dashboard) section-for-section, not just in spirit:

- **Student Activity** (redesigned 2026-09-30, `ca-dash-*` classes):
  `.ca-dash-head` (big title + range text, one date filter + refresh on
  the right — the filter drives the whole page), four `.ca-dash-tile`s
  (Active in range / Avg time / Avg mastery / Ever practiced), a
  `.ca-dash-levels` mastery-breakdown stacked bar, then the Most Active
  table. "Practiced" comes from `lastActivity` (every practiced unit has
  it); time from `timeSpentSeconds` (only newer sessions — the tile says
  "recorded from the next practice session" rather than showing 0). The
  notes below about the older single-card layout are history. The reference's right-hand "Level Up with PLUS" upsell panel and
  top-right "Need some help?" link are **dropped** — VOC has no paid tier
  and no help center to point either at; don't add a placeholder for them.
- **Most Active Teachers**: same `.ca-section-row` + `.ca-card` shell, body
  is the `.sa-table.is-flat` convention (desktop, with a `.ca-teachers-table`
  scoping class for the `.claude/image copy 5.png` gray header bar — a
  `.sa-table-head` background override scoped to this table only, since
  `.sa-table` is a shared super-admin component other pages also use
  unstyled) / `Row` list (mobile). Columns: O'qituvchi / Sarflangan vaqt /
  Faol o'quvchi / O'rtacha aniqlik. Reference has TEACHER / TIME SPENT
  TYPING / ACTIVE STUDENTS / AVG SPEED / AVG ACCURACY — **AVG SPEED is
  dropped** (VOC never measures typing speed/WPM, no data would back it),
  but **AVG ACCURACY is kept**, reading from `studentMastery()` (the same
  spaced-repetition mastery score shown everywhere else in the app) since
  that's the closest real, already-computed stand-in for "how accurately is
  this teacher's class learning" — not a literal per-keystroke number, but
  not fabricated either.
  The reference's "Date: Last Week ▾" filter (`.claude/image copy 3.png`) is
  real, not decorative: `.ca-daterange` is a small anchored popover
  (`.ca-daterange-btn` + `.ca-daterange-menu`, closes on outside click via a
  `mousedown` listener) offering Kecha/So'nggi hafta/So'nggi oy, and picking
  one actually recomputes the time/active-student columns for that window —
  see `topTeachers`'s `sinceTs`-based aggregation in `AdminHome.jsx`. Don't
  wire a filter control to a fixed number; if the data can't move with the
  filter, the filter shouldn't exist.

Only build a stat here if it comes from data already written somewhere real
— the typing-time stat required adding `timeSpentSeconds` to
`updateStudentUnitProgress`'s payload (measured in `CorpPractice.jsx` from
when a practice run actually starts) rather than estimating it, since a
decorative number with no backing write would violate this module's
no-fake-UI rule same as Billing Admin / Google Classroom sync / AVG SPEED
above did.

## Modals

Two families exist — pick based on what the modal is:

- **Bespoke centered modal** (`invite-modal-card`, `teacher-info-modal-card`
  families): `.adm-modal-overlay` (fixed, centered, scrim+blur) wrapping a
  white card, 12px radius, `0 20px 40px -10px rgba(0,0,0,.15), 0 10px 15px
  -5px rgba(0,0,0,.04)` shadow. Header = title (+ icon) and a close
  button (`.faculty-icon-btn` with `X`), a hairline divider, then body
  sections with `.teacher-info-section-label` / `.invite-field-label`
  headers. Used for: Invite Teachers, Invite School Admin, Edit Teacher.
- **Sheet component** (`ui.jsx`'s `<Sheet>`): centered inside
  `CorpAdminLayout` (`SheetPlacementContext` is `'center'` there — every
  Sheet in center admin is centered, never a drawer; the teacher panel is
  `'center'` too now, while super admin still uses drawers). `.ca-theme .sa-sheet:not(.is-drawer)` carries the 12px radius /
  shadow that matches the bespoke-modal family above, so a Sheet already
  reads as the same family without extra overrides.
  A Sheet's `aside` prop (a side-by-side panel, e.g. `CourseEditor`'s
  `ImportSheet` preview table) renders on **any tablet-up screen**,
  regardless of drawer vs. centered placement — see `Sheet`'s own
  `{tabletUp && aside && ...}` check in `ui.jsx`. In drawer mode the aside
  sits to the left of the 460px drawer (`.sa-sheet-aside`, sized off the
  drawer width); in centered mode it sits to the left of the centered card
  as a narrower panel (`.sa-sheet-scrim:not(.is-drawer) .sa-sheet-aside` in
  `sa.css`, both centered together as a pair). A caller that hides its own
  fallback content on the assumption the aside will show should gate on the
  exported `useTabletUp()` alone (the same check `Sheet` uses internally) —
  not on screen width via `isDesktop`, and not on `SheetPlacementContext ===
  'drawer'` (that used to be required but no longer is).
  `ImportSheet` shows its aside on tablet-up **even with zero rows** (an
  empty state), so the modal doesn't jump sideways on the first word. Its
  center-admin look (pill tags, sentence-case table header, dot status
  pills, hover-only ×) lives under `.is-center-admin` in `uits.css`, which
  the teacher panel's layout also carries.

## Courses (AdminCourses → CourseEditor)

All three levels (course list, a course's topics, a topic's words) use the
Faculty card shell. Rows open on click; rename / duplicate / delete are
`.ca-row-action` icon buttons on the row (hover-revealed, always visible on
touch) — no "…" menu step. Inside a course, the header's settings button
opens the same course sheet AdminCourses renders for the list (so it can
rename / duplicate / delete without going back). Topics and words have an
inline `QuickAddRow` (type, Enter, repeat) — the modal (`NameSheet` /
`WordSheet`) stays for renaming and for a word's optional fields. The
teacher panel (TeacherPacks) uses the same views; `en` only switches the
copy.

## Teacher panel

Since 2026-10-04 the teacher panel (`/corp/teacher/*`) wears the center
admin look rather than its old iOS/mono-caps one. `TeacherLayout` carries
`.is-center-admin` (always light, every center-admin style applies),
centered sheets, `TeacherSidebar` (same brand + nav-only sidebar) and
`TeacherTopbar` (CorpAdminTopbar's classes: search over the teacher's
groups/students, quick-add, profile menu with settings / personal mode /
logout). Copy is **English** since 2026-10-04 (was Uzbek) — both layouts
provide `PanelLanguageContext` = 'en', which Sheet / SearchField /
ConfirmSheet read for their built-in labels; shared components that take
`en` (CourseEditor, groupView, useGroupInsights, PackEditorSheet,
GoogleLinkRows) get it passed explicitly. My Groups = `ca-dash-tile`s + a Faculty
table (`.teacher-groups-table`); To'plamlar = the Courses table
(`.courses-table.teacher-packs-table`); Arxiv = Faculty table; Settings =
pattern 3 without a theme tab.

Group page (both panels, `groupView.jsx`, 2026-10-04): `GroupHeader` is a
Teacher-Detail-style white band (back, avatar + name + meta + course
chips, join-code pill, actions, underline tabs with counts), then
`GroupStats` (four `ca-dash-tile`s), then the tab body in a Faculty card:
students table with status filter pills + sort, homework rows with a
done/started/not-started stacked bar that expand to names, topics as a
table per course, progress as `ca-dash-levels` cards. The word import modal
picks its source with three cards (Text / File / AI steps), keeps the
summary + add button in the Sheet `footer`, and its preview can filter to
errors or drop them all. Topbar quick-add/search deep-link with
`?new=group`, `?new=pack` and `?student=<uid>`.

## Language

Center admin pages built against these Typing.com screenshots (Faculty,
Teacher Detail) use **English** for interactive UI text, matching the
reference. Older pages from before this redesign (teacher's own
`TeacherSettings.jsx`, `SetPasswordSheet.jsx`, `ConfirmSheet` copy on
pages nobody's redesigned yet) are still Uzbek and shared with the
Uzbek-first super-admin panel — don't translate those in passing; that's a
separate, deliberate decision the user hasn't made yet.

## Theming

Center admin has no dark mode (see `theme.css`'s `.is-center-admin`
overrides) — always light, regardless of the account's personal theme
setting. Don't reintroduce a theme picker on `AdminSettings.jsx`.

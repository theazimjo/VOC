import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, Check, ChevronDown, ClipboardList, NotebookPen, X } from 'lucide-react';
import { addGroupHomework } from '../../../services/corpService';
import { Button, EmptyState, LoadingRows, Page, SearchField } from '../super-admin/ui';
import { useToast } from '../super-admin/useToast';
import { useIsDesktop } from '../super-admin/useIsDesktop';
import { masteryTone, useGroupInsights } from '../center-admin/useGroupInsights';
import { getHomeworkCandidates, getUsedHomeworkKeys, resolveHomeworkItemUnit } from './utils';
import { useTeacherData } from './TeacherDataContext';

const keyOf = (c) => `${c.packId}_${c.monthId}_${c.unitId}`;
const unitKeyOf = (c) => `${c.monthId}_${c.unitId}`;

// Pick topics from the group's packs and hand them out as one dated
// assignment. Left: the topics, per pack, with how the group already does
// on each (real progress — topicStats) and a peek at its words. Right: a
// sticky summary — optional name, the picked topics in order, totals and
// the assign button. Below 1100px the summary drops under the list (not
// sticky) and a bottom bar keeps the assign button in reach. Topics given before stay
// visible under "All" but can't be picked again.
export default function TeacherAssignHomework() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [toastNode, showToast] = useToast();
  const { loading, groups, packs, center, centerId, patchGroup } = useTeacherData();
  const [picked, setPicked] = useState([]); // keys, in pick order
  const [filter, setFilter] = useState('new');
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [peek, setPeek] = useState(null);
  const [saving, setSaving] = useState(false);

  const group = groups.find((g) => g.id === groupId) || null;
  const groupPath = `/corp/teacher/group/${groupId}`;
  const back = { label: group?.name || 'Group', onClick: () => navigate(groupPath) };

  const raw = center?.groups?.[groupId];
  const rawGroup = useMemo(() => (raw ? { id: groupId, ...raw } : null), [raw, groupId]);
  const { courses } = useGroupInsights(rawGroup, center, { en: true });
  const topicStat = useMemo(() => {
    const map = {};
    courses.forEach((c) => c.topics.forEach((t) => { map[`${c.id}::${t.key}`] = t; }));
    return map;
  }, [courses]);

  const byPack = useMemo(() => {
    if (!group) return [];
    const candidates = getHomeworkCandidates(group, packs, getUsedHomeworkKeys(group.homework));
    const map = new Map();
    candidates.forEach((c) => {
      if (!map.has(c.packId)) map.set(c.packId, { packId: c.packId, title: c.packTitle, units: [] });
      map.get(c.packId).units.push(c);
    });
    return [...map.values()];
  }, [group, packs]);

  if (loading) return <Page title="New homework" back={back}><LoadingRows count={6} /></Page>;
  if (!group) return <Page title="Group not found" back={{ label: 'My groups', onClick: () => navigate('/corp/teacher') }} />;

  const all = byPack.flatMap((p) => p.units);
  const fresh = all.filter((c) => !c.used);
  const byKey = Object.fromEntries(all.map((c) => [keyOf(c), c]));
  const chosen = picked.map((k) => byKey[k]).filter(Boolean);
  const chosenWords = chosen.reduce((n, c) => n + (c.totalWords || 0), 0);
  const students = group.activity.students;

  const toggle = (c) => {
    if (c.used) return;
    const k = keyOf(c);
    setPicked((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };
  const packFresh = (p) => p.units.filter((c) => !c.used);
  const allPicked = (p) => packFresh(p).length > 0 && packFresh(p).every((c) => picked.includes(keyOf(c)));
  const togglePack = (p) => setPicked((prev) => {
    const keys = packFresh(p).map(keyOf);
    return allPicked(p) ? prev.filter((k) => !keys.includes(k)) : [...prev, ...keys.filter((k) => !prev.includes(k))];
  });

  const q = search.trim().toLowerCase();
  const visiblePacks = byPack
    .map((p) => ({
      ...p,
      units: p.units
        .filter((c) => filter === 'all' || !c.used)
        .filter((c) => !q || [c.unitTitle, p.title].some((v) => (v || '').toLowerCase().includes(q))),
    }))
    .filter((p) => p.units.length > 0);

  const give = async () => {
    const items = chosen.map(({ packId, monthId, unitId, packTitle, unitTitle, totalWords }) => ({ packId, monthId, unitId, packTitle, unitTitle, totalWords }));
    if (!items.length) return;
    setSaving(true);
    try {
      const hw = await addGroupHomework(centerId, group.id, items, { name: name.trim() });
      const { id, ...data } = hw;
      patchGroup(group.id, (g) => ({ ...g, homeworkList: { ...(g.homeworkList || {}), [id]: data } }));
      navigate(`${groupPath}/homework/${id}`, { replace: true });
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
      setSaving(false);
    }
  };

  const summary = (
    <aside className="ca-card ca-assign-summary">
      <div className="ca-assign-summary-head">
        <span className="ca-dash-tile-icon tone-orange"><ClipboardList size={17} /></span>
        <div>
          <h3 className="ca-dash-card-title">Homework</h3>
          <span className="ca-dash-card-sub">For {students} {students === 1 ? 'student' : 'students'} in {group.name}</span>
        </div>
      </div>

      <label className="ca-assign-name">
        <span>Name <span className="ca-muted">(optional)</span></span>
        <input
          className="sa-input"
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
          placeholder="Defaults to the topic names"
        />
      </label>

      <div className="ca-assign-picked">
        <span className="ca-assign-picked-label">Topics</span>
        {chosen.length === 0 ? (
          <p className="ca-assign-hint">Tick topics {isDesktop ? 'on the left' : 'above'}. Each one counts as done when a student reaches 80% mastery.</p>
        ) : (
          <ol className="ca-assign-picked-list">
            {chosen.map((c, i) => (
              <li key={keyOf(c)}>
                <span className="ca-assign-picked-num">{i + 1}</span>
                <span className="ca-assign-picked-title">
                  {c.unitTitle}
                  <small>{c.packTitle} · {c.totalWords} words</small>
                </span>
                <button type="button" className="ca-row-remove" onClick={() => toggle(c)} aria-label={`Remove ${c.unitTitle}`}>
                  <X size={14} />
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="ca-assign-totals">
        <div><b>{chosen.length}</b><span>{chosen.length === 1 ? 'topic' : 'topics'}</span></div>
        <div><b>{chosenWords}</b><span>words</span></div>
        <div><b>{students}</b><span>{students === 1 ? 'student' : 'students'}</span></div>
      </div>

      {isDesktop && (
      <Button block onClick={give} disabled={!chosen.length || saving}>
        {saving ? 'Assigning...' : chosen.length ? `Assign ${chosen.length} ${chosen.length === 1 ? 'topic' : 'topics'}` : 'Assign homework'}
      </Button>
      )}
      {chosen.length > 0 && (
        <button type="button" className="ca-link ca-assign-clear" onClick={() => setPicked([])}>Clear selection</button>
      )}
    </aside>
  );

  return (
    <Page back={back} title="New homework" subtitle={`${group.name} · ${fresh.length} ${fresh.length === 1 ? 'topic' : 'topics'} not assigned yet`}>
      {all.length === 0 ? (
        <section className="ca-card is-faculty-card">
          <div className="ca-panel-empty">
            <EmptyState
              icon={<NotebookPen size={40} />}
              title="No topics to assign"
              text="The group's packs have no topics with words. Attach a pack to the group or add words to one first."
              action={<Button onClick={() => navigate(groupPath)}>Back to group</Button>}
            />
          </div>
        </section>
      ) : (
        <div className={`ca-assign-layout ${isDesktop ? 'has-aside' : ''}`}>
          <div className="ca-assign-main">
            <div className="ca-assign-tools">
              <SearchField value={search} onChange={setSearch} placeholder="Topic or pack" />
              <div className="ca-filter-pills" role="group" aria-label="Topics">
                <button type="button" className={`ca-filter-pill ${filter === 'new' ? 'is-active' : ''}`} onClick={() => setFilter('new')}>
                  Not assigned <span className="ca-filter-count">{fresh.length}</span>
                </button>
                <button type="button" className={`ca-filter-pill ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>
                  All <span className="ca-filter-count">{all.length}</span>
                </button>
              </div>
            </div>

            {visiblePacks.length === 0 && (
              <section className="ca-card is-faculty-card">
                <div className="ca-panel-empty">
                  {q
                    ? <EmptyState title="Nothing found" text="Try a different search." />
                    : <EmptyState title="Every topic has been assigned" text="Add topics to the pack, or switch to All to see past ones." />}
                </div>
              </section>
            )}

            <div className="ca-stack">
              {visiblePacks.map((p) => (
                <section key={p.packId} className="ca-card is-faculty-card">
                  <div className="faculty-toolbar">
                    <div className="faculty-toolbar-left">
                      <span className="ca-course-icon"><BookOpen size={16} /></span>
                      <span className="ca-card-title">{p.title}</span>
                      <span className="ca-list-count">{packFresh(p).length} available</span>
                    </div>
                    {packFresh(p).length > 0 && (
                      <button type="button" className="faculty-btn-secondary" onClick={() => togglePack(p)}>
                        {allPicked(p) ? 'Unselect all' : 'Select all'}
                      </button>
                    )}
                  </div>
                  <div className="ca-assign-head">
                    <span />
                    <span>Topic</span>
                    <span>Words</span>
                    <span>Group so far</span>
                    <span />
                  </div>
                  <div className="ca-assign-list">
                    {p.units.map((c) => {
                      const k = keyOf(c);
                      const on = picked.includes(k);
                      const stat = topicStat[`${c.packId}::${unitKeyOf(c)}`];
                      const open = peek === k;
                      const words = open ? (resolveHomeworkItemUnit(c, packs)?.words || []) : [];
                      return (
                        <div key={k} className={`ca-assign-item ${open ? 'is-open' : ''}`}>
                          <div
                            role="checkbox"
                            aria-checked={on}
                            aria-disabled={c.used}
                            tabIndex={c.used ? -1 : 0}
                            className={`ca-assign-row ${on ? 'is-on' : ''} ${c.used ? 'is-used' : ''}`}
                            onClick={() => toggle(c)}
                            onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(c); } }}
                          >
                            <span className={`sa-check is-select ${on ? 'is-on' : ''} ${c.used ? 'is-used' : ''}`} aria-hidden="true">
                              {(on || c.used) && <Check size={14} strokeWidth={3} />}
                            </span>
                            <span className="ca-assign-title">
                              {c.unitTitle}
                              {c.used && <span className="ca-pill is-gray">Assigned before</span>}
                            </span>
                            <span className="ca-assign-words">{c.totalWords}</span>
                            <span className="ca-assign-stat">
                              {stat?.avg != null ? (
                                <span className="ca-dash-mastery">
                                  <span className="ca-dash-bar is-inline"><span className={masteryTone(stat.avg) || 'is-low'} style={{ width: `${stat.avg}%` }} /></span>
                                  <span className="ca-dash-mastery-val">{stat.avg}%</span>
                                  <span className="ca-assign-started">{stat.started}/{stat.total}</span>
                                </span>
                              ) : <span className="ca-muted">Not started</span>}
                            </span>
                            <button
                              type="button"
                              className="ca-row-action ca-assign-peek"
                              onClick={(e) => { e.stopPropagation(); setPeek(open ? null : k); }}
                              aria-expanded={open}
                              aria-label={`Show the words of ${c.unitTitle}`}
                              title="Show words"
                            >
                              <ChevronDown size={15} />
                            </button>
                          </div>
                          {open && (
                            <div className="ca-assign-words-peek">
                              {words.length === 0
                                ? <span className="ca-muted">No words found</span>
                                : words.map((w, i) => (
                                  <span key={w.id || i} className="ca-assign-word"><b>{w.word}</b> {w.translation}</span>
                                ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {summary}
        </div>
      )}

      {!isDesktop && all.length > 0 && (
        <div className="sa-bottom-bar">
          <span className="sa-bottom-bar-text">
            {chosen.length ? `${chosen.length} ${chosen.length === 1 ? 'topic' : 'topics'} · ${chosenWords} words` : 'Pick topics'}
          </span>
          <Button onClick={give} disabled={!chosen.length || saving}>{saving ? 'Assigning...' : 'Assign'}</Button>
        </div>
      )}

      {toastNode}
    </Page>
  );
}

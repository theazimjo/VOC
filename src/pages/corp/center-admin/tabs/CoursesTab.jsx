import {
  ArrowUpRight, Book, BookOpen, ChevronDown, Edit3, FileText, Filter,
  GraduationCap, Layers, Plus, Search, Sparkles, Trash2, Users,
} from 'lucide-react';
import CustomPackEditor from '../../../../components/corp/CustomPackEditor';
import CourseManager from '../../../../components/corp/CourseManager';
import CorpModal from '../../../../components/corp/CorpModal';
import './CoursesTab.css';

export default function CoursesTab({ p }) {
  const {
    askConfirm, centerId, courseSearchTerm, courseSortBy, courseSortOrder, customPacks,
    editingPack, filteredCourses, handleDeleteCourse, handleSeedBeginnerCourse,
    managingCourse, seedingCourse, setCourseSearchTerm, setCourseSortBy, setCourseSortOrder,
    setCustomPacks, setEditingPack, setSearchParams, setShowCourseSortMenu, setShowPackEditor,
    showCourseSortMenu, showPackEditor, totalCourseStudents, totalCourses, totalSections, totalWords,
  } = p;

  const confirmDeleteCourse = (course) => askConfirm({
    title: 'Kursni o\'chirish',
    message: `"${course.title}" kursini o'chirishni tasdiqlaysizmi?`,
    confirmLabel: "O'chirish",
    cancelLabel: 'Bekor qilish',
    danger: true,
    onConfirm: () => handleDeleteCourse(course.id),
  });

  return (
        managingCourse ? (
          <CourseManager
            centerId={centerId}
            course={managingCourse}
            onBack={() => setSearchParams({})}
            onUpdate={(updated) => {
              setCustomPacks(prev => prev.map(p => p.id === updated.id ? updated : p));
            }}
          />
        ) : (
        <div className="courses-page-container">
          {/* Top Bar */}
          <div className="courses-top-bar">
            <div className="courses-title-area">
              <h1>Kurslar</h1>
              <p>{totalCourses} ta kurs · {totalSections} ta bo'lim · {totalWords} ta so'z</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={handleSeedBeginnerCourse}
                disabled={seedingCourse}
                title="Tayyor Beginner (A1) kursini bir tugma bilan to'liq yuklash — 3 oy, 15 mavzu, 332 so'z"
              >
                <Sparkles size={16} /> {seedingCourse ? 'Yuklanmoqda...' : 'Tayyor Beginner Kurs'}
              </button>
            </div>
          </div>

          {/* 4 Summary Metrics Cards */}
          <div className="courses-metrics-grid">
            <div className="c-metric-card">
              <div className="c-metric-icon blue"><BookOpen size={20} /></div>
              <div className="c-metric-val">{totalCourses}</div>
              <div className="c-metric-label">Jami Kurslar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon purple"><Layers size={20} /></div>
              <div className="c-metric-val">{totalSections}</div>
              <div className="c-metric-label">Jami Bo'limlar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon green"><FileText size={20} /></div>
              <div className="c-metric-val">{totalWords}</div>
              <div className="c-metric-label">Jami So'zlar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon orange"><Users size={20} /></div>
              <div className="c-metric-val">{totalCourseStudents}</div>
              <div className="c-metric-label">O'quvchilar</div>
            </div>
          </div>

          {/* Toolbar (Search + Sort) */}
          <div className="courses-toolbar">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Kurs qidirish..."
                value={courseSearchTerm}
                onChange={e => setCourseSearchTerm(e.target.value)}
              />
            </div>

            <div className="sort-dropdown-wrap">
              <button
                className="btn-filter-dropdown"
                onClick={() => setShowCourseSortMenu(v => !v)}
              >
                <Filter size={16} /> Saralash <ChevronDown size={14} />
              </button>

              {showCourseSortMenu && (
                <div className="sort-dropdown-menu">
                  <div className="sort-dropdown-label">Saralash</div>
                  {[
                    { value: 'date', label: "Sana bo'yicha" },
                    { value: 'name', label: "Nom bo'yicha" },
                    { value: 'units', label: "Bo'limlar soni" },
                    { value: 'words', label: "So'zlar soni" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCourseSortOrder(courseSortBy === opt.value && courseSortOrder === 'desc' ? 'asc' : 'desc');
                        setCourseSortBy(opt.value);
                        setShowCourseSortMenu(false);
                      }}
                      className={`sort-dropdown-item ${courseSortBy === opt.value ? 'active' : ''}`}
                    >
                      {opt.label} {courseSortBy === opt.value && (courseSortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-card-top">
                  <div className="course-badge-icon">
                    <Book size={20} />
                  </div>
                  <div className="course-card-actions">
                    <button
                      onClick={() => {
                        const original = customPacks.find(p => p.id === c.id) || c;
                        setEditingPack(original);
                        setShowPackEditor(true);
                      }}
                      className="btn-card-action"
                      title="Tahrirlash"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => confirmDeleteCourse(c)}
                      className="btn-card-action"
                      style={{ color: '#f87171' }}
                      title="O'chirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="course-card-content">
                  <h3>{c.title}</h3>
                  <p>{c.description || "Tavsif yo'q"}</p>
                </div>

                <div className="course-card-meta">
                  <div className="course-meta-row">
                    <div className="course-meta-item">
                      <Layers size={14} />
                      <span>{c.sectionsCount} bo'lim</span>
                    </div>
                    <div className="course-meta-item">
                      <FileText size={14} />
                      <span>{c.wordsCount} so'z</span>
                    </div>
                  </div>
                  <div className="course-meta-row" style={{ marginTop: '4px' }}>
                    <div className="course-meta-item">
                      <Users size={14} />
                      <span>{c.groupsCount} guruh</span>
                    </div>
                    <div className="course-meta-item">
                      <GraduationCap size={14} />
                      <span>{c.studentsCount} o'quvchi</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSearchParams({ courseId: c.id })}
                  className="btn-manage-course outline"
                >
                  Boshqarish <ArrowUpRight size={16} />
                </button>
              </div>
            ))}

            {/* Add-new card */}
            <button
              onClick={() => { setEditingPack(null); setShowPackEditor(true); }}
              className="course-card-add-new"
            >
              <div className="add-new-icon-wrap">
                <Plus size={24} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Yangi Kurs</span>
            </button>
          </div>

          {filteredCourses.length === 0 && (
            <div className="empty-state" style={{ background: 'var(--pg-surface)', border: '1px dashed var(--pg-hairline)', borderRadius: '16px', padding: '3rem 1rem' }}>
              <div className="add-new-icon-wrap" style={{ width: '56px', height: '56px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Search className="text-gray-500" size={24} />
              </div>
              <p style={{ color: 'var(--pg-text)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>
                {courseSearchTerm ? `"${courseSearchTerm}" bo'yicha kurs topilmadi` : "Hozircha kurslar yo'q"}
              </p>
              <p style={{ color: 'var(--pg-text-secondary)', fontSize: '0.85rem', margin: 0 }}>Yangi kurs yaratish uchun tugmani bosing</p>
            </div>
          )}

          {/* Floating Action Button (New Course) — same always-visible FAB
              pattern as the teacher module's Courses tab, replacing the
              old inline "Yangi Kurs" button. */}
          <button
            type="button"
            className="fab-add-pack-btn fab-icon-only"
            onClick={() => { setEditingPack(null); setShowPackEditor(true); }}
            title="Yangi Kurs"
          >
            <Plus size={26} />
          </button>

          {/* Create/Edit modal */}
          <CorpModal open={showPackEditor} onClose={() => { setShowPackEditor(false); setEditingPack(null); }} className="pack-editor-modal" maxWidth="480px">
            <CustomPackEditor
              centerId={centerId}
              editPack={editingPack}
              onSaved={(pack) => {
                setCustomPacks(prev => {
                  const exists = prev.some(p => p.id === pack.id);
                  if (exists) {
                    return prev.map(p => p.id === pack.id ? { ...p, ...pack } : p);
                  }
                  return [pack, ...prev];
                });
                setShowPackEditor(false);
                setEditingPack(null);
              }}
              onCancel={() => { setShowPackEditor(false); setEditingPack(null); }}
            />
          </CorpModal>
        </div>
        )
  );
}

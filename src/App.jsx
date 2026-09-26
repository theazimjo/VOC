import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PacksProvider } from './contexts/PacksContext';
import { GroupModeProvider } from './contexts/GroupModeContext';
import { SuccessTransitionProvider } from './contexts/SuccessTransitionContext';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProfileChooser from './components/Auth/ProfileChooser';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import FullScreenLoader from './components/common/FullScreenLoader';
import ErrorBoundary from './components/common/ErrorBoundary';
import { installGlobalErrorLogging } from './utils/errorLogger';
import { lazyWithRetry } from './utils/lazyWithRetry';

const Dashboard = lazyWithRetry(() => import('./pages/personal/Dashboard'));
const PackDetail = lazyWithRetry(() => import('./pages/personal/PackDetail'));
const ReadPage = lazyWithRetry(() => import('./pages/personal/ReadPage'));
const CourseLayout = lazyWithRetry(() => import('./pages/personal/course/CourseLayout'));
const CourseDashboard = lazyWithRetry(() => import('./pages/personal/course/CourseDashboard'));
const CourseLesson = lazyWithRetry(() => import('./pages/personal/course/CourseLesson'));
const CourseVocabulary = lazyWithRetry(() => import('./pages/personal/course/CourseVocabulary'));
const WordFormPage = lazyWithRetry(() => import('./pages/personal/WordFormPage'));
const BulkImportPage = lazyWithRetry(() => import('./pages/personal/BulkImportPage'));
const PracticePage = lazyWithRetry(() => import('./pages/personal/PracticePage'));
const StatsPage = lazyWithRetry(() => import('./pages/personal/StatsPage'));
const ProfilePage = lazyWithRetry(() => import('./pages/personal/ProfilePage'));
const LibraryPage = lazyWithRetry(() => import('./pages/personal/LibraryPage'));
const MixedPractice = lazyWithRetry(() => import('./pages/personal/MixedPractice'));
const Settings = lazyWithRetry(() => import('./pages/personal/Settings'));
const GrammarPage = lazyWithRetry(() => import('./pages/grammar/GrammarPage'));
const GrammarTopic = lazyWithRetry(() => import('./pages/grammar/GrammarTopic'));
const GrammarExercises = lazyWithRetry(() => import('./pages/grammar/GrammarExercises'));
const GrammarGuide = lazyWithRetry(() => import('./pages/grammar/GrammarGuide'));
const GrammarTest = lazyWithRetry(() => import('./pages/grammar/GrammarTest'));
const GeneralGrammarTest = lazyWithRetry(() => import('./pages/grammar/GeneralGrammarTest'));
const GrammarPath = lazyWithRetry(() => import('./pages/grammar/GrammarPath'));
const GrammarPathLesson = lazyWithRetry(() => import('./pages/grammar/GrammarPathLesson'));
const GrammarPathPractice = lazyWithRetry(() => import('./pages/grammar/GrammarPathPractice'));
const GrammarPathReview = lazyWithRetry(() => import('./pages/grammar/GrammarPathReview'));
const MemoryLab = lazyWithRetry(() => import('./experiment/pages/MemoryLab'));
const AdminDashboard = lazyWithRetry(() => import('./pages/admin/AdminDashboard'));

// Corporate / Learning Center Portal Routes (fully independent of the
// individual-learner auth/route tree above — see CorpProtectedRoute)
const CorpLayout = lazyWithRetry(() => import('./components/corp/CorpLayout'));
const CorpAdminLayout = lazyWithRetry(() => import('./components/corp/CorpAdminLayout'));
const TeacherLayout = lazyWithRetry(() => import('./components/corp/TeacherLayout'));
const StudentLayout = lazyWithRetry(() => import('./components/corp/StudentLayout'));
const CorpPortalHome = lazyWithRetry(() => import('./pages/corp/CorpPortalHome'));
const JoinGroupPage = lazyWithRetry(() => import('./pages/corp/JoinGroupPage'));
const CorpProtectedRoute = lazyWithRetry(() => import('./components/corp/CorpProtectedRoute'));
const SuperAdminLayout = lazyWithRetry(() => import('./components/corp/SuperAdminLayout'));
const SuperAdminOverview = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminOverview'));
const SuperAdminCenters = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminCenters'));
const SuperAdminCenterDetail = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminCenterDetail'));
const SuperAdminGroupDetail = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminGroupDetail'));
const SuperAdminUsers = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminUsers'));
const SuperAdminUserDetail = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminUserDetail'));
const SuperAdminAnnouncements = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminAnnouncements'));
const SuperAdminSettings = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminSettings'));
// Dev-only role switcher (/dev/roles). `import.meta.env.DEV` is false in
// production builds, so the page and its import are dropped entirely.
const RoleSwitcher = import.meta.env.DEV ? lazyWithRetry(() => import('./pages/dev/RoleSwitcher')) : null;
const DevRolesPill = import.meta.env.DEV ? lazyWithRetry(() => import('./pages/dev/DevRolesPill')) : null;
const AdminHome = lazyWithRetry(() => import('./pages/corp/center-admin/AdminHome'));
const AdminTeachers = lazyWithRetry(() => import('./pages/corp/center-admin/AdminTeachers'));
const AdminTeacherDetail = lazyWithRetry(() => import('./pages/corp/center-admin/AdminTeacherDetail'));
const AdminGroups = lazyWithRetry(() => import('./pages/corp/center-admin/AdminGroups'));
const AdminGroupDetail = lazyWithRetry(() => import('./pages/corp/center-admin/AdminGroupDetail'));
const AdminStudents = lazyWithRetry(() => import('./pages/corp/center-admin/AdminStudents'));
const AdminCourses = lazyWithRetry(() => import('./pages/corp/center-admin/AdminCourses'));
const AdminSettings = lazyWithRetry(() => import('./pages/corp/center-admin/AdminSettings'));
const TeacherGroups = lazyWithRetry(() => import('./pages/corp/teacher/TeacherGroups'));
const TeacherGroup = lazyWithRetry(() => import('./pages/corp/teacher/TeacherGroup'));
const TeacherAssignHomework = lazyWithRetry(() => import('./pages/corp/teacher/TeacherAssignHomework'));
const TeacherHomework = lazyWithRetry(() => import('./pages/corp/teacher/TeacherHomework'));
const TeacherArchive = lazyWithRetry(() => import('./pages/corp/teacher/TeacherArchive'));
const TeacherPacks = lazyWithRetry(() => import('./pages/corp/teacher/TeacherPacks'));
const TeacherSettings = lazyWithRetry(() => import('./pages/corp/teacher/TeacherSettings'));
const StudentCorpOverview = lazyWithRetry(() => import('./pages/corp/student/StudentCorpOverview'));
const StudentCorpLearn = lazyWithRetry(() => import('./pages/corp/student/learn/StudentCorpLearn'));
const StudentCorpProfile = lazyWithRetry(() => import('./pages/corp/student/StudentCorpProfile'));
const CorpPractice = lazyWithRetry(() => import('./pages/corp/student/practice/CorpPractice'));

function BookToPackRedirect() {
  const { bookId } = useParams();
  return <Navigate to={`/packs/${bookId}`} replace />;
}

function RouteLoader() {
  return <FullScreenLoader />;
}

export default function App() {
  useEffect(() => {
    installGlobalErrorLogging();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
            <GroupModeProvider>
              <PacksProvider>
                {/* Deliberately OUTSIDE Suspense: if it were inside, the
                    Routes' own lazy-chunk fallback would swap out this
                    overlay too the instant a route suspends, defeating the
                    whole point of covering that flash. */}
                <SuccessTransitionProvider>
                <Suspense fallback={<RouteLoader />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/choose-profile" element={<ProfileChooser />} />
                    {RoleSwitcher && <Route path="/dev/roles" element={<RoleSwitcher />} />}
  
                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                      {/* Full-screen reading mode - deliberately OUTSIDE Layout so
                          the sidebar/topbar chrome doesn't eat into the page,
                          matching an actual book/e-reader view. */}
                      <Route path="/packs/:packId/read" element={<ReadPage />} />
                      <Route path="/course/:packId" element={<CourseLayout />}>
                        <Route index element={<CourseDashboard />} />
                        <Route path="lesson" element={<CourseLesson />} />
                        <Route path="vocabulary" element={<CourseVocabulary />} />
                        <Route path="practice" element={<PracticePage />} />
                      </Route>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/books" element={<Navigate to="/library" replace />} />
                        <Route path="/books/:bookId" element={<BookToPackRedirect />} />
                        <Route path="/packs" element={<Navigate to="/library" replace />} />
                        <Route path="/packs/:packId" element={<PackDetail />} />
                        <Route path="/packs/:packId/word/new" element={<WordFormPage />} />
                        <Route path="/packs/:packId/word/edit/:wordId" element={<WordFormPage />} />
                        <Route path="/packs/:packId/import-json" element={<BulkImportPage />} />
                        <Route path="/practice" element={<PracticePage />} />
                        <Route path="/practice/:sourceType/:sourceId" element={<PracticePage />} />
                        <Route path="/mixed-practice" element={<MixedPractice />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/grammar" element={<GrammarPage />} />
                        <Route path="/grammar/general-test" element={<GeneralGrammarTest />} />
                        <Route path="/grammar/path" element={<GrammarPath />} />
                        <Route path="/grammar/path/lesson/:lessonId" element={<GrammarPathLesson />} />
                        <Route path="/grammar/path/practice/:lessonId" element={<GrammarPathPractice />} />
                        <Route path="/grammar/path/review/:sectionId" element={<GrammarPathReview />} />
                        <Route path="/grammar/:level/:topicId" element={<GrammarExercises />} />
                        <Route path="/grammar/:level/:topicId/guide" element={<GrammarGuide />} />
                        <Route path="/grammar/:level/:topicId/:exerciseId" element={<GrammarTopic />} />
                        <Route path="/grammar-test" element={<GrammarTest />} />
                        <Route path="/grammar-test/run/:testId" element={<GrammarTest />} />
                        <Route path="/experiment" element={<MemoryLab />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                      </Route>
                    </Route>
  
                    {/* Standalone Corporate Learning Center Portal — deliberately
                        OUTSIDE the individual-learner ProtectedRoute above.
                        Everyone signs in at /login; students join a group
                        with their personal account (PIN, or the /join/:code
                        invite link / QR code a teacher shares). */}
                    <Route path="/corp/login" element={<Navigate to="/login" replace />} />
                    <Route path="/corp/teacher/join" element={<Navigate to="/login" replace />} />
                    <Route path="/join/:code" element={<JoinGroupPage />} />
                    <Route path="/corp" element={<CorpLayout />}>
                      <Route index element={<CorpPortalHome />} />
                      <Route element={<CorpProtectedRoute allowedRoles={['super_admin']} />}>
                        <Route element={<SuperAdminLayout />}>
                          <Route path="super-admin" element={<SuperAdminOverview />} />
                          <Route path="super-admin/centers" element={<SuperAdminCenters />} />
                          <Route path="super-admin/centers/:centerId" element={<SuperAdminCenterDetail />} />
                          <Route path="super-admin/centers/:centerId/groups/:groupId" element={<SuperAdminGroupDetail />} />
                          <Route path="super-admin/users" element={<SuperAdminUsers />} />
                          <Route path="super-admin/users/:uid" element={<SuperAdminUserDetail />} />
                          <Route path="super-admin/announcements" element={<SuperAdminAnnouncements />} />
                          <Route path="super-admin/settings" element={<SuperAdminSettings />} />
                        </Route>
                      </Route>
                      <Route element={<CorpProtectedRoute allowedRoles={['center_admin']} />}>
                        <Route element={<CorpAdminLayout />}>
                          <Route path="admin" element={<AdminHome />} />
                          <Route path="admin/teachers" element={<AdminTeachers />} />
                          <Route path="admin/teachers/:teacherId" element={<AdminTeacherDetail />} />
                          <Route path="admin/groups" element={<AdminGroups />} />
                          <Route path="admin/groups/:groupId" element={<AdminGroupDetail />} />
                          <Route path="admin/students" element={<AdminStudents />} />
                          <Route path="admin/courses" element={<AdminCourses />} />
                          <Route path="admin/statistics" element={<Navigate to="/corp/admin" replace />} />
                          <Route path="admin/settings" element={<AdminSettings />} />
                        </Route>
                      </Route>
                      <Route element={<CorpProtectedRoute allowedRoles={['teacher']} />}>
                        <Route element={<TeacherLayout />}>
                          <Route path="teacher" element={<TeacherGroups />} />
                          <Route path="teacher/group/:groupId" element={<TeacherGroup />} />
                          <Route path="teacher/group/:groupId/assign" element={<TeacherAssignHomework />} />
                          <Route path="teacher/group/:groupId/homework/:hwId" element={<TeacherHomework />} />
                          {/* Old per-group sub-tabs (students/words/stats/...) are all on the group page now. */}
                          <Route path="teacher/group/:groupId/:subTab" element={<TeacherGroup />} />
                          <Route path="teacher/archive" element={<TeacherArchive />} />
                          <Route path="teacher/courses" element={<TeacherPacks />} />
                          <Route path="teacher/statistics" element={<Navigate to="/corp/teacher" replace />} />
                          <Route path="teacher/settings" element={<TeacherSettings />} />
                        </Route>
                      </Route>
                      <Route element={<StudentLayout />}>
                        <Route path="student" element={<StudentCorpOverview />} />
                        <Route path="student/learn" element={<StudentCorpLearn />} />
                        <Route path="student/learn/month/:packId/:monthId" element={<StudentCorpLearn />} />
                        <Route path="student/learn/topic/:packId/:monthId/:unitId" element={<StudentCorpLearn />} />
                        <Route path="practice/:packId/:monthId/:unitId" element={<CorpPractice />} />
                        <Route path="student/profile" element={<StudentCorpProfile />} />
                      </Route>
                    </Route>

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                  {DevRolesPill && <DevRolesPill />}
                </Suspense>
                </SuccessTransitionProvider>
              </PacksProvider>
            </GroupModeProvider>
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
const WordFormPage = lazyWithRetry(() => import('./pages/personal/WordFormPage'));
const IeltsWordFormPage = lazyWithRetry(() => import('./pages/personal/IeltsWordFormPage'));
const EnglishWordFormPage = lazyWithRetry(() => import('./pages/personal/EnglishWordFormPage'));
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
const MemoryLab = lazyWithRetry(() => import('./experiment/pages/MemoryLab'));
const AdminDashboard = lazyWithRetry(() => import('./pages/admin/AdminDashboard'));

// Corporate / Learning Center Portal Routes (fully independent of the
// individual-learner auth/route tree above — see CorpProtectedRoute)
const CorpLayout = lazyWithRetry(() => import('./components/corp/CorpLayout'));
const CorpAdminLayout = lazyWithRetry(() => import('./components/corp/CorpAdminLayout'));
const TeacherLayout = lazyWithRetry(() => import('./components/corp/TeacherLayout'));
const StudentLayout = lazyWithRetry(() => import('./components/corp/StudentLayout'));
const CorpPortalHome = lazyWithRetry(() => import('./pages/corp/CorpPortalHome'));
const CorpProtectedRoute = lazyWithRetry(() => import('./components/corp/CorpProtectedRoute'));
const SuperAdminLayout = lazyWithRetry(() => import('./components/corp/SuperAdminLayout'));
const SuperAdminOverview = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminOverview'));
const SuperAdminCenters = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminCenters'));
const SuperAdminUsers = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminUsers'));
const SuperAdminAnnouncements = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminAnnouncements'));
const SuperAdminSettings = lazyWithRetry(() => import('./pages/corp/super-admin/SuperAdminSettings'));
const CenterAdminDashboard = lazyWithRetry(() => import('./pages/corp/center-admin/CenterAdminDashboard'));
const TeacherDashboard = lazyWithRetry(() => import('./pages/corp/teacher/TeacherDashboard'));
const StudentCorpOverview = lazyWithRetry(() => import('./pages/corp/student/StudentCorpOverview'));
const StudentCorpLearn = lazyWithRetry(() => import('./pages/corp/student/learn/StudentCorpLearn'));
const StudentCorpAssessment = lazyWithRetry(() => import('./pages/corp/student/StudentCorpAssessment'));
const StudentCorpProfile = lazyWithRetry(() => import('./pages/corp/student/StudentCorpProfile'));
const CorpPractice = lazyWithRetry(() => import('./pages/corp/student/practice/CorpPractice'));

// Independent (centerless) teacher dashboard — reuses CorpProtectedRoute
// (it only checks identity.role, not centerId) but lives outside /corp
// since it isn't part of the multi-tenant learning-center portal.
const IndependentTeacherLayout = lazyWithRetry(() => import('./pages/teacher/IndependentTeacherLayout'));
const IndependentTeacherDashboard = lazyWithRetry(() => import('./pages/teacher/IndependentTeacherDashboard'));

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
  
                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/books" element={<Navigate to="/library" replace />} />
                        <Route path="/books/:bookId" element={<BookToPackRedirect />} />
                        <Route path="/packs" element={<Navigate to="/library" replace />} />
                        <Route path="/packs/:packId" element={<PackDetail />} />
                        <Route path="/packs/:packId/word/new" element={<WordFormPage />} />
                        <Route path="/packs/:packId/word/edit/:wordId" element={<WordFormPage />} />
                        <Route path="/packs/:packId/word/ielts/new" element={<IeltsWordFormPage />} />
                        <Route path="/packs/:packId/word/ielts/edit/:wordId" element={<IeltsWordFormPage />} />
                        <Route path="/packs/:packId/word/english/new" element={<EnglishWordFormPage />} />
                        <Route path="/packs/:packId/word/english/edit/:wordId" element={<EnglishWordFormPage />} />
                        <Route path="/packs/:packId/import-json" element={<BulkImportPage />} />
                        <Route path="/practice" element={<PracticePage />} />
                        <Route path="/practice/:sourceType/:sourceId" element={<PracticePage />} />
                        <Route path="/mixed-practice" element={<MixedPractice />} />
                        <Route path="/stats" element={<StatsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/grammar" element={<GrammarPage />} />
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
                        Center admins/teachers authenticate via /corp/login;
                        students never need an individual account at all. */}
                    <Route path="/corp/login" element={<Navigate to="/login" replace />} />
                    <Route path="/corp/teacher/join" element={<Navigate to="/login" replace />} />
                    <Route path="/corp" element={<CorpLayout />}>
                      <Route index element={<CorpPortalHome />} />
                      <Route element={<CorpProtectedRoute allowedRoles={['super_admin']} />}>
                        <Route element={<SuperAdminLayout />}>
                          <Route path="super-admin" element={<SuperAdminOverview />} />
                          <Route path="super-admin/centers" element={<SuperAdminCenters />} />
                          <Route path="super-admin/users" element={<SuperAdminUsers />} />
                          <Route path="super-admin/announcements" element={<SuperAdminAnnouncements />} />
                          <Route path="super-admin/settings" element={<SuperAdminSettings />} />
                        </Route>
                      </Route>
                      <Route element={<CorpProtectedRoute allowedRoles={['center_admin']} />}>
                        <Route element={<CorpAdminLayout />}>
                          <Route path="admin" element={<CenterAdminDashboard tab="dashboard" />} />
                          <Route path="admin/teachers" element={<CenterAdminDashboard tab="teachers" />} />
                          <Route path="admin/students" element={<CenterAdminDashboard tab="students" />} />
                          <Route path="admin/courses" element={<CenterAdminDashboard tab="courses" />} />
                          <Route path="admin/statistics" element={<CenterAdminDashboard tab="statistics" />} />
                          <Route path="admin/settings" element={<CenterAdminDashboard tab="settings" />} />
                        </Route>
                      </Route>
                      <Route element={<CorpProtectedRoute allowedRoles={['teacher']} />}>
                        <Route element={<TeacherLayout />}>
                          <Route path="teacher" element={<TeacherDashboard tab="groups" />} />
                          <Route path="teacher/group/:groupId" element={<TeacherDashboard tab="groups" />} />
                          <Route path="teacher/group/:groupId/homework/:hwId" element={<TeacherDashboard tab="groups" />} />
                          <Route path="teacher/group/:groupId/:subTab" element={<TeacherDashboard tab="groups" />} />
                          <Route path="teacher/archive" element={<TeacherDashboard tab="archive" />} />
                          <Route path="teacher/courses" element={<TeacherDashboard tab="courses" />} />
                          <Route path="teacher/statistics" element={<TeacherDashboard tab="statistics" />} />
                          <Route path="teacher/settings" element={<TeacherDashboard tab="settings" />} />
                        </Route>
                      </Route>
                      <Route element={<StudentLayout />}>
                        <Route path="student" element={<StudentCorpOverview />} />
                        <Route path="student/learn" element={<StudentCorpLearn />} />
                        <Route path="student/learn/month/:packId/:monthId" element={<StudentCorpLearn />} />
                        <Route path="student/learn/topic/:packId/:monthId/:unitId" element={<StudentCorpLearn />} />
                        <Route path="practice/:packId/:monthId/:unitId" element={<CorpPractice />} />
                        <Route path="student/assessment" element={<StudentCorpAssessment />} />
                        <Route path="student/profile" element={<StudentCorpProfile />} />
                      </Route>
                    </Route>

                    {/* Independent (centerless) teacher dashboard — a personal
                        account that became a teacher without joining any
                        learning center. Deliberately outside /corp; still
                        gated by the same CorpProtectedRoute since it only
                        checks identity.role. */}
                    <Route element={<CorpProtectedRoute allowedRoles={['teacher']} />}>
                      <Route path="/teacher" element={<IndependentTeacherLayout />}>
                        <Route index element={<IndependentTeacherDashboard tab="groups" />} />
                        <Route path="group/:groupId" element={<IndependentTeacherDashboard tab="groups" />} />
                        <Route path="group/:groupId/homework/:hwId" element={<IndependentTeacherDashboard tab="groups" />} />
                        <Route path="group/:groupId/:subTab" element={<IndependentTeacherDashboard tab="groups" />} />
                        <Route path="archive" element={<IndependentTeacherDashboard tab="archive" />} />
                        <Route path="courses" element={<IndependentTeacherDashboard tab="courses" />} />
                        <Route path="statistics" element={<IndependentTeacherDashboard tab="statistics" />} />
                        <Route path="settings" element={<IndependentTeacherDashboard tab="settings" />} />
                      </Route>
                    </Route>

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
                </SuccessTransitionProvider>
              </PacksProvider>
            </GroupModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

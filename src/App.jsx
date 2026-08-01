import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PacksProvider } from './contexts/PacksContext';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import IosSpinner from './components/common/IosSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { installGlobalErrorLogging } from './utils/errorLogger';
import { lazyWithRetry } from './utils/lazyWithRetry';

const Dashboard = lazyWithRetry(() => import('./pages/Dashboard'));
const LandingPage = lazyWithRetry(() => import('./pages/LandingPage'));
const PackDetail = lazyWithRetry(() => import('./pages/PackDetail'));
const PracticePage = lazyWithRetry(() => import('./pages/PracticePage'));
const StatsPage = lazyWithRetry(() => import('./pages/StatsPage'));
const ProfilePage = lazyWithRetry(() => import('./pages/ProfilePage'));
const LibraryPage = lazyWithRetry(() => import('./pages/LibraryPage'));
const MixedPractice = lazyWithRetry(() => import('./pages/MixedPractice'));
const Settings = lazyWithRetry(() => import('./pages/Settings'));
const GrammarPage = lazyWithRetry(() => import('./pages/GrammarPage'));
const GrammarTopic = lazyWithRetry(() => import('./pages/GrammarTopic'));
const GrammarExercises = lazyWithRetry(() => import('./pages/GrammarExercises'));
const GrammarTest = lazyWithRetry(() => import('./pages/GrammarTest'));
const MemoryLab = lazyWithRetry(() => import('./experiment/pages/MemoryLab'));
const AdminDashboard = lazyWithRetry(() => import('./pages/AdminDashboard'));

// Corporate / Learning Center Portal Routes (fully independent of the
// individual-learner auth/route tree above — see CorpProtectedRoute)
const CorpLayout = lazyWithRetry(() => import('./components/corp/CorpLayout'));
const CorpAdminLayout = lazyWithRetry(() => import('./components/corp/CorpAdminLayout'));
const TeacherLayout = lazyWithRetry(() => import('./components/corp/TeacherLayout'));
const StudentLayout = lazyWithRetry(() => import('./components/corp/StudentLayout'));
const CorpPortalHome = lazyWithRetry(() => import('./pages/corp/CorpPortalHome'));
const CorpProtectedRoute = lazyWithRetry(() => import('./components/corp/CorpProtectedRoute'));
const SuperAdminLayout = lazyWithRetry(() => import('./components/corp/SuperAdminLayout'));
const SuperAdminOverview = lazyWithRetry(() => import('./pages/corp/SuperAdminOverview'));
const SuperAdminCenters = lazyWithRetry(() => import('./pages/corp/SuperAdminCenters'));
const SuperAdminUsers = lazyWithRetry(() => import('./pages/corp/SuperAdminUsers'));
const SuperAdminAnnouncements = lazyWithRetry(() => import('./pages/corp/SuperAdminAnnouncements'));
const SuperAdminSettings = lazyWithRetry(() => import('./pages/corp/SuperAdminSettings'));
const CenterAdminDashboard = lazyWithRetry(() => import('./pages/corp/CenterAdminDashboard'));
const TeacherDashboard = lazyWithRetry(() => import('./pages/corp/TeacherDashboard'));
const StudentCorpDashboard = lazyWithRetry(() => import('./pages/corp/StudentCorpDashboard'));
const StudentCorpPractice = lazyWithRetry(() => import('./pages/corp/StudentCorpPractice'));
const StudentCorpProfile = lazyWithRetry(() => import('./pages/corp/StudentCorpProfile'));
const StudentCorpSettings = lazyWithRetry(() => import('./pages/corp/StudentCorpSettings'));
const CorpPractice = lazyWithRetry(() => import('./pages/corp/CorpPractice'));

function BookToPackRedirect() {
  const { bookId } = useParams();
  return <Navigate to={`/packs/${bookId}`} replace />;
}

function RouteLoader() {
  return (
    <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-2xl)' }}>
      <IosSpinner />
      <span>Yuklanmoqda...</span>
    </div>
  );
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
            <PacksProvider>
              <Suspense fallback={<RouteLoader />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/landing" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/library" element={<LibraryPage />} />
                      <Route path="/books" element={<Navigate to="/library" replace />} />
                      <Route path="/books/:bookId" element={<BookToPackRedirect />} />
                      <Route path="/packs" element={<Navigate to="/library" replace />} />
                      <Route path="/packs/:packId" element={<PackDetail />} />
                      <Route path="/practice" element={<PracticePage />} />
                      <Route path="/practice/:sourceType/:sourceId" element={<PracticePage />} />
                      <Route path="/mixed-practice" element={<MixedPractice />} />
                      <Route path="/stats" element={<StatsPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/grammar" element={<GrammarPage />} />
                      <Route path="/grammar/:level/:topicId" element={<GrammarExercises />} />
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
                        <Route path="teacher/group/:groupId/:subTab" element={<TeacherDashboard tab="groups" />} />
                        <Route path="teacher/archive" element={<TeacherDashboard tab="archive" />} />
                        <Route path="teacher/courses" element={<TeacherDashboard tab="courses" />} />
                        <Route path="teacher/statistics" element={<TeacherDashboard tab="statistics" />} />
                        <Route path="teacher/settings" element={<TeacherDashboard tab="settings" />} />
                      </Route>
                    </Route>
                    <Route element={<StudentLayout />}>
                      <Route path="student" element={<StudentCorpDashboard />} />
                      <Route path="student/practice" element={<StudentCorpPractice />} />
                      <Route path="student/profile" element={<StudentCorpProfile />} />
                      <Route path="student/settings" element={<StudentCorpSettings />} />
                    </Route>
                    <Route path="practice" element={<CorpPractice />} />
                  </Route>

                  {/* Catch all */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </PacksProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

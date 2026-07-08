import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PacksProvider } from './contexts/PacksContext';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const PackDetail = lazy(() => import('./pages/PackDetail'));
const PracticePage = lazy(() => import('./pages/PracticePage'));
const StatsPage = lazy(() => import('./pages/StatsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const MixedPractice = lazy(() => import('./pages/MixedPractice'));
const CardsMode = lazy(() => import('./pages/CardsMode'));
const Settings = lazy(() => import('./pages/Settings'));
const GrammarPage = lazy(() => import('./pages/GrammarPage'));
const GrammarTopic = lazy(() => import('./pages/GrammarTopic'));
const GrammarExercises = lazy(() => import('./pages/GrammarExercises'));
const GrammarTest = lazy(() => import('./pages/GrammarTest'));

function RouteLoader() {
  return (
    <div className="ios-activity-indicator" style={{ marginTop: 'var(--space-2xl)' }}>
      <div className="ios-spinner-ring"></div>
      <span>Yuklanmoqda...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <PacksProvider>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/library" element={<LibraryPage />} />
                    <Route path="/books" element={<Navigate to="/library" replace />} />
                    <Route path="/books/:bookId" element={<Navigate to="/packs/:bookId" replace />} />
                    <Route path="/packs" element={<Navigate to="/library" replace />} />
                    <Route path="/packs/:packId" element={<PackDetail />} />
                    <Route path="/practice" element={<PracticePage />} />
                    <Route path="/practice/:sourceType/:sourceId" element={<PracticePage />} />
                    <Route path="/mixed-practice" element={<MixedPractice />} />
                    <Route path="/cards/:sourceType/:sourceId" element={<CardsMode />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/grammar" element={<GrammarPage />} />
                    <Route path="/grammar/:level/:topicId" element={<GrammarExercises />} />
                    <Route path="/grammar/:level/:topicId/:exerciseId" element={<GrammarTopic />} />
                    <Route path="/grammar-test" element={<GrammarTest />} />
                    <Route path="/grammar-test/run/:testId" element={<GrammarTest />} />
                  </Route>
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </PacksProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

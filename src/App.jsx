import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
const PackDetail = lazyWithRetry(() => import('./pages/PackDetail'));
const PracticePage = lazyWithRetry(() => import('./pages/PracticePage'));
const StatsPage = lazyWithRetry(() => import('./pages/StatsPage'));
const ProfilePage = lazyWithRetry(() => import('./pages/ProfilePage'));
const LibraryPage = lazyWithRetry(() => import('./pages/LibraryPage'));
const MixedPractice = lazyWithRetry(() => import('./pages/MixedPractice'));
const CardsMode = lazyWithRetry(() => import('./pages/CardsMode'));
const Settings = lazyWithRetry(() => import('./pages/Settings'));
const GrammarPage = lazyWithRetry(() => import('./pages/GrammarPage'));
const GrammarTopic = lazyWithRetry(() => import('./pages/GrammarTopic'));
const GrammarExercises = lazyWithRetry(() => import('./pages/GrammarExercises'));
const GrammarTest = lazyWithRetry(() => import('./pages/GrammarTest'));

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
    </ErrorBoundary>
  );
}

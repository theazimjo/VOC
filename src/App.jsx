import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import BookDetail from './pages/BookDetail';
import PackDetail from './pages/PackDetail';
import PracticePage from './pages/PracticePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import LibraryPage from './pages/LibraryPage';
import MixedPractice from './pages/MixedPractice';
import CardsMode from './pages/CardsMode';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/books" element={<Navigate to="/library?tab=books" replace />} />
              <Route path="/books/:bookId" element={<BookDetail />} />
              <Route path="/packs" element={<Navigate to="/library?tab=packs" replace />} />
              <Route path="/packs/:packId" element={<PackDetail />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/practice/:sourceType/:sourceId" element={<PracticePage />} />
              <Route path="/mixed-practice" element={<MixedPractice />} />
              <Route path="/cards/:sourceType/:sourceId" element={<CardsMode />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

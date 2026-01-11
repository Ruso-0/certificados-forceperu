import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthProvider'
import { AuthGuard } from './components/auth/AuthGuard'
import { AdminLayout } from './components/layout/AdminLayout'

// Pages
import { HomePage } from './pages/public/HomePage'
import { LoginPage } from './pages/admin/LoginPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { CertificatesPage } from './pages/admin/CertificatesPage'
import { NewCertificatePage } from './pages/admin/NewCertificatePage'
import { ImportPage } from './pages/admin/ImportPage'
import { CoursesPage } from './pages/admin/CoursesPage'
import { VerifyPage } from './pages/public/VerifyPage'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/verificar/:codigo" element={<VerifyPage />} />

          {/* Auth routes */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <AuthGuard>
                <AdminLayout />
              </AuthGuard>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="certificados" element={<CertificatesPage />} />
            <Route path="certificados/nuevo" element={<NewCertificatePage />} />
            <Route path="certificados/importar" element={<ImportPage />} />
            <Route path="cursos" element={<CoursesPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

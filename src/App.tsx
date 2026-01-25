import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/auth/AuthProvider'
import { AuthGuard } from './components/auth/AuthGuard'
import { AdminLayout } from './components/layout/AdminLayout'
import { CorporateLayout } from './components/layout/CorporateLayout'

// Corporate Pages
import {
  HomePage,
  AboutPage,
  ServicesPage,
  ContactPage,
  SaneamientoPage,
  SeguridadPage,
  CapacitacionPage,
  LimpiezaPage,
} from './pages/corporate'

// Admin Pages
import { LoginPage } from './pages/admin/LoginPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { CertificatesPage } from './pages/admin/CertificatesPage'
import { NewCertificatePage } from './pages/admin/NewCertificatePage'
import { ImportPage } from './pages/admin/ImportPage'
import { CoursesPage } from './pages/admin/CoursesPage'
import { QRGeneratorPage } from './pages/admin/QRGeneratorPage'

// Public Pages
import { VerifyPage } from './pages/public/VerifyPage'
import { IntranetPage } from './pages/public/IntranetPage'
import { SeminarioVipPage } from './pages/public/SeminarioVipPage'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Corporate Website Routes */}
          <Route element={<CorporateLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/saneamiento-ambiental" element={<SaneamientoPage />} />
            <Route path="/servicios/seguridad-integral" element={<SeguridadPage />} />
            <Route path="/servicios/capacitacion" element={<CapacitacionPage />} />
            <Route path="/servicios/limpieza" element={<LimpiezaPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Route>

          {/* Certificate Verification (Public) */}
          <Route path="/verificar" element={<VerifyPage />} />
          <Route path="/verificar/:codigo" element={<VerifyPage />} />

          {/* Intranet - Login & QR Scanner */}
          <Route path="/intranet" element={<IntranetPage />} />

          {/* Seminario VIP - Proteccion de Personajes */}
          <Route path="/seminario-vip" element={<SeminarioVipPage />} />

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
            <Route path="qr-generator" element={<QRGeneratorPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

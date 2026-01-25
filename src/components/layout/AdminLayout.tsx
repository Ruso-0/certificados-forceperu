import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthProvider'
import { Icon, Button } from '../ui'
import { cn } from '../../lib/utils'

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard', end: true },
  { to: '/admin/certificados', icon: 'workspace_premium', label: 'Certificados' },
  { to: '/admin/certificados/nuevo', icon: 'add_circle', label: 'Nuevo Certificado' },
  { to: '/admin/certificados/importar', icon: 'upload_file', label: 'Importar Excel' },
  { to: '/admin/qr-generator', icon: 'qr_code_2', label: 'Generador QR' },
  { to: '/admin/cursos', icon: 'school', label: 'Cursos' },
]

export function AdminLayout() {
  const { user, signOut } = useAuthContext()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-bg-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="shield" size="md" className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-navy text-sm">Force Perú</h1>
              <p className="text-xs text-gray-500">Certificados</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-navy'
                    )
                  }
                >
                  <Icon name={item.icon} size="sm" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="person" size="sm" className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-navy truncate">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            leftIcon="logout"
            onClick={handleSignOut}
          >
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

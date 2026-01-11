import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'
import { Icon } from '../ui'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Icon name="progress_activity" size="xl" className="text-primary animate-spin" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

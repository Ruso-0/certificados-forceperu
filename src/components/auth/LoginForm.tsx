import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'
import { Button, Input, Card, Icon } from '../ui'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="shield" size="xl" className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Force Perú CEFOESP</h1>
          <p className="text-gray-500 mt-1">Sistema de Certificados Digitales</p>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-navy mb-6">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Correo electrónico"
              placeholder="admin@forceperu.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon="mail"
              required
              autoComplete="email"
            />

            <Input
              type="password"
              name="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon="lock"
              required
              autoComplete="current-password"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700 text-sm">
                <Icon name="error" size="sm" />
                {error}
              </div>
            )}

            <Button type="submit" fullWidth isLoading={isLoading} leftIcon="login">
              Iniciar Sesión
            </Button>
          </form>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} Force Perú S.A.C. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}

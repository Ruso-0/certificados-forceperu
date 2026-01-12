import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuthContext } from './AuthProvider'
import { Icon } from '../ui'

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
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="w-full max-w-md relative z-10 animate-slide-in-up">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block group">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-xl group-hover:scale-105 transition-transform">
              <img
                src="/images/logo-force-peru.avif"
                alt="Force Peru"
                className="w-14 h-14 object-contain"
              />
            </div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-white mb-1">
            Force Perú CEFOESP
          </h1>
          <p className="text-sky-300/80 text-sm tracking-wide">
            Sistema de Certificados Digitales
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-dark rounded-2xl p-8 shadow-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500/20 rounded-xl flex items-center justify-center">
              <Icon name="login" size="sm" className="text-sky-400" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-white">
                Iniciar Sesión
              </h2>
              <p className="text-brand-300 text-sm">Acceso al panel administrativo</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-200 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
                  <Icon name="mail" size="sm" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@forceperu.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-200 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400">
                  <Icon name="lock" size="sm" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center shrink-0">
                  <Icon name="error" size="sm" className="text-red-400" />
                </div>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed btn-press"
            >
              {isLoading ? (
                <>
                  <Icon name="progress_activity" size="sm" className="animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  <Icon name="login" size="sm" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-brand-400 text-xs uppercase tracking-wider">o</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Back to site */}
          <Link
            to="/"
            className="w-full py-3 border border-white/10 text-brand-200 font-medium rounded-xl hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Icon name="arrow_back" size="sm" />
            Volver al sitio web
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-brand-400 text-sm">
            &copy; {new Date().getFullYear()} Force Perú S.A.C.
          </p>
          <p className="text-brand-500 text-xs mt-1">
            Centro de Formación y Especialización
          </p>
        </div>
      </div>
    </div>
  )
}

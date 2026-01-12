import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Icon } from '../../components/ui'

interface Stats {
  totalCertificates: number
  thisMonth: number
  recentVerifications: number
  activeCourses: number
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalCertificates: 0,
    thisMonth: 0,
    recentVerifications: 0,
    activeCourses: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Total certificates
        const { count: totalCertificates } = await supabase
          .from('certificates')
          .select('*', { count: 'exact', head: true })

        // This month
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)
        const { count: thisMonth } = await supabase
          .from('certificates')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth.toISOString())

        // Recent verifications (last 24h)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const { count: recentVerifications } = await supabase
          .from('verification_logs')
          .select('*', { count: 'exact', head: true })
          .gte('verified_at', yesterday.toISOString())

        // Active courses
        const { count: activeCourses } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true)

        setStats({
          totalCertificates: totalCertificates || 0,
          thisMonth: thisMonth || 0,
          recentVerifications: recentVerifications || 0,
          activeCourses: activeCourses || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      icon: 'workspace_premium',
      label: 'Total Certificados',
      value: stats.totalCertificates,
      gradient: 'from-sky-500 to-sky-600',
      shadow: 'shadow-sky-500/25',
      iconBg: 'bg-sky-500/20',
      iconColor: 'text-sky-400',
    },
    {
      icon: 'calendar_month',
      label: 'Este Mes',
      value: stats.thisMonth,
      gradient: 'from-emerald-500 to-emerald-600',
      shadow: 'shadow-emerald-500/25',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      icon: 'qr_code_scanner',
      label: 'Verificaciones (24h)',
      value: stats.recentVerifications,
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/25',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      icon: 'school',
      label: 'Cursos Activos',
      value: stats.activeCourses,
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/25',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-400',
    },
  ]

  const quickActions = [
    {
      icon: 'add_circle',
      label: 'Nuevo Certificado',
      description: 'Crear certificado individual',
      href: '/admin/certificados/nuevo',
      gradient: 'from-sky-500 to-sky-600',
    },
    {
      icon: 'upload_file',
      label: 'Importar Excel',
      description: 'Carga masiva de certificados',
      href: '/admin/certificados/importar',
      gradient: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: 'school',
      label: 'Gestionar Cursos',
      description: 'Administrar cursos disponibles',
      href: '/admin/cursos',
      gradient: 'from-violet-500 to-purple-600',
    },
    {
      icon: 'list_alt',
      label: 'Ver Certificados',
      description: 'Lista completa de certificados',
      href: '/admin/certificados',
      gradient: 'from-amber-500 to-orange-500',
    },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/25">
            <Icon name="dashboard" size="lg" className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-900">Dashboard</h1>
            <p className="text-brand-500">Resumen del sistema de certificados</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 shadow-sm border border-brand-100 hover:shadow-md hover:border-brand-200 transition-all group animate-slide-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={stat.icon} size="lg" className={stat.iconColor} />
              </div>
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient}`} />
            </div>
            <p className="text-sm text-brand-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-display font-bold text-brand-900">
              {loading ? (
                <span className="inline-block w-16 h-8 bg-brand-100 rounded animate-pulse" />
              ) : (
                stat.value.toLocaleString()
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-display text-lg font-semibold text-brand-900 mb-4 flex items-center gap-2">
          <Icon name="bolt" size="sm" className="text-accent-500" />
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.label}
              to={action.href}
              className="group bg-white rounded-xl p-5 border border-brand-100 hover:border-sky-200 hover:shadow-lg transition-all animate-slide-in-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className={`w-11 h-11 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon name={action.icon} size="md" className="text-white" />
              </div>
              <h3 className="font-semibold text-brand-900 mb-1 group-hover:text-sky-600 transition-colors">
                {action.label}
              </h3>
              <p className="text-sm text-brand-500">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR System Info */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-2xl p-6 border border-sky-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/25">
              <Icon name="qr_code_2" size="lg" className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-brand-900 mb-2">
                Sistema de Verificación QR
              </h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                Cada certificado generado incluye un código QR único que permite su verificación pública.
                Los usuarios pueden escanear el código para comprobar la autenticidad del certificado.
              </p>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
              <Icon name="verified_user" size="lg" className="text-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-brand-900 mb-2">
                Seguridad y Autenticidad
              </h3>
              <p className="text-brand-600 text-sm leading-relaxed">
                Todos los certificados están respaldados por un código de verificación único
                que garantiza su autenticidad y previene falsificaciones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="mt-8 bg-white rounded-2xl p-6 border border-brand-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-brand-900 flex items-center gap-2">
            <Icon name="history" size="sm" className="text-brand-500" />
            Actividad Reciente
          </h2>
          <Link
            to="/admin/certificados"
            className="text-sm text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 transition-colors"
          >
            Ver todo
            <Icon name="chevron_right" size="xs" />
          </Link>
        </div>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Icon name="assignment" size="xl" className="text-brand-400" />
          </div>
          <p className="text-brand-500 text-sm">
            Los certificados recientes aparecerán aquí
          </p>
        </div>
      </div>
    </div>
  )
}

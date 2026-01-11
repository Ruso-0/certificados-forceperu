import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Card, Icon, Button } from '../../components/ui'

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
      color: 'bg-primary',
    },
    {
      icon: 'calendar_month',
      label: 'Este Mes',
      value: stats.thisMonth,
      color: 'bg-success',
    },
    {
      icon: 'qr_code_scanner',
      label: 'Verificaciones (24h)',
      value: stats.recentVerifications,
      color: 'bg-warning',
    },
    {
      icon: 'school',
      label: 'Cursos Activos',
      value: stats.activeCourses,
      color: 'bg-navy',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
        <p className="text-gray-500">Resumen del sistema de certificados</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4">
            <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center`}>
              <Icon name={stat.icon} size="lg" className="text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-navy">
                {loading ? '...' : stat.value.toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-navy mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/certificados/nuevo">
            <Button leftIcon="add_circle">Nuevo Certificado</Button>
          </Link>
          <Link to="/admin/certificados/importar">
            <Button variant="secondary" leftIcon="upload_file">
              Importar Excel
            </Button>
          </Link>
          <Link to="/admin/cursos">
            <Button variant="outline" leftIcon="school">
              Gestionar Cursos
            </Button>
          </Link>
        </div>
      </Card>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <Icon name="info" size="sm" className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-1">Sistema de Verificación QR</h3>
            <p className="text-gray-600 text-sm">
              Cada certificado generado incluye un código QR único que permite su verificación pública.
              Los usuarios pueden escanear el código para comprobar la autenticidad del certificado.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

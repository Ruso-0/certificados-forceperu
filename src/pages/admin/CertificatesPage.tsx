import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCertificates } from '../../hooks/useCertificates'
import { Card, Button, Input, Icon, Badge } from '../../components/ui'
import { formatShortDate, getVerificationUrl } from '../../lib/utils'
import type { Certificate } from '../../lib/database.types'

const statusConfig: Record<Certificate['status'], { variant: 'success' | 'error' | 'warning'; label: string }> = {
  active: { variant: 'success', label: 'Activo' },
  revoked: { variant: 'error', label: 'Revocado' },
  expired: { variant: 'warning', label: 'Expirado' },
}

export function CertificatesPage() {
  const { certificates, loading, revokeCertificate, deleteCertificate } = useCertificates()
  const [search, setSearch] = useState('')
  const [revoking, setRevoking] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.participant_name.toLowerCase().includes(search.toLowerCase()) ||
      cert.verification_code.toLowerCase().includes(search.toLowerCase()) ||
      cert.participant_dni?.includes(search)
  )

  const handleRevoke = async (id: string) => {
    const reason = prompt('Motivo de revocación:')
    if (!reason) return

    setRevoking(id)
    try {
      await revokeCertificate(id, reason)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al revocar')
    } finally {
      setRevoking(null)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar el certificado de "${name}"? Esta acción no se puede deshacer.`)) {
      return
    }

    setDeleting(id)
    try {
      await deleteCertificate(id)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    } finally {
      setDeleting(null)
    }
  }

  const copyVerificationUrl = (code: string) => {
    navigator.clipboard.writeText(getVerificationUrl(code))
    alert('URL copiada al portapapeles')
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Certificados</h1>
          <p className="text-gray-500">{certificates.length} certificados emitidos</p>
        </div>
        <div className="flex gap-4">
          <Link to="/admin/certificados/importar">
            <Button variant="secondary" leftIcon="upload_file">
              Importar Excel
            </Button>
          </Link>
          <Link to="/admin/certificados/nuevo">
            <Button leftIcon="add_circle">Nuevo Certificado</Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <Input
          placeholder="Buscar por nombre, código o DNI..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon="search"
        />
      </Card>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Icon name="progress_activity" size="xl" className="text-primary animate-spin" />
        </div>
      ) : filteredCertificates.length === 0 ? (
        <Card className="text-center py-12">
          <Icon name="workspace_premium" size="xl" className="text-gray-300 mb-4" />
          <p className="text-gray-500">
            {search ? 'No se encontraron certificados' : 'No hay certificados emitidos'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCertificates.map((cert) => {
            const status = statusConfig[cert.status]
            return (
              <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name="workspace_premium" className="text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy truncate">
                        {cert.participant_name}
                      </h3>
                      <Badge variant={status.variant} size="sm">
                        {status.label}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500 mb-2">
                      {cert.course?.name || 'Curso no especificado'}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-500">
                        <Icon name="qr_code" size="xs" />
                        {cert.verification_code}
                      </span>
                      {cert.participant_dni && (
                        <span className="flex items-center gap-1 text-gray-500">
                          <Icon name="id_card" size="xs" />
                          DNI: {cert.participant_dni}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-gray-500">
                        <Icon name="calendar_today" size="xs" />
                        {formatShortDate(cert.issue_date)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon="content_copy"
                      onClick={() => copyVerificationUrl(cert.verification_code)}
                    >
                      URL
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon="visibility"
                      onClick={() =>
                        window.open(`/verificar/${cert.verification_code}`, '_blank')
                      }
                    >
                      Ver
                    </Button>
                    {cert.status === 'active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon="block"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRevoke(cert.id)}
                        disabled={revoking === cert.id}
                      >
                        {revoking === cert.id ? '...' : 'Revocar'}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon="delete"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(cert.id, cert.participant_name)}
                      disabled={deleting === cert.id}
                    >
                      {deleting === cert.id ? '...' : 'Eliminar'}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

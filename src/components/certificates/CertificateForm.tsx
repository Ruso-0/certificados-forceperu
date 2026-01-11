import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourses } from '../../hooks/useCourses'
import { useCertificates } from '../../hooks/useCertificates'
import { Card, Button, Input, Select, Icon } from '../ui'
import { generateVerificationCode } from '../../lib/utils'

export function CertificateForm() {
  const navigate = useNavigate()
  const { courses, loading: loadingCourses } = useCourses()
  const { createCertificate } = useCertificates()

  const [formData, setFormData] = useState({
    participant_name: '',
    participant_dni: '',
    participant_email: '',
    course_id: '',
    start_date: '',
    end_date: '',
    issue_date: new Date().toISOString().split('T')[0],
    instructor_name: 'Rodolfo A. Pacheco Vera',
    instructor_title: 'Lic. Gestión de Seguridad y Riesgos',
    instructor_credentials: 'Instructor SUCAMEC, Ficha N° 4321',
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Update instructor when course changes
  useEffect(() => {
    if (formData.course_id) {
      const course = courses.find((c) => c.id === formData.course_id)
      if (course) {
        setFormData((prev) => ({
          ...prev,
          instructor_name: course.default_instructor_name,
          instructor_title: course.default_instructor_title,
          instructor_credentials: course.default_instructor_credentials,
        }))
      }
    }
  }, [formData.course_id, courses])

  const selectedCourse = courses.find((c) => c.id === formData.course_id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const verificationCode = generateVerificationCode()

      await createCertificate({
        verification_code: verificationCode,
        participant_name: formData.participant_name,
        participant_dni: formData.participant_dni || null,
        participant_email: formData.participant_email || null,
        course_id: formData.course_id || null,
        issue_date: formData.issue_date,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        duration_text: selectedCourse?.duration_text || null,
        instructor_name: formData.instructor_name,
        instructor_title: formData.instructor_title,
        instructor_credentials: formData.instructor_credentials,
        status: 'active',
        expiry_date: null,
        revocation_reason: null,
        pdf_url: null,
        pdf_generated_at: null,
        batch_id: null,
        created_by: null,
      })

      navigate('/admin/certificados')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear certificado')
    } finally {
      setSaving(false)
    }
  }

  const courseOptions = courses.map((c) => ({
    value: c.id,
    label: `${c.code} - ${c.name}`,
  }))

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Nuevo Certificado</h1>
        <p className="text-gray-500">Complete los datos para generar el certificado</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Participant Info */}
          <div>
            <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
              <Icon name="person" size="sm" />
              Datos del Participante
            </h2>
            <div className="space-y-4">
              <Input
                label="Nombre Completo"
                name="participant_name"
                placeholder="Juan Carlos Pérez García"
                value={formData.participant_name}
                onChange={(e) =>
                  setFormData({ ...formData, participant_name: e.target.value })
                }
                leftIcon="badge"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="DNI"
                  name="participant_dni"
                  placeholder="12345678"
                  maxLength={8}
                  value={formData.participant_dni}
                  onChange={(e) =>
                    setFormData({ ...formData, participant_dni: e.target.value })
                  }
                  leftIcon="id_card"
                />
                <Input
                  type="email"
                  label="Correo Electrónico"
                  name="participant_email"
                  placeholder="juan@email.com"
                  value={formData.participant_email}
                  onChange={(e) =>
                    setFormData({ ...formData, participant_email: e.target.value })
                  }
                  leftIcon="mail"
                />
              </div>
            </div>
          </div>

          {/* Course Selection */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
              <Icon name="school" size="sm" />
              Curso / Certificación
            </h2>
            <Select
              label="Seleccionar Curso"
              name="course_id"
              options={courseOptions}
              value={formData.course_id}
              onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
              required
              disabled={loadingCourses}
            />
            {selectedCourse && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-600">{selectedCourse.description}</p>
                <p className="text-sm text-primary font-medium mt-2">
                  Duración: {selectedCourse.duration_text}
                </p>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
              <Icon name="calendar_month" size="sm" />
              Fechas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                type="date"
                label="Fecha de Inicio"
                name="start_date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
              <Input
                type="date"
                label="Fecha de Fin"
                name="end_date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
              <Input
                type="date"
                label="Fecha de Emisión"
                name="issue_date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Instructor */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
              <Icon name="supervisor_account" size="sm" />
              Instructor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Nombre"
                name="instructor_name"
                value={formData.instructor_name}
                onChange={(e) =>
                  setFormData({ ...formData, instructor_name: e.target.value })
                }
              />
              <Input
                label="Título"
                name="instructor_title"
                value={formData.instructor_title}
                onChange={(e) =>
                  setFormData({ ...formData, instructor_title: e.target.value })
                }
              />
              <Input
                label="Credenciales"
                name="instructor_credentials"
                value={formData.instructor_credentials}
                onChange={(e) =>
                  setFormData({ ...formData, instructor_credentials: e.target.value })
                }
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700 text-sm">
              <Icon name="error" size="sm" />
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" isLoading={saving} leftIcon="add_circle">
              Crear Certificado
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/certificados')}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

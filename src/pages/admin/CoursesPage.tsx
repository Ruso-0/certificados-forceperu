import { useState } from 'react'
import { useCourses } from '../../hooks/useCourses'
import { Card, Button, Input, Select, Icon, Badge } from '../../components/ui'
import type { Course } from '../../lib/database.types'

const categories = [
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'saneamiento', label: 'Saneamiento' },
  { value: 'sucamec', label: 'SUCAMEC' },
  { value: 'capacitacion', label: 'Capacitación' },
]

const categoryColors: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
  seguridad: 'info',
  saneamiento: 'success',
  sucamec: 'warning',
  capacitacion: 'info',
}

type CourseFormData = {
  code: string
  name: string
  category: Course['category']
  description: string
  duration_hours: number
  duration_text: string
  default_instructor_name: string
  default_instructor_title: string
  default_instructor_credentials: string
  is_active: boolean
}

const emptyForm: CourseFormData = {
  code: '',
  name: '',
  category: 'capacitacion',
  description: '',
  duration_hours: 24,
  duration_text: '24 horas lectivas',
  default_instructor_name: 'Rodolfo A. Pacheco Vera',
  default_instructor_title: 'Lic. Gestión de Seguridad y Riesgos',
  default_instructor_credentials: 'Instructor SUCAMEC, Ficha N° 4321',
  is_active: true,
}

export function CoursesPage() {
  const { courses, loading, createCourse, updateCourse, deleteCourse } = useCourses()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<CourseFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleEdit = (course: Course) => {
    setEditingId(course.id)
    setFormData({
      code: course.code,
      name: course.name,
      category: course.category,
      description: course.description || '',
      duration_hours: course.duration_hours || 24,
      duration_text: course.duration_text || '',
      default_instructor_name: course.default_instructor_name,
      default_instructor_title: course.default_instructor_title,
      default_instructor_credentials: course.default_instructor_credentials,
      is_active: course.is_active,
    })
    setShowForm(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyForm)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (editingId) {
        await updateCourse(editingId, formData)
      } else {
        await createCourse(formData)
      }
      handleCancel()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de eliminar este curso?')) return

    try {
      await deleteCourse(id)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy">Cursos</h1>
          <p className="text-gray-500">Gestiona los tipos de certificaciones disponibles</p>
        </div>
        {!showForm && (
          <Button leftIcon="add" onClick={handleNew}>
            Nuevo Curso
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-lg font-semibold text-navy mb-6">
            {editingId ? 'Editar Curso' : 'Nuevo Curso'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Código"
                name="code"
                placeholder="CAP-GRD-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
              <Select
                label="Categoría"
                name="category"
                options={categories}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as Course['category'] })
                }
                required
              />
            </div>

            <Input
              label="Nombre del Curso"
              name="name"
              placeholder="Gestión de Riesgos de Desastres"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <div>
              <label className="text-sm font-medium text-navy block mb-1.5">
                Descripción
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-navy placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Descripción que aparecerá en el certificado..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="number"
                label="Duración (horas)"
                name="duration_hours"
                value={formData.duration_hours}
                onChange={(e) =>
                  setFormData({ ...formData, duration_hours: parseInt(e.target.value) || 0 })
                }
              />
              <Input
                label="Texto de duración"
                name="duration_text"
                placeholder="24 horas lectivas"
                value={formData.duration_text}
                onChange={(e) => setFormData({ ...formData, duration_text: e.target.value })}
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium text-navy mb-4">Instructor por Defecto</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Nombre"
                  name="default_instructor_name"
                  value={formData.default_instructor_name}
                  onChange={(e) =>
                    setFormData({ ...formData, default_instructor_name: e.target.value })
                  }
                />
                <Input
                  label="Título"
                  name="default_instructor_title"
                  value={formData.default_instructor_title}
                  onChange={(e) =>
                    setFormData({ ...formData, default_instructor_title: e.target.value })
                  }
                />
                <Input
                  label="Credenciales"
                  name="default_instructor_credentials"
                  value={formData.default_instructor_credentials}
                  onChange={(e) =>
                    setFormData({ ...formData, default_instructor_credentials: e.target.value })
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

            <div className="flex gap-4">
              <Button type="submit" isLoading={saving} leftIcon="save">
                {editingId ? 'Guardar Cambios' : 'Crear Curso'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Course List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Icon name="progress_activity" size="xl" className="text-primary animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <Card className="text-center py-12">
          <Icon name="school" size="xl" className="text-gray-300 mb-4" />
          <p className="text-gray-500">No hay cursos registrados</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Icon name="school" className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-navy truncate">{course.name}</h3>
                  <Badge variant={categoryColors[course.category]} size="sm">
                    {course.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {course.code} • {course.duration_text || `${course.duration_hours}h`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon="edit"
                  onClick={() => handleEdit(course)}
                >
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon="delete"
                  onClick={() => handleDelete(course.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

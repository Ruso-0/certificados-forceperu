import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { supabase } from '../../lib/supabase'
import { useCourses } from '../../hooks/useCourses'
import { Card, Button, Icon, Badge } from '../ui'
import { generateVerificationCode } from '../../lib/utils'

interface ExcelRow {
  nombres: string
  dni?: string
  email?: string
  curso: string
  fecha_inicio?: string
  fecha_fin?: string
}

interface ParsedRow extends ExcelRow {
  rowNumber: number
  isValid: boolean
  errors: string[]
  courseId?: string
}

interface ImportResult {
  success: number
  failed: number
  errors: { row: number; message: string }[]
}

export function BatchImport() {
  const navigate = useNavigate()
  const { courses } = useCourses()

  const [file, setFile] = useState<File | null>(null)
  const [parsedData, setParsedData] = useState<ParsedRow[]>([])
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const parseExcel = useCallback(
    (file: File) => {
      const reader = new FileReader()

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: 'array' })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = XLSX.utils.sheet_to_json<Record<string, string | number>>(worksheet)

          // Map and validate rows
          const parsed: ParsedRow[] = jsonData.map((row, index) => {
            const errors: string[] = []

            // Normalize column names (case insensitive)
            const normalizedRow: ExcelRow = {
              nombres: String(row['Nombres'] || row['nombres'] || row['NOMBRES'] || row['Nombre'] || '').trim(),
              dni: String(row['DNI'] || row['dni'] || row['Dni'] || '').trim() || undefined,
              email: String(row['Email'] || row['email'] || row['EMAIL'] || row['Correo'] || '').trim() || undefined,
              curso: String(row['Curso'] || row['curso'] || row['CURSO'] || row['Código'] || row['codigo'] || '').trim(),
              fecha_inicio: String(row['Fecha Inicio'] || row['fecha_inicio'] || row['Inicio'] || '').trim() || undefined,
              fecha_fin: String(row['Fecha Fin'] || row['fecha_fin'] || row['Fin'] || '').trim() || undefined,
            }

            // Validate required fields
            if (!normalizedRow.nombres) {
              errors.push('Nombre es requerido')
            }

            if (!normalizedRow.curso) {
              errors.push('Código de curso es requerido')
            }

            // Find course by code
            const course = courses.find(
              (c) => c.code.toLowerCase() === normalizedRow.curso.toLowerCase()
            )

            if (normalizedRow.curso && !course) {
              errors.push(`Curso "${normalizedRow.curso}" no encontrado`)
            }

            return {
              ...normalizedRow,
              rowNumber: index + 2, // Excel rows start at 1, plus header
              isValid: errors.length === 0,
              errors,
              courseId: course?.id,
            }
          })

          setParsedData(parsed)
        } catch (err) {
          alert('Error al leer el archivo Excel')
          console.error(err)
        }
      }

      reader.readAsArrayBuffer(file)
    },
    [courses]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
      parseExcel(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile)
      setResult(null)
      parseExcel(droppedFile)
    } else {
      alert('Por favor, sube un archivo Excel (.xlsx o .xls)')
    }
  }

  const handleImport = async () => {
    const validRows = parsedData.filter((row) => row.isValid)
    if (validRows.length === 0) {
      alert('No hay filas válidas para importar')
      return
    }

    setImporting(true)
    const errors: { row: number; message: string }[] = []
    let success = 0

    const { data: { user } } = await supabase.auth.getUser()

    // Create batch record
    const { data: batch } = await supabase
      .from('certificate_batches')
      .insert({
        name: `Importación ${new Date().toLocaleDateString()}`,
        file_name: file?.name,
        total_rows: validRows.length,
        status: 'processing',
        created_by: user?.id,
      })
      .select()
      .single()

    for (const row of validRows) {
      try {
        const verificationCode = generateVerificationCode()
        const course = courses.find((c) => c.id === row.courseId)

        await supabase.from('certificates').insert({
          verification_code: verificationCode,
          participant_name: row.nombres,
          participant_dni: row.dni || null,
          participant_email: row.email || null,
          course_id: row.courseId || null,
          start_date: row.fecha_inicio ? new Date(row.fecha_inicio).toISOString().split('T')[0] : null,
          end_date: row.fecha_fin ? new Date(row.fecha_fin).toISOString().split('T')[0] : null,
          duration_text: course?.duration_text || null,
          instructor_name: course?.default_instructor_name || 'Rodolfo A. Pacheco Vera',
          instructor_title: course?.default_instructor_title || 'Lic. Gestión de Seguridad y Riesgos',
          instructor_credentials: course?.default_instructor_credentials || 'Instructor SUCAMEC, Ficha N° 4321',
          status: 'active',
          batch_id: batch?.id || null,
          created_by: user?.id,
        })

        success++
      } catch (err) {
        errors.push({
          row: row.rowNumber,
          message: err instanceof Error ? err.message : 'Error desconocido',
        })
      }
    }

    // Update batch record
    if (batch) {
      await supabase
        .from('certificate_batches')
        .update({
          successful_rows: success,
          failed_rows: errors.length,
          status: 'completed',
          completed_at: new Date().toISOString(),
          error_log: errors,
        })
        .eq('id', batch.id)
    }

    setResult({ success, failed: errors.length, errors })
    setImporting(false)
  }

  const validCount = parsedData.filter((r) => r.isValid).length
  const invalidCount = parsedData.filter((r) => !r.isValid).length

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy">Importar Certificados desde Excel</h1>
        <p className="text-gray-500">Carga masiva de certificados usando un archivo Excel</p>
      </div>

      {/* Format info */}
      <Card className="mb-6 bg-blue-50 border-blue-100">
        <h2 className="font-semibold text-navy mb-3 flex items-center gap-2">
          <Icon name="info" size="sm" />
          Formato del archivo Excel
        </h2>
        <p className="text-sm text-gray-600 mb-3">
          El archivo debe tener las siguientes columnas (la primera fila debe ser el encabezado):
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full">
            <thead>
              <tr className="border-b border-blue-200">
                <th className="text-left py-2 px-3 font-medium text-navy">Columna</th>
                <th className="text-left py-2 px-3 font-medium text-navy">Requerido</th>
                <th className="text-left py-2 px-3 font-medium text-navy">Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3">Nombres</td>
                <td className="py-2 px-3"><Badge variant="error" size="sm">Sí</Badge></td>
                <td className="py-2 px-3 text-gray-600">Juan Carlos Pérez García</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3">DNI</td>
                <td className="py-2 px-3"><Badge variant="neutral" size="sm">No</Badge></td>
                <td className="py-2 px-3 text-gray-600">12345678</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3">Email</td>
                <td className="py-2 px-3"><Badge variant="neutral" size="sm">No</Badge></td>
                <td className="py-2 px-3 text-gray-600">juan@email.com</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3">Curso</td>
                <td className="py-2 px-3"><Badge variant="error" size="sm">Sí</Badge></td>
                <td className="py-2 px-3 text-gray-600">CAP-GRD-001</td>
              </tr>
              <tr className="border-b border-blue-100">
                <td className="py-2 px-3">Fecha Inicio</td>
                <td className="py-2 px-3"><Badge variant="neutral" size="sm">No</Badge></td>
                <td className="py-2 px-3 text-gray-600">02/12/2024</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Fecha Fin</td>
                <td className="py-2 px-3"><Badge variant="neutral" size="sm">No</Badge></td>
                <td className="py-2 px-3 text-gray-600">03/12/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* File upload */}
      <Card className="mb-6">
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragOver ? 'border-primary bg-primary/5' : 'border-gray-200'
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          <Icon name="upload_file" size="xl" className="text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Arrastra y suelta tu archivo Excel aquí, o
          </p>
          <label className="cursor-pointer">
            <span className="text-primary font-medium hover:underline">selecciona un archivo</span>
            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {file && (
            <p className="mt-4 text-sm text-gray-500">
              Archivo seleccionado: <strong>{file.name}</strong>
            </p>
          )}
        </div>
      </Card>

      {/* Preview */}
      {parsedData.length > 0 && !result && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-navy">Vista previa ({parsedData.length} filas)</h2>
            <div className="flex gap-2">
              <Badge variant="success">{validCount} válidas</Badge>
              {invalidCount > 0 && <Badge variant="error">{invalidCount} con errores</Badge>}
            </div>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-navy">#</th>
                  <th className="text-left py-2 px-3 font-medium text-navy">Estado</th>
                  <th className="text-left py-2 px-3 font-medium text-navy">Nombre</th>
                  <th className="text-left py-2 px-3 font-medium text-navy">DNI</th>
                  <th className="text-left py-2 px-3 font-medium text-navy">Curso</th>
                  <th className="text-left py-2 px-3 font-medium text-navy">Errores</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row) => (
                  <tr key={row.rowNumber} className="border-t">
                    <td className="py-2 px-3 text-gray-500">{row.rowNumber}</td>
                    <td className="py-2 px-3">
                      {row.isValid ? (
                        <Icon name="check_circle" size="sm" className="text-green-500" />
                      ) : (
                        <Icon name="error" size="sm" className="text-red-500" />
                      )}
                    </td>
                    <td className="py-2 px-3">{row.nombres || '-'}</td>
                    <td className="py-2 px-3">{row.dni || '-'}</td>
                    <td className="py-2 px-3">{row.curso || '-'}</td>
                    <td className="py-2 px-3 text-red-500 text-xs">
                      {row.errors.join(', ') || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={handleImport}
              isLoading={importing}
              disabled={validCount === 0}
              leftIcon="upload"
            >
              Importar {validCount} Certificados
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setFile(null)
                setParsedData([])
              }}
            >
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Card>
          <div className="text-center py-6">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                result.failed === 0 ? 'bg-green-100' : 'bg-yellow-100'
              }`}
            >
              <Icon
                name={result.failed === 0 ? 'check_circle' : 'warning'}
                size="xl"
                className={result.failed === 0 ? 'text-green-600' : 'text-yellow-600'}
              />
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">Importación Completada</h2>
            <p className="text-gray-500 mb-4">
              Se crearon <strong className="text-green-600">{result.success}</strong> certificados
              {result.failed > 0 && (
                <>
                  {' '}y <strong className="text-red-600">{result.failed}</strong> fallaron
                </>
              )}
            </p>

            {result.errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left max-h-48 overflow-auto">
                <h3 className="font-semibold text-red-800 mb-2">Errores:</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  {result.errors.map((err, i) => (
                    <li key={i}>
                      Fila {err.row}: {err.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/admin/certificados')} leftIcon="visibility">
                Ver Certificados
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null)
                  setParsedData([])
                  setResult(null)
                }}
                leftIcon="refresh"
              >
                Importar Otro Archivo
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

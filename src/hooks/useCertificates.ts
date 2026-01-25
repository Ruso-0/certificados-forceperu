import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Certificate, Course } from '../lib/database.types'

export interface CertificateWithCourse extends Certificate {
  course?: Course | null
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<CertificateWithCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select(`
          *,
          course:courses(*)
        `)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setCertificates(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar certificados')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCertificates()
  }, [fetchCertificates])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCertificate = useCallback(async (certificate: any) => {
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('certificates')
      .insert({
        ...certificate,
        created_by: user?.id,
      })
      .select(`
        *,
        course:courses(*)
      `)
      .single()

    if (error) throw error

    setCertificates((prev) => [data, ...prev])
    return data
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCertificate = useCallback(async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('certificates')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        course:courses(*)
      `)
      .single()

    if (error) throw error

    setCertificates((prev) => prev.map((c) => (c.id === id ? data : c)))
    return data
  }, [])

  const revokeCertificate = useCallback(async (id: string, reason: string) => {
    return updateCertificate(id, {
      status: 'revoked',
      revocation_reason: reason,
    })
  }, [updateCertificate])

  const deleteCertificate = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id)

    if (error) throw error

    setCertificates((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
    createCertificate,
    updateCertificate,
    revokeCertificate,
    deleteCertificate,
  }
}

export function useCertificateByCode(code: string) {
  const [certificate, setCertificate] = useState<CertificateWithCourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        setError(null)

        const { data, error: fetchError } = await supabase
          .from('certificates')
          .select(`
            *,
            course:courses(*)
          `)
          .eq('verification_code', code)
          .single()

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            setError('not_found')
          } else {
            throw fetchError
          }
        } else {
          setCertificate(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error')
      } finally {
        setLoading(false)
      }
    }

    if (code) fetch()
  }, [code])

  return { certificate, loading, error }
}

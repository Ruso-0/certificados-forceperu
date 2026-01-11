import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Course } from '../lib/database.types'

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .order('name')

      if (fetchError) throw fetchError

      setCourses(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar cursos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createCourse = useCallback(async (course: any) => {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single()

    if (error) throw error

    setCourses((prev) => [...prev, data])
    return data
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateCourse = useCallback(async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    setCourses((prev) => prev.map((c) => (c.id === id ? data : c)))
    return data
  }, [])

  const deleteCourse = useCallback(async (id: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', id)

    if (error) throw error

    setCourses((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  }
}

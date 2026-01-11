export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          code: string
          name: string
          category: 'seguridad' | 'saneamiento' | 'sucamec' | 'capacitacion'
          description: string | null
          duration_hours: number | null
          duration_text: string | null
          default_instructor_name: string
          default_instructor_title: string
          default_instructor_credentials: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          category: 'seguridad' | 'saneamiento' | 'sucamec' | 'capacitacion'
          description?: string | null
          duration_hours?: number | null
          duration_text?: string | null
          default_instructor_name?: string
          default_instructor_title?: string
          default_instructor_credentials?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          category?: 'seguridad' | 'saneamiento' | 'sucamec' | 'capacitacion'
          description?: string | null
          duration_hours?: number | null
          duration_text?: string | null
          default_instructor_name?: string
          default_instructor_title?: string
          default_instructor_credentials?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          verification_code: string
          participant_name: string
          participant_dni: string | null
          participant_email: string | null
          course_id: string | null
          issue_date: string
          start_date: string | null
          end_date: string | null
          expiry_date: string | null
          duration_text: string | null
          instructor_name: string
          instructor_title: string
          instructor_credentials: string
          status: 'active' | 'revoked' | 'expired'
          revocation_reason: string | null
          pdf_url: string | null
          pdf_generated_at: string | null
          batch_id: string | null
          created_at: string
          updated_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          verification_code: string
          participant_name: string
          participant_dni?: string | null
          participant_email?: string | null
          course_id?: string | null
          issue_date?: string
          start_date?: string | null
          end_date?: string | null
          expiry_date?: string | null
          duration_text?: string | null
          instructor_name?: string
          instructor_title?: string
          instructor_credentials?: string
          status?: 'active' | 'revoked' | 'expired'
          revocation_reason?: string | null
          pdf_url?: string | null
          pdf_generated_at?: string | null
          batch_id?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          verification_code?: string
          participant_name?: string
          participant_dni?: string | null
          participant_email?: string | null
          course_id?: string | null
          issue_date?: string
          start_date?: string | null
          end_date?: string | null
          expiry_date?: string | null
          duration_text?: string | null
          instructor_name?: string
          instructor_title?: string
          instructor_credentials?: string
          status?: 'active' | 'revoked' | 'expired'
          revocation_reason?: string | null
          pdf_url?: string | null
          pdf_generated_at?: string | null
          batch_id?: string | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
        }
      }
      certificate_batches: {
        Row: {
          id: string
          name: string | null
          file_name: string | null
          total_rows: number
          successful_rows: number
          failed_rows: number
          status: 'pending' | 'processing' | 'completed' | 'failed'
          error_log: Json
          created_at: string
          completed_at: string | null
          created_by: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          file_name?: string | null
          total_rows?: number
          successful_rows?: number
          failed_rows?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          error_log?: Json
          created_at?: string
          completed_at?: string | null
          created_by?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          file_name?: string | null
          total_rows?: number
          successful_rows?: number
          failed_rows?: number
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          error_log?: Json
          created_at?: string
          completed_at?: string | null
          created_by?: string | null
        }
      }
      verification_logs: {
        Row: {
          id: string
          verification_code: string
          certificate_id: string | null
          result: 'valid' | 'revoked' | 'expired' | 'not_found'
          ip_address: string | null
          user_agent: string | null
          verified_at: string
        }
        Insert: {
          id?: string
          verification_code: string
          certificate_id?: string | null
          result: 'valid' | 'revoked' | 'expired' | 'not_found'
          ip_address?: string | null
          user_agent?: string | null
          verified_at?: string
        }
        Update: {
          id?: string
          verification_code?: string
          certificate_id?: string | null
          result?: 'valid' | 'revoked' | 'expired' | 'not_found'
          ip_address?: string | null
          user_agent?: string | null
          verified_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Course = Database['public']['Tables']['courses']['Row']
export type Certificate = Database['public']['Tables']['certificates']['Row']
export type CertificateBatch = Database['public']['Tables']['certificate_batches']['Row']
export type VerificationLog = Database['public']['Tables']['verification_logs']['Row']

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'
import type { CertificateWithCourse } from '../../hooks/useCertificates'
import { formatDate, getVerificationUrl } from '../utils'

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2', fontWeight: 700 },
  ],
})

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Inter',
    position: 'relative',
  },
  // Decorative shapes
  decorTop: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 150,
    backgroundColor: '#1a5fb4',
    opacity: 0.1,
  },
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 250,
    height: 180,
    backgroundColor: '#1a5fb4',
    opacity: 0.08,
  },
  decorCircle: {
    position: 'absolute',
    top: 100,
    left: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a5fb4',
    opacity: 0.05,
  },
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#1a5fb4',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 700,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#1f2b5d',
    marginBottom: 4,
  },
  companySubtitle: {
    fontSize: 10,
    color: '#666666',
    letterSpacing: 2,
  },
  // Certificate type
  certificateType: {
    textAlign: 'center',
    marginBottom: 10,
  },
  certificateTypeText: {
    fontSize: 11,
    color: '#1a5fb4',
    letterSpacing: 3,
    fontWeight: 600,
  },
  // Main title
  title: {
    fontSize: 42,
    fontWeight: 700,
    color: '#1a5fb4',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 4,
  },
  // Otorgado a
  awardedTo: {
    textAlign: 'center',
    marginBottom: 8,
  },
  awardedToText: {
    fontSize: 12,
    color: '#666666',
  },
  // Participant name
  participantName: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1f2b5d',
    textAlign: 'center',
    marginBottom: 25,
    textTransform: 'uppercase',
  },
  // Course info
  courseSection: {
    textAlign: 'center',
    marginBottom: 20,
  },
  courseLabel: {
    fontSize: 11,
    color: '#666666',
    marginBottom: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1f2b5d',
    marginBottom: 15,
  },
  courseDescription: {
    fontSize: 11,
    color: '#444444',
    lineHeight: 1.6,
    maxWidth: 450,
    marginHorizontal: 'auto',
    textAlign: 'center',
  },
  // Dates and duration
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginTop: 20,
    marginBottom: 30,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 11,
    color: '#1f2b5d',
    fontWeight: 600,
  },
  // Signature section
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 60,
  },
  signatureBlock: {
    alignItems: 'center',
    width: 180,
  },
  signatureLine: {
    width: 150,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2b5d',
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 11,
    fontWeight: 600,
    color: '#1f2b5d',
    marginBottom: 2,
  },
  signatureTitle: {
    fontSize: 9,
    color: '#666666',
    textAlign: 'center',
  },
  // QR Section
  qrSection: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    alignItems: 'center',
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
  },
  qrLabel: {
    fontSize: 7,
    color: '#888888',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
  },
  verificationCode: {
    fontSize: 9,
    color: '#888888',
    textAlign: 'center',
  },
  verificationUrl: {
    fontSize: 8,
    color: '#1a5fb4',
    textAlign: 'center',
    marginTop: 2,
  },
})

interface CertificateTemplateProps {
  certificate: CertificateWithCourse
  qrCodeDataUrl?: string
}

export function CertificateTemplate({ certificate, qrCodeDataUrl }: CertificateTemplateProps) {
  const course = certificate.course

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Decorative elements */}
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />
        <View style={styles.decorCircle} />

        {/* Header with logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>FP</Text>
          </View>
          <Text style={styles.companyName}>FORCE PERÚ S.A.C.</Text>
          <Text style={styles.companySubtitle}>CENTRO DE FORMACIÓN Y ESPECIALIZACIÓN</Text>
        </View>

        {/* Certificate type */}
        <View style={styles.certificateType}>
          <Text style={styles.certificateTypeText}>CAPACITACIÓN DE ACTUALIZACIÓN</Text>
        </View>

        {/* Main title */}
        <Text style={styles.title}>CERTIFICADO</Text>

        {/* Awarded to */}
        <View style={styles.awardedTo}>
          <Text style={styles.awardedToText}>Se otorga el presente certificado a:</Text>
        </View>

        {/* Participant name */}
        <Text style={styles.participantName}>{certificate.participant_name}</Text>

        {/* Course section */}
        <View style={styles.courseSection}>
          <Text style={styles.courseLabel}>Por haber aprobado satisfactoriamente el curso de:</Text>
          <Text style={styles.courseName}>{course?.name || 'Curso de Capacitación'}</Text>
          {course?.description && (
            <Text style={styles.courseDescription}>{course.description}</Text>
          )}
        </View>

        {/* Details row */}
        <View style={styles.detailsRow}>
          {certificate.start_date && certificate.end_date && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Periodo</Text>
              <Text style={styles.detailValue}>
                Del {formatDate(certificate.start_date)} al {formatDate(certificate.end_date)}
              </Text>
            </View>
          )}
          {(certificate.duration_text || course?.duration_text) && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Duración</Text>
              <Text style={styles.detailValue}>
                {certificate.duration_text || course?.duration_text}
              </Text>
            </View>
          )}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Fecha de Emisión</Text>
            <Text style={styles.detailValue}>{formatDate(certificate.issue_date)}</Text>
          </View>
        </View>

        {/* Signature section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{certificate.instructor_name}</Text>
            <Text style={styles.signatureTitle}>{certificate.instructor_title}</Text>
            <Text style={styles.signatureTitle}>{certificate.instructor_credentials}</Text>
          </View>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>Force Perú S.A.C.</Text>
            <Text style={styles.signatureTitle}>Gerencia General</Text>
          </View>
        </View>

        {/* QR Code */}
        <View style={styles.qrSection}>
          {qrCodeDataUrl ? (
            <Image src={qrCodeDataUrl} style={{ width: 80, height: 80 }} />
          ) : (
            <View style={styles.qrPlaceholder} />
          )}
          <Text style={styles.qrLabel}>Escanear para verificar</Text>
        </View>

        {/* Footer with verification code */}
        <View style={styles.footer}>
          <Text style={styles.verificationCode}>
            Código de verificación: {certificate.verification_code}
          </Text>
          <Text style={styles.verificationUrl}>
            {getVerificationUrl(certificate.verification_code)}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

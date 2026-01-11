import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../../components/ui/Icon'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío - aquí conectarías con tu backend
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[300px] lg:h-[400px] bg-gray-400">
        <div className="absolute inset-0 bg-brand-navy/80" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-in-left">
              Contacto
            </h1>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-brand hover:underline">Inicio</Link>
            <Icon name="chevron_right" size="xs" className="text-gray-400" />
            <span className="text-gray-600">Contacto</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
                Envíanos un mensaje
              </h2>
              <div className="w-16 h-1 bg-brand mb-6" />
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="check_circle" size="xl" className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-green-700">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                        placeholder="999 999 999"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Servicio de interés
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors bg-white"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="saneamiento">Saneamiento Ambiental</option>
                      <option value="seguridad">Seguridad Integral</option>
                      <option value="capacitacion">Capacitación y Entrenamiento</option>
                      <option value="limpieza">Limpieza de Ambientes</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors resize-none"
                      placeholder="Cuéntanos en qué podemos ayudarte..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Icon name="send" size="sm" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-brand text-2xl lg:text-3xl font-bold mb-4">
                Información de contacto
              </h2>
              <div className="w-16 h-1 bg-brand mb-6" />

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="phone" className="text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">Teléfonos</h3>
                    <p className="text-gray-600">
                      <a href="tel:+5117646953" className="hover:text-brand">(01) 764 6953</a>
                    </p>
                    <p className="text-gray-600">
                      <a href="tel:+51986536939" className="hover:text-brand">986 536 939</a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="chat" className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">WhatsApp</h3>
                    <a
                      href="https://wa.me/51999925132"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      999 925 132
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Respuesta inmediata</p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="schedule" className="text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">Horario de atención</h3>
                    <p className="text-gray-600">Lunes a Sábado</p>
                    <p className="text-gray-600">9:00 a.m. - 7:00 p.m.</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="location_on" className="text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy mb-1">Ubicación</h3>
                    <p className="text-gray-600">Lima, Perú</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-bold text-brand-navy mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/people/FORCE-PER%C3%9A/100091540102786/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/51999925132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.9661244789773!2d-77.03654032395882!3d-12.046373541443892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d35662c7%3A0x15f0f2ef5f3ad3d!2sLima!5e0!3m2!1sen!2spe!4v1704903600000!5m2!1sen!2spe"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Force Perú SAC"
        />
      </section>
    </div>
  )
}

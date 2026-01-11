import { Link } from 'react-router-dom'

interface ServiceCardProps {
  title: string
  description: string
  image: string
  href: string
  delay?: number
}

export function ServiceCard({ title, description, image, href, delay = 0 }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className="group block bg-white rounded-xl overflow-hidden shadow-lg card-hover"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start gap-2 mb-2">
          <div className="w-1 h-8 bg-brand rounded-full" />
          <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand transition-colors">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block leading-tight">
                {word}
              </span>
            ))}
          </h3>
        </div>
        <p className="text-gray-600 text-sm line-clamp-3">
          {description}
        </p>
        <div className="mt-4 flex items-center text-brand font-medium text-sm group-hover:translate-x-2 transition-transform">
          Ver más
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

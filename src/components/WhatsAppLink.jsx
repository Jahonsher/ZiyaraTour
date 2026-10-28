import site from '../data/site.json'

export const whatsappUrl = `https://wa.me/${site.contact.phone.replace(/\D/g, '')}`

export function WhatsAppIcon({ size = 18, className = '' }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 text-[#25D366] ${className}`}>
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.47 0 .12 5.35.12 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.26-1.64a11.9 11.9 0 0 0 5.79 1.48h.01c6.58 0 11.93-5.35 11.94-11.93a11.85 11.85 0 0 0-3.48-8.43ZM12.06 21.8a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.83 9.83 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.45-4.45 9.89-9.91 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.3 1.27.49 1.7.63.71.22 1.36.19 1.87.11.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.08-.12-.28-.19-.58-.34Z" />
    </svg>
  )
}

export default function WhatsAppLink({ className = '', iconSize = 18, showIcon = true }) {
  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
      aria-label={`WhatsApp: ${site.contact.phone}`} title="WhatsApp"
      className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && <WhatsAppIcon size={iconSize} />}
      <span>{site.contact.phone}</span>
    </a>
  )
}

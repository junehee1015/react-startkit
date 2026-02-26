import { Link } from '@tanstack/react-router'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500">© {currentYear} React Startkit. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-gray-900 transition-colors">
            이용약관
          </Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  )
}

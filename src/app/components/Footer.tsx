import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-md border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-gray-300">STRategy is your all-in-one platform for optimizing, growing, and retaining your short-term rental business.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link href="/management" className="text-gray-300 hover:text-white">Management</Link></li>
              <li><Link href="/report" className="text-gray-300 hover:text-white">Reports</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-300">Email: info@strategy.com</p>
            <p className="text-gray-300">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                Twitter
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                LinkedIn
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                Facebook
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-center text-gray-300">&copy; {new Date().getFullYear()} STRategy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 
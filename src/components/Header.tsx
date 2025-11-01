/**
 * Header Component
 *
 * Global header with branding and navigation.
 * Minimal and clean design following Japanese aesthetics.
 */

export default function Header() {
  return (
    <header className="border-b border-sumi-100 bg-white/80 backdrop-blur-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ai-600">
              <span className="font-serif text-xl font-bold text-white">九</span>
            </div>
            <div>
              <h1 className="mb-0 font-serif text-lg font-medium leading-tight text-sumi-900">
                Nine Star Ki
              </h1>
              <p className="text-xs text-sumi-500">Solar Calendar Calculator</p>
            </div>
          </div>

          {/* Navigation - reserved for future enhancements */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {/* Future: Add navigation links as needed */}
          </nav>
        </div>
      </div>
    </header>
  )
}

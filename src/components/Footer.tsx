/**
 * Footer Component
 *
 * Global footer with copyright and additional information.
 * Minimal and understated.
 */

export default function Footer() {
  return (
    <footer className="border-t border-sumi-100 bg-white/50">
      <div className="container-custom py-8">
        <div className="flex flex-col items-center space-y-4 text-center md:flex-row md:justify-between md:space-y-0">
          {/* Links - reserved for future enhancements */}
          <div className="flex space-x-6">
            {/* Future: Add footer links as needed */}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-sumi-400">
            Nine Star Ki calculations are based on the solar calendar and traditional Eastern
            astrological principles.
          </p>
        </div>
      </div>
    </footer>
  )
}

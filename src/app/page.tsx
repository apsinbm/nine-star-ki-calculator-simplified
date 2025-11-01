/**
 * Home Page Component
 *
 * The main landing and calculation page for the Nine Star Ki Calculator.
 * Features a clean, Japanese-inspired design with the calculation form.
 */

import Calculator from '@/components/Calculator'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="container-custom flex-1 py-12 md:py-20">
        {/* Introduction section */}
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance font-serif text-4xl font-medium tracking-tight text-sumi-900 md:text-5xl">
            Nine Star Ki Calculator
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sumi-600">
            Discover your unique Nine Star Ki profile based on the solar calendar. Learn your
            year star, month star, and energetic star to gain insights into your inherent
            characteristics and life path.
          </p>
        </section>

        {/* Calculator component */}
        <section className="mx-auto mt-12 max-w-2xl md:mt-16">
          <Calculator />
        </section>

        {/* Information section */}
        <section className="mx-auto mt-16 max-w-3xl md:mt-24">
          <div className="card">
            <h2 className="mb-4 font-serif text-2xl font-medium text-sumi-900">
              About Nine Star Ki
            </h2>
            <div className="stack-y text-sumi-600">
              <p>
                Nine Star Ki (九星気学) is a Japanese system of astrology based on the Chinese
                theory of the Five Elements and the Nine Stars. It uses your birth date to
                determine three key stars that influence your personality and life path.
              </p>
              <p>
                Unlike Western astrology, Nine Star Ki follows the{' '}
                <span className="font-medium text-sumi-800">solar calendar</span>, which begins
                around <span className="font-medium text-sumi-800">Li Chun (立春)</span> in early
                February each year. This ensures calculations are aligned with the natural cycles
                of the sun.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-sumi-50 p-4">
                  <h3 className="mb-2 font-serif text-lg font-medium text-sumi-900">
                    Year Star
                  </h3>
                  <p className="text-sm text-sumi-600">
                    Your main character and outward personality
                  </p>
                </div>
                <div className="rounded-lg bg-sumi-50 p-4">
                  <h3 className="mb-2 font-serif text-lg font-medium text-sumi-900">
                    Month Star
                  </h3>
                  <p className="text-sm text-sumi-600">Your inner nature and emotional tendencies</p>
                </div>
                <div className="rounded-lg bg-sumi-50 p-4">
                  <h3 className="mb-2 font-serif text-lg font-medium text-sumi-900">
                    Energetic Star
                  </h3>
                  <p className="text-sm text-sumi-600">Your energy expression and actions</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

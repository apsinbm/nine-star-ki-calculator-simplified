/**
 * Educational Modal Component
 *
 * Provides expandable educational content about Nine Star Ki calculations,
 * solar terms, and why timing matters.
 */

'use client'

interface EducationalModalProps {
  isOpen: boolean
  onClose: () => void
  topic: 'why-time-matters' | 'time-sensitivity' | 'hemisphere' | 'boundary'
}

export default function EducationalModal({ isOpen, onClose, topic }: EducationalModalProps) {
  if (!isOpen) return null

  const content = {
    'why-time-matters': {
      title: 'Why Does Birth Time Matter?',
      sections: [
        {
          heading: 'Solar Calendar vs Regular Calendar',
          content: (
            <>
              <p className="mb-3">
                Nine Star Ki uses the <strong>solar calendar</strong>, not the Gregorian calendar you see
                on your wall. The solar year begins at <strong>Li Chun</strong> (Start of Spring), which
                occurs around February 4th each year, not January 1st.
              </p>
              <p className="mb-3">
                Similarly, solar months begin with specific solar terms, not on the 1st of each month.
                These solar terms mark the Earth&apos;s position in its orbit around the Sun.
              </p>
            </>
          ),
        },
        {
          heading: 'It&apos;s About MOMENTS, Not Dates',
          content: (
            <>
              <p className="mb-3">
                <strong>Example:</strong> Li Chun in 1986 occurred at <strong>2:50 AM UTC</strong> on
                February 4th.
              </p>
              <ul className="mb-3 ml-6 list-disc space-y-1 text-sm">
                <li>Born at 1:50 AM (1 hour before): Principal Star = 6</li>
                <li>Born at 3:50 AM (1 hour after): Principal Star = 5</li>
              </ul>
              <p className="mb-3">
                A single hour can change your principal star entirely! This is why birth time matters
                when you&apos;re near a boundary.
              </p>
            </>
          ),
        },
        {
          heading: 'When to Care About Exact Time',
          content: (
            <>
              <p className="mb-3">
                If you were born in the middle of a month, far from any solar term, your exact birth time
                doesn&apos;t matter much. But if you were born within 24-72 hours of a solar term, time precision
                becomes critical.
              </p>
              <p className="rounded-lg bg-ai-50 p-3 text-sm">
                <strong>Key Point:</strong> Most people (80%+) are NOT near boundaries and don&apos;t need to
                worry about exact birth time. The calculator will warn you if you are near a boundary.
              </p>
            </>
          ),
        },
      ],
    },
    'time-sensitivity': {
      title: 'When Is Time Most Critical?',
      sections: [
        {
          heading: 'Sensitivity Levels',
          content: (
            <>
              <div className="mb-4 rounded-lg border-2 border-shu-300 bg-shu-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-shu-600"></div>
                  <strong className="text-shu-900">HIGH SENSITIVITY</strong>
                </div>
                <p className="text-sm text-shu-800">
                  Within 24 hours of any solar term. Time precision matters significantly. A few hours can
                  change your stars.
                </p>
              </div>

              <div className="mb-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
                  <strong className="text-yellow-900">MEDIUM SENSITIVITY</strong>
                </div>
                <p className="text-sm text-yellow-800">
                  1-3 days from a solar term. Time still matters, but less critically. Verify your birth time
                  if possible.
                </p>
              </div>

              <div className="mb-4 rounded-lg border-2 border-green-300 bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-600"></div>
                  <strong className="text-green-900">LOW SENSITIVITY</strong>
                </div>
                <p className="text-sm text-green-800">
                  7+ days from any solar term. Your birth time is not critical for accuracy. The default noon
                  time is fine.
                </p>
              </div>
            </>
          ),
        },
        {
          heading: 'Why These Windows?',
          content: (
            <>
              <p className="mb-3">
                Solar terms are precise astronomical events that occur at specific moments. The Earth doesn&apos;t
                care about your local time zone or what your clock says. When a solar term occurs, it happens
                globally at the same instant.
              </p>
              <p className="mb-3">
                The closer your birth time is to that moment, the more important it is to know the exact time.
                This is why we calculate boundaries in hours and minutes, not just days.
              </p>
            </>
          ),
        },
      ],
    },
    'hemisphere': {
      title: 'Hemisphere Explanation',
      sections: [
        {
          heading: 'Does Southern Hemisphere Affect My Calculation?',
          content: (
            <>
              <p className="mb-3">
                <strong>Short answer: No.</strong> The Nine Star Ki system is based on the Earth&apos;s position
                around the Sun, not seasonal weather patterns.
              </p>
              <p className="mb-3">
                When it&apos;s &quot;spring&quot; at Li Chun (around Feb 4), that refers to <strong>astronomical spring</strong>
                in the Northern Hemisphere. But the calculation applies equally to people born anywhere on Earth,
                regardless of which hemisphere you&apos;re in.
              </p>
            </>
          ),
        },
        {
          heading: 'Why Northern Hemisphere Calendar?',
          content: (
            <>
              <p className="mb-3">
                The Chinese solar calendar originated in China (Northern Hemisphere), so the seasonal names
                reflect Northern Hemisphere seasons. However, these are just labels. The actual calculations
                are based on:
              </p>
              <ul className="mb-3 ml-6 list-disc space-y-1 text-sm">
                <li>The Earth&apos;s orbital position around the Sun</li>
                <li>Solar longitude (astronomical measurements)</li>
                <li>Universal Time Coordinates (UTC)</li>
              </ul>
              <p className="mb-3">
                These are universal and apply equally everywhere on Earth.
              </p>
            </>
          ),
        },
        {
          heading: 'Local Time Still Matters',
          content: (
            <>
              <p className="mb-3">
                While the solar terms are universal, we do use your <strong>local time zone</strong> to
                determine exactly when the solar term occurred in your location. This ensures accurate
                boundary checking.
              </p>
              <p className="rounded-lg bg-ai-50 p-3 text-sm">
                <strong>Example:</strong> If Li Chun occurred at 16:00 UTC on Feb 4, 2020, that would be:
              </p>
              <ul className="ml-6 mt-2 list-disc space-y-1 text-sm">
                <li>11:00 AM in New York (EST)</li>
                <li>4:00 PM in London (GMT)</li>
                <li>1:00 AM on Feb 5 in Tokyo (JST)</li>
              </ul>
            </>
          ),
        },
      ],
    },
    'boundary': {
      title: 'About Solar Term Boundaries',
      sections: [
        {
          heading: 'What is Li Chun?',
          content: (
            <>
              <p className="mb-3">
                <strong>Li Chun (立春, &quot;Start of Spring&quot;)</strong> marks the beginning of the solar year
                in the Chinese calendar. It occurs around February 4, but the exact date and time varies
                each year.
              </p>
              <p className="mb-3">
                <strong>Important:</strong> Li Chun is NOT the same as:
              </p>
              <ul className="mb-3 ml-6 list-disc space-y-1 text-sm">
                <li>January 1 (Gregorian New Year)</li>
                <li>Chinese Lunar New Year (varies each year, usually late January to mid-February)</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Solar Year vs Gregorian Year',
          content: (
            <>
              <p className="mb-3">
                If you were born between January 1 and Li Chun, your solar year is the PREVIOUS calendar year.
              </p>
              <div className="rounded-lg bg-ai-50 p-4">
                <p className="mb-2 font-semibold">Example:</p>
                <p className="mb-2 text-sm">Born: January 15, 1990</p>
                <p className="mb-2 text-sm">Li Chun 1990: February 4, 1990</p>
                <p className="text-sm">
                  Solar Year: <strong>1989</strong> (because Jan 15 is before Li Chun)
                </p>
              </div>
            </>
          ),
        },
        {
          heading: 'Solar Months',
          content: (
            <>
              <p className="mb-3">
                Similarly, each solar month begins with one of the 24 solar terms, typically around the
                5th-8th of each Gregorian month. If you were born very close to these boundaries, your
                exact birth time matters for accurate month star calculation.
              </p>
              <p className="text-sm text-sumi-600">
                The calculator will warn you if you&apos;re near any boundary and show exactly how many hours
                and minutes you were from that boundary.
              </p>
            </>
          ),
        },
      ],
    },
  }

  const currentContent = content[topic]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="card max-h-[90vh] max-w-3xl overflow-y-auto">
        <div className="sticky top-0 mb-6 flex items-start justify-between border-b border-sumi-100 bg-white pb-4">
          <h3 className="font-serif text-2xl font-semibold text-sumi-900">
            {currentContent.title}
          </h3>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-sumi-400 transition-colors hover:text-sumi-600"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <div key={index}>
              <h4 className="mb-3 text-lg font-semibold text-sumi-800">
                {section.heading}
              </h4>
              <div className="text-sm text-sumi-700">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="btn-primary mt-8 w-full"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}

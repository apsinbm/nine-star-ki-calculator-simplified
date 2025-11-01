/**
 * Birth Chart PDF Export Component
 *
 * Generates a downloadable PDF with:
 * - Three-star profile display
 * - Birth information with timezone
 * - Confidence indicator
 * - Solar term timeline image
 * - Educational notes
 *
 * Uses html2pdf library for client-side PDF generation
 */

'use client'

import { useRef, useState } from 'react'
import type { NineStarKiProfile } from '@/types'
import { getStarMetadata } from '@/lib/data'
import { formatDate } from '@/lib/utils/date-utils'
import { getYearConfidenceLevel, getSolarTermsConfidence } from '@/lib/data/solar-terms-data'

interface BirthChartPDFProps {
  profile: NineStarKiProfile
  birthDate: string
  birthTime: string
  timezone: string
}

export default function BirthChartPDF({ profile, birthDate, birthTime, timezone }: BirthChartPDFProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const yearStarMeta = getStarMetadata(profile.yearStar)
  const monthStarMeta = getStarMetadata(profile.monthStar)
  const energeticStarMeta = getStarMetadata(profile.energeticStar)

  const solarYear = profile.solarYearStart.getFullYear()
  const gregorianYear = profile.birthDate.getFullYear()
  const confidence = getYearConfidenceLevel(solarYear)
  const warning = getSolarTermsConfidence(solarYear)

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true)

      // Dynamically import html2pdf to avoid build issues
      const html2pdf = (await import('html2pdf.js')).default

      if (!contentRef.current) {
        throw new Error('PDF content reference not found')
      }

      // Create a clone to avoid modifying the DOM
      const clonedContent = contentRef.current.cloneNode(true) as HTMLElement

      const opt = {
        margin: 10,
        filename: `NineStarKi_BirthChart_${birthDate}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
      }

      // Generate and download PDF
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (html2pdf() as any).set(opt).from(clonedContent).save()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF'
      console.error('PDF generation error:', errorMessage)
      // Show user-friendly error message
      alert(`Could not generate PDF: ${errorMessage}. Please try again.`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <button
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        className="inline-flex items-center gap-2 rounded-lg bg-ai-600 px-4 py-2 font-medium text-white transition-colors hover:bg-ai-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        {isGenerating ? 'Generating PDF...' : 'Download Birth Chart'}
      </button>

      {/* Hidden PDF Content */}
      <div
        ref={contentRef}
        className="absolute -left-[9999px] space-y-6 bg-white p-12 text-sumi-900"
        style={{ width: '210mm', minHeight: '297mm' }}
      >
        {/* Header */}
        <div className="border-b-2 border-sumi-200 pb-6 text-center">
          <h1 className="mb-2 font-serif text-4xl font-bold">Nine Star Ki Birth Chart</h1>
          <p className="text-sm text-sumi-600">Your Personal Astrological Profile</p>
        </div>

        {/* Birth Information */}
        <div className="rounded-lg bg-sumi-50 p-6">
          <h2 className="mb-4 font-serif text-2xl font-semibold">Birth Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-sumi-600">Birth Date</p>
              <p className="text-lg">{formatDate(profile.birthDate, 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-sumi-600">Birth Time</p>
              <p className="text-lg">{birthTime || 'Not provided (12:00 noon used)'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-sumi-600">Timezone</p>
              <p className="text-lg">{timezone}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-sumi-600">Solar Year</p>
              <p className="text-lg">
                {solarYear}
                {solarYear !== gregorianYear && ` (Gregorian: ${gregorianYear})`}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-sumi-600">Li Chun Date</p>
              <p className="text-lg">{formatDate(profile.solarYearStart, 'MMMM d, yyyy')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-sumi-600">Data Confidence</p>
              <p className="text-lg capitalize">{confidence}</p>
            </div>
          </div>

          {warning.hasWarning && warning.message && (
            <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-3">
              <p className="text-xs font-semibold text-amber-900">Note:</p>
              <p className="mt-1 text-xs text-amber-800">{warning.message}</p>
            </div>
          )}
        </div>

        {/* Three Stars Profile */}
        <div>
          <h2 className="mb-4 font-serif text-2xl font-semibold">Your Three Stars</h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Principal Star */}
            <div className="rounded-lg border-2 border-sumi-200 p-6 text-center">
              <div
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
                style={{ backgroundColor: yearStarMeta.color }}
              >
                <span className="font-serif text-5xl font-bold text-white">{profile.yearStar}</span>
              </div>
              <h3 className="mb-2 font-semibold">Principal Star</h3>
              <p className="mb-2 text-xs text-sumi-600">本命星</p>
              <p className="text-sm font-medium text-sumi-700">{yearStarMeta.element}</p>
              <p className="text-xs text-sumi-600">{yearStarMeta.polarity}</p>
              <p className="mt-3 text-xs leading-relaxed text-sumi-700">
                {yearStarMeta.description.split('.')[0]}.
              </p>
            </div>

            {/* Month Star */}
            <div className="rounded-lg border-2 border-sumi-200 p-6 text-center">
              <div
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
                style={{ backgroundColor: monthStarMeta.color }}
              >
                <span className="font-serif text-5xl font-bold text-white">{profile.monthStar}</span>
              </div>
              <h3 className="mb-2 font-semibold">Month Star</h3>
              <p className="mb-2 text-xs text-sumi-600">月命星</p>
              <p className="text-sm font-medium text-sumi-700">{monthStarMeta.element}</p>
              <p className="text-xs text-sumi-600">{monthStarMeta.polarity}</p>
              <p className="mt-3 text-xs leading-relaxed text-sumi-700">
                {monthStarMeta.description.split('.')[0]}.
              </p>
            </div>

            {/* Energetic Star */}
            <div className="rounded-lg border-2 border-sumi-200 p-6 text-center">
              <div
                className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full"
                style={{ backgroundColor: energeticStarMeta.color }}
              >
                <span className="font-serif text-5xl font-bold text-white">{profile.energeticStar}</span>
              </div>
              <h3 className="mb-2 font-semibold">Energetic Star</h3>
              <p className="mb-2 text-xs text-sumi-600">日干支星</p>
              <p className="text-sm font-medium text-sumi-700">{energeticStarMeta.element}</p>
              <p className="text-xs text-sumi-600">{energeticStarMeta.polarity}</p>
              <p className="mt-3 text-xs leading-relaxed text-sumi-700">
                {energeticStarMeta.description.split('.')[0]}.
              </p>
            </div>
          </div>
        </div>

        {/* Star Meanings */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">Understanding Your Stars</h2>

          <div className="rounded-lg border border-sumi-200 p-4">
            <h3 className="mb-2 font-semibold text-sumi-800">Principal Star (本命星)</h3>
            <p className="text-sm text-sumi-700">
              Your outward personality and the way you present yourself to the world. This is your primary star determined by your solar birth year. It represents your core character and natural talents.
            </p>
          </div>

          <div className="rounded-lg border border-sumi-200 p-4">
            <h3 className="mb-2 font-semibold text-sumi-800">Month Star (月命星)</h3>
            <p className="text-sm text-sumi-700">
              Your emotional tendencies, inner world, and how you process feelings and relationships. Determined by your solar birth month. It reveals your emotional nature and relationship patterns.
            </p>
          </div>

          <div className="rounded-lg border border-sumi-200 p-4">
            <h3 className="mb-2 font-semibold text-sumi-800">Energetic Star</h3>
            <p className="text-sm text-sumi-700">
              How you express your energy, take action, and engage with life&apos;s challenges. Derived from your principal and month stars. It represents your action-oriented nature and how you move through the world.
            </p>
          </div>
        </div>

        {/* About Solar Calendar */}
        <div className="border-t-2 border-sumi-200 pt-6">
          <h2 className="mb-4 font-serif text-2xl font-semibold">About the Solar Calendar</h2>
          <div className="space-y-3 text-sm text-sumi-700">
            <p>
              Nine Star Ki uses the traditional solar calendar (Jieqi calendar), where the year begins at Li Chun (Start of Spring, around February 4), not January 1&apos;st.
              This system is based on astronomical observations of Earth&apos;s position around the Sun.
            </p>
            <p>
              Your solar year may differ from your Gregorian calendar year if you were born between January 1 and the Li Chun date.
              The calculation uses the Li Chun date to determine your principal star and subsequent calculations.
            </p>
            <p>
              Birth time precision is important for dates near solar term boundaries (within 2-3 days of Li Chun or other solar terms).
              For most people born 7 or more days away from a boundary, minute precision is sufficient.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-sumi-200 pt-6 text-center">
          <p className="text-xs text-sumi-500">
            Generated on {formatDate(new Date(), 'MMMM d, yyyy')} via Nine Star Ki Calculator
          </p>
          <p className="mt-2 text-xs text-sumi-400">
            This chart is based on astronomical calculations and traditional methods. It is provided for entertainment and educational purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}

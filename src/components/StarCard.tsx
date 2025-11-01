/**
 * Star Card Component
 *
 * Displays information about a single star (year, month, or energetic)
 * with beautiful visual styling inspired by Japanese design.
 *
 * Enhanced with educational tooltips for elements, polarity, and trigrams.
 */

'use client'

import { useState } from 'react'
import type { StarMetadata } from '@/types'

interface StarCardProps {
  star: StarMetadata
  title: string
  subtitle: string
  description: string
  isPrimary?: boolean
}

// Educational content for tooltips
const TOOLTIPS = {
  element: {
    Water: 'Water represents wisdom, depth, and adaptability. It flows and finds its way, symbolizing flexibility and intuition.',
    Earth: 'Earth represents stability, nurturing, and grounding. It provides foundation and support for growth.',
    Wood: 'Wood represents growth, expansion, and vitality. It symbolizes new beginnings and upward movement.',
    Fire: 'Fire represents illumination, passion, and transformation. It brings clarity and warmth.',
    Metal: 'Metal represents structure, refinement, and determination. It symbolizes strength and precision.',
  },
  polarity: {
    Yang: 'Yang energy is active, outward-focused, and dynamic. It represents the masculine principle of expansion.',
    Yin: 'Yin energy is receptive, inward-focused, and contemplative. It represents the feminine principle of consolidation.',
  },
  trigram: {
    Kan: 'Kan (☵) - Water trigram: Represents danger, depth, and the abyss. Associated with the middle son.',
    Kun: 'Kun (☷) - Earth trigram: Represents receptivity, devotion, and the mother principle.',
    Zhen: 'Zhen (☳) - Thunder trigram: Represents arousing energy, movement, and the eldest son.',
    Xun: 'Xun (☴) - Wind trigram: Represents gentle influence, penetration, and the eldest daughter.',
    Qian: 'Qian (☰) - Heaven trigram: Represents creativity, strength, and the father principle.',
    Dui: 'Dui (☱) - Lake trigram: Represents joy, pleasure, and the youngest daughter.',
    Gen: 'Gen (☶) - Mountain trigram: Represents stillness, stopping, and the youngest son.',
    Li: 'Li (☲) - Fire trigram: Represents clarity, beauty, and the middle daughter.',
  }
}

export default function StarCard({
  star,
  title,
  subtitle,
  description,
  isPrimary = false,
}: StarCardProps) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  return (
    <div
      className={`card flex flex-col ${isPrimary ? 'ring-2 ring-ai-200' : ''}`}
    >
      {/* Star number circle */}
      <div className="mb-4 flex justify-center">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full shadow-soft transition-transform hover:scale-105"
          style={{
            backgroundColor: star.color,
          }}
        >
          <span className="font-serif text-4xl font-bold text-white">{star.number}</span>
        </div>
      </div>

      {/* Title section */}
      <div className="mb-4 text-center">
        <h3 className="mb-1 font-serif text-xl font-medium text-sumi-900">{title}</h3>
        <p className="text-sm font-medium text-sumi-500">{subtitle}</p>
      </div>

      {/* Element and attributes with tooltips */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <div className="relative">
          <button
            className="badge bg-sumi-100 text-sumi-700 transition-colors hover:bg-sumi-200"
            onMouseEnter={() => setShowTooltip(`element-${star.number}`)}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setShowTooltip(showTooltip === `element-${star.number}` ? null : `element-${star.number}`)}
          >
            {star.element}
            <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showTooltip === `element-${star.number}` && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg bg-sumi-900 p-3 text-xs text-white shadow-lg">
              <p>{TOOLTIPS.element[star.element]}</p>
              <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-sumi-900" />
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="badge bg-sumi-100 text-sumi-700 transition-colors hover:bg-sumi-200"
            onMouseEnter={() => setShowTooltip(`polarity-${star.number}`)}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setShowTooltip(showTooltip === `polarity-${star.number}` ? null : `polarity-${star.number}`)}
          >
            {star.polarity}
            <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showTooltip === `polarity-${star.number}` && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg bg-sumi-900 p-3 text-xs text-white shadow-lg">
              <p>{TOOLTIPS.polarity[star.polarity]}</p>
              <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-sumi-900" />
            </div>
          )}
        </div>

        {star.trigram && (
          <div className="relative">
            <button
              className="badge bg-sumi-100 text-sumi-700 transition-colors hover:bg-sumi-200"
              onMouseEnter={() => setShowTooltip(`trigram-${star.number}`)}
              onMouseLeave={() => setShowTooltip(null)}
              onClick={() => setShowTooltip(showTooltip === `trigram-${star.number}` ? null : `trigram-${star.number}`)}
            >
              {star.trigram}
              <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {showTooltip === `trigram-${star.number}` && (
              <div className="absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-sumi-900 p-3 text-xs text-white shadow-lg">
                <p>{TOOLTIPS.trigram[star.trigram]}</p>
                <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-sumi-900" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Star description */}
      <div className="mb-4 text-center">
        <p className="text-sm font-medium text-sumi-800">{star.description}</p>
      </div>

      {/* Usage description */}
      <p className="mb-4 flex-1 text-center text-sm text-sumi-600">{description}</p>

      {/* Characteristics */}
      <div className="border-t border-sumi-100 pt-4">
        <p className="mb-2 text-center text-xs font-medium uppercase tracking-wide text-sumi-500">
          Key Traits
        </p>
        <ul className="space-y-1">
          {star.characteristics.map((trait, index) => (
            <li key={index} className="text-center text-sm text-sumi-700">
              {trait}
            </li>
          ))}
        </ul>
      </div>

      {/* Direction with tooltip */}
      <div className="mt-4 text-center">
        <div className="relative inline-block">
          <button
            className="text-xs text-sumi-400 hover:text-sumi-600"
            onMouseEnter={() => setShowTooltip(`direction-${star.number}`)}
            onMouseLeave={() => setShowTooltip(null)}
            onClick={() => setShowTooltip(showTooltip === `direction-${star.number}` ? null : `direction-${star.number}`)}
          >
            Direction: {star.direction}
            <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          {showTooltip === `direction-${star.number}` && (
            <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg bg-sumi-900 p-3 text-xs text-white shadow-lg">
              <p>Each star corresponds to a direction on the Lo Shu magic square, influencing energy flow and life aspects.</p>
              <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-sumi-900" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

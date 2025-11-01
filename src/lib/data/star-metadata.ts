/**
 * Star Metadata Database
 *
 * This file contains the core characteristics, elements, and attributes
 * for each of the nine stars in the Nine Star Ki system.
 *
 * Based on traditional Nine Star Ki teachings and verified sources.
 * Future enhancement: Add more detailed interpretations and cultural context.
 */

import type { StarMetadata, StarNumber } from '@/types'

/**
 * Complete metadata for all nine stars
 *
 * Each star has:
 * - Element (Water, Earth, Wood, Fire, Metal)
 * - Polarity (Yin/Yang)
 * - Trigram (Bagua symbol, except Star 5)
 * - Direction (cardinal/ordinal)
 * - Color (for UI representation)
 * - Description and characteristics
 */
export const STAR_METADATA: Record<StarNumber, StarMetadata> = {
  1: {
    number: 1,
    element: 'Water',
    polarity: 'Yang',
    trigram: 'Kan',
    direction: 'North',
    color: '#1e40af', // Deep blue (ai-800)
    description: 'Water Star - Depth and Flow',
    characteristics: [
      'Adaptable and flowing',
      'Deep thinker',
      'Intuitive nature',
    ],
    keywords: ['wisdom', 'depth', 'flexibility'],
  },
  2: {
    number: 2,
    element: 'Earth',
    polarity: 'Yin',
    trigram: 'Kun',
    direction: 'Southwest',
    color: '#78716c', // Earth tone (cha-500)
    description: 'Soil/Earth Star - Nurturing Foundation',
    characteristics: [
      'Nurturing and supportive',
      'Patient and steady',
      'Service-oriented',
    ],
    keywords: ['receptivity', 'nurture', 'devotion'],
  },
  3: {
    number: 3,
    element: 'Wood',
    polarity: 'Yang',
    trigram: 'Zhen',
    direction: 'East',
    color: '#059669', // Green
    description: 'Thunder/Wood Star - Growth and Action',
    characteristics: [
      'Dynamic and energetic',
      'Pioneer spirit',
      'Quick to act',
    ],
    keywords: ['growth', 'initiative', 'vitality'],
  },
  4: {
    number: 4,
    element: 'Wood',
    polarity: 'Yin',
    trigram: 'Xun',
    direction: 'Southeast',
    color: '#10b981', // Lighter green
    description: 'Wind/Wood Star - Gentle Influence',
    characteristics: [
      'Gentle and persistent',
      'Communicative',
      'Adaptable',
    ],
    keywords: ['communication', 'flexibility', 'influence'],
  },
  5: {
    number: 5,
    element: 'Earth',
    polarity: 'Yang',
    trigram: null, // Center has no trigram
    direction: 'Center',
    color: '#ca8a04', // Golden earth (yellow-600)
    description: 'Central Earth Star - Power and Transformation',
    characteristics: [
      'Powerful presence',
      'Transformative',
      'Central focus',
    ],
    keywords: ['power', 'transformation', 'control'],
  },
  6: {
    number: 6,
    element: 'Metal',
    polarity: 'Yang',
    trigram: 'Qian',
    direction: 'Northwest',
    color: '#71717a', // Silver/metal (zinc-500)
    description: 'Heaven/Metal Star - Leadership and Authority',
    characteristics: [
      'Natural leader',
      'Dignified',
      'Authoritative',
    ],
    keywords: ['leadership', 'dignity', 'heaven'],
  },
  7: {
    number: 7,
    element: 'Metal',
    polarity: 'Yin',
    trigram: 'Dui',
    direction: 'West',
    color: '#a1a1aa', // Lighter metal (zinc-400)
    description: 'Lake/Metal Star - Joy and Expression',
    characteristics: [
      'Joyful expression',
      'Social and charming',
      'Creative',
    ],
    keywords: ['joy', 'pleasure', 'expression'],
  },
  8: {
    number: 8,
    element: 'Earth',
    polarity: 'Yang',
    trigram: 'Gen',
    direction: 'Northeast',
    color: '#57534e', // Mountain earth (cha-600)
    description: 'Mountain/Earth Star - Stillness and Contemplation',
    characteristics: [
      'Still and contemplative',
      'Self-disciplined',
      'Introspective',
    ],
    keywords: ['stillness', 'introspection', 'completion'],
  },
  9: {
    number: 9,
    element: 'Fire',
    polarity: 'Yin',
    trigram: 'Li',
    direction: 'South',
    color: '#dc2626', // Fire red (shu-600)
    description: 'Fire Star - Illumination and Clarity',
    characteristics: [
      'Bright and illuminating',
      'Passionate',
      'Clear vision',
    ],
    keywords: ['illumination', 'passion', 'clarity'],
  },
}

/**
 * Get metadata for a specific star number
 */
export function getStarMetadata(star: StarNumber): StarMetadata {
  return STAR_METADATA[star]
}

/**
 * Get all stars of a specific element
 */
export function getStarsByElement(element: StarMetadata['element']): StarMetadata[] {
  return Object.values(STAR_METADATA).filter((star) => star.element === element)
}

/**
 * Get all stars of a specific polarity
 */
export function getStarsByPolarity(polarity: StarMetadata['polarity']): StarMetadata[] {
  return Object.values(STAR_METADATA).filter((star) => star.polarity === polarity)
}

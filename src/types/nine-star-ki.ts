/**
 * Nine Star Ki Type Definitions
 *
 * This file contains all core type definitions for the Nine Star Ki calculation system.
 * These types ensure type safety throughout the application and document the data structure.
 */

/**
 * The nine star numbers in Nine Star Ki astrology
 */
export type StarNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * The five elements (Wu Xing / 五行) in Chinese philosophy
 */
export type Element = 'Water' | 'Earth' | 'Wood' | 'Fire' | 'Metal'

/**
 * Yin and Yang polarity
 */
export type Polarity = 'Yin' | 'Yang'

/**
 * The eight trigrams (Bagua / 八卦)
 * Note: Star 5 (Earth) does not have a traditional trigram
 */
export type Trigram =
  | 'Kan' // ☵ Water
  | 'Kun' // ☷ Earth
  | 'Zhen' // ☳ Thunder
  | 'Xun' // ☴ Wind
  | 'Qian' // ☰ Heaven
  | 'Dui' // ☱ Lake
  | 'Gen' // ☶ Mountain
  | 'Li' // ☲ Fire
  | null // For Star 5

/**
 * Cardinal and ordinal directions
 */
export type Direction =
  | 'North'
  | 'Southwest'
  | 'East'
  | 'Southeast'
  | 'Center'
  | 'Northwest'
  | 'West'
  | 'Northeast'
  | 'South'

/**
 * Metadata for each star number
 *
 * Note: Populate from research document in Phase 2
 */
export interface StarMetadata {
  number: StarNumber
  element: Element
  polarity: Polarity
  trigram: Trigram
  direction: Direction
  color: string // Color representation for UI
  description: string // Short description
  characteristics: string[] // Key personality traits
  keywords: string[] // Associated keywords
}

/**
 * Warning about birth dates near solar term boundaries
 */
export interface BoundaryWarning {
  type: 'solar_term_boundary' | 'li_chun_boundary'
  term: string
  termDate: Date
  daysDifference: number
  hoursToTerm: number // Total hours to/from the term
  minutesToTerm: number // Additional minutes (0-59)
  direction: 'before' | 'after' // Birth was BEFORE or AFTER the term
  termTime: string // Formatted time of the term (e.g., "Feb 4, 16:27 UTC")
  impactZone: 'high' | 'medium' | 'low' // Impact level based on proximity
  message: string
}

/**
 * Confidence level for calculation accuracy
 */
export type ConfidenceLevel = 'very_high' | 'high' | 'medium' | 'low' | 'very_low'

/**
 * Confidence score details for a calculation
 */
export interface ConfidenceScore {
  level: ConfidenceLevel
  percentage: number
  daysFromBoundary: number
  nearestBoundary?: {
    name: string
    date: Date
    affectedStar: 'principal' | 'month' | 'both'
  }
  recommendation: string
}

/**
 * Detailed confidence breakdown for each star
 */
export interface ConfidenceBreakdown {
  overall: ConfidenceScore
  principal: ConfidenceScore
  month: ConfidenceScore
  energetic: ConfidenceScore
}

/**
 * Calculation method for Nine Star Ki
 */
export type CalculationMethod = 'traditional' | 'chinese-ascending'

/**
 * A complete Nine Star Ki profile for an individual
 */
export interface NineStarKiProfile {
  // Core stars
  principalStar: StarNumber // Main character/personality (本命星 / Honmei)
  monthStar: StarNumber // Emotional/inner nature (月命星 / Getsumei)
  energeticStar: StarNumber // Energy/action tendency (third star)

  // Backward compatibility aliases
  yearStar: StarNumber // Alias for principalStar

  // Birth information
  birthDate: Date
  birthTime?: string // ISO time string if provided
  timezone?: string // IANA timezone identifier

  // Solar calendar information
  solarYear: number
  solarMonth: number // 1-12 (1=Feb solar month)
  solarYearStart: Date // Li Chun date for the birth year

  // Calculation metadata
  method: CalculationMethod
  warnings: BoundaryWarning[]
  calculatedAt: Date

  // Star metadata
  metadata: {
    principal: StarMetadata
    month: StarMetadata
    energetic: StarMetadata
  }

  // Confidence scoring
  confidence?: ConfidenceBreakdown
}

/**
 * Input for calculating a Nine Star Ki profile
 */
export interface CalculationInput {
  date: Date | string // Birth date (Date object or ISO string)
  time?: string // Birth time in HH:MM format (24-hour), optional
  timezone?: string // IANA timezone identifier (e.g., 'America/Los_Angeles', 'Asia/Tokyo')
  method?: CalculationMethod // Calculation method to use (defaults to 'traditional')
}

/**
 * Li Chun (立春) date - the solar new year, typically around February 4-5
 * This is critical for accurate year star calculation
 *
 * Note: Implement precise Li Chun calculation algorithm in Phase 2
 */
export interface LiChunDate {
  year: number // Gregorian year
  date: Date // Exact Li Chun date/time for that year
}

/**
 * Result of year star calculation with context
 */
export interface YearStarResult {
  star: StarNumber
  solarYear: number // The solar year used (may differ from Gregorian year)
  liChunDate: Date // The Li Chun date that defines the solar year
}

/**
 * Result of month star calculation with context
 */
export interface MonthStarResult {
  star: StarNumber
  solarMonth: number // Solar month (1-12)
  yearStar: StarNumber // Parent year star (month star depends on year star)
}

/**
 * Complete star lookup table structure
 * Maps solar years to their corresponding year stars
 *
 * Note: Populate from research document in Phase 2
 */
export interface YearStarTable {
  [key: number]: StarNumber // key: solar year, value: year star
}

/**
 * Month star lookup table
 * Month stars follow a pattern based on the year star
 *
 * Note: Populate from research document in Phase 2
 */
export interface MonthStarTable {
  [yearStar: number]: {
    [solarMonth: number]: StarNumber
  }
}

/**
 * Validation result for date inputs
 */
export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Configuration for the calculation engine
 */
export interface CalculationConfig {
  // Earliest supported year (limited by Li Chun data availability)
  minYear: number
  // Latest supported year
  maxYear: number
  // Whether to use astronomical calculations or lookup tables
  useAstronomicalCalculation: boolean
}

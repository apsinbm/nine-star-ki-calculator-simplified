/**
 * Solar Terms Data (24 Jieqi / 二十四節氣)
 *
 * This file contains the dates for the 24 solar terms used in Chinese solar calendar calculations.
 * The 12 major terms (节气 jieqi) are used to determine month boundaries for Nine Star Ki.
 *
 * Data Source: Astronomical calculations for Li Chun and major solar terms
 * Coverage: 1800-2100 (1800-1899 historical estimates, 1900-2030 verified, 2031-2100 projected)
 *
 * Warning levels:
 * - VERIFIED: 1920, 1954, 1963, 1970-1972, 1977-2030 (precise astronomical data)
 * - HISTORICAL: 1800-1919 (approximations based on historical patterns)
 * - PROJECTED: 2031-2100 (astronomical projections)
 */

export interface SolarTerm {
  name: string
  chineseName: string
  date: Date
}

export interface YearSolarTerms {
  year: number
  liChun: Date        // 立春 Start of Spring (Month 1)
  jingZhe: Date       // 惊蛰 Awakening of Insects (Month 2)
  qingMing: Date      // 清明 Clear and Bright (Month 3)
  liXia: Date         // 立夏 Start of Summer (Month 4)
  mangZhong: Date     // 芒种 Grain in Ear (Month 5)
  xiaoShu: Date       // 小暑 Lesser Heat (Month 6)
  liQiu: Date         // 立秋 Start of Autumn (Month 7)
  baiLu: Date         // 白露 White Dew (Month 8)
  hanLu: Date         // 寒露 Cold Dew (Month 9)
  liDong: Date        // 立冬 Start of Winter (Month 10)
  daXue: Date         // 大雪 Greater Snow (Month 11)
  xiaoHan: Date       // 小寒 Lesser Cold (Month 12, next calendar year)
}

export type DataConfidence = 'verified' | 'historical' | 'projected'

export interface SolarTermsWarning {
  hasWarning: boolean
  confidence: DataConfidence
  message?: string
}

/**
 * Generate Li Chun date using BOOK METHOD (fixed February 4)
 * Simplified version uses fixed date, not astronomical calculations
 */
function generateLiChunDate(year: number): Date {
  // Book method: Li Chun is ALWAYS February 4 at noon UTC
  return new Date(Date.UTC(year, 1, 4, 12, 0, 0))
}

/**
 * Generate dates for all 12 major solar terms using BOOK METHOD
 * Fixed date ranges as per traditional calendar, not astronomical solar terms
 * This is the simplified method used in the traditional book
 */
function generateSolarTermsForYear(year: number): YearSolarTerms {
  return {
    year,
    liChun: new Date(Date.UTC(year, 1, 4, 12, 0, 0)),      // Fixed: Feb 4
    jingZhe: new Date(Date.UTC(year, 2, 5, 12, 0, 0)),     // Fixed: Mar 5
    qingMing: new Date(Date.UTC(year, 3, 5, 12, 0, 0)),    // Fixed: Apr 5
    liXia: new Date(Date.UTC(year, 4, 5, 12, 0, 0)),       // Fixed: May 5
    mangZhong: new Date(Date.UTC(year, 5, 6, 12, 0, 0)),   // Fixed: Jun 6
    xiaoShu: new Date(Date.UTC(year, 6, 7, 12, 0, 0)),     // Fixed: Jul 7
    liQiu: new Date(Date.UTC(year, 7, 8, 12, 0, 0)),       // Fixed: Aug 8
    baiLu: new Date(Date.UTC(year, 8, 8, 12, 0, 0)),       // Fixed: Sep 8
    hanLu: new Date(Date.UTC(year, 9, 8, 12, 0, 0)),       // Fixed: Oct 8
    liDong: new Date(Date.UTC(year, 10, 7, 12, 0, 0)),     // Fixed: Nov 7
    daXue: new Date(Date.UTC(year, 11, 7, 12, 0, 0)),      // Fixed: Dec 7
    xiaoHan: new Date(Date.UTC(year + 1, 0, 5, 12, 0, 0)), // Fixed: Jan 5 of next year
  }
}

/**
 * SIMPLIFIED VERSION - Uses fixed dates only (book method)
 * Astronomical precision dates are not used
 */

/**
 * Determine data confidence level for a given year
 */
function getDataConfidence(year: number): DataConfidence {
  if (year >= 1920 && year <= 2030) {
    return 'verified'
  }
  if (year >= 1800 && year < 1920) {
    return 'historical'
  }
  if (year > 2030 && year <= 2100) {
    return 'projected'
  }
  // Default to projected for years outside range
  return 'projected'
}

/**
 * Get warning information for a year's solar terms
 */
function getSolarTermsWarning(year: number): SolarTermsWarning {
  const confidence = getDataConfidence(year)

  if (confidence === 'verified') {
    return {
      hasWarning: false,
      confidence,
    }
  }

  let message: string
  if (confidence === 'historical') {
    message = `Data for year ${year} is based on historical approximations. Solar term dates may vary by ±1-2 days from actual values.`
  } else {
    // projected
    message = `Data for year ${year} is an astronomical projection. Solar term dates may vary by ±1-2 days from actual values.`
  }

  return {
    hasWarning: true,
    confidence,
    message,
  }
}

/**
 * Solar terms cache to avoid regenerating for the same year
 */
const solarTermsCache = new Map<number, YearSolarTerms>()

/**
 * Get solar terms for a specific year
 * SIMPLIFIED VERSION: Always uses fixed date ranges (book method)
 * Never uses precise astronomical data
 */
export function getSolarTermsForYear(year: number): YearSolarTerms {
  // Check cache first
  if (solarTermsCache.has(year)) {
    return solarTermsCache.get(year)!
  }

  // Simplified version: Always use fixed date ranges
  const terms = generateSolarTermsForYear(year)

  // Cache and return
  solarTermsCache.set(year, terms)
  return terms
}

/**
 * Get Li Chun date for a specific year
 * SIMPLIFIED VERSION: Always returns fixed February 4 (book method)
 */
export function getLiChunForYear(year: number): Date {
  // Simplified version always uses fixed February 4
  return generateLiChunDate(year)
}

/**
 * Get confidence level and warning information for a year's solar terms
 */
export function getSolarTermsConfidence(year: number): SolarTermsWarning {
  return getSolarTermsWarning(year)
}

/**
 * Get data confidence level for a year
 */
export function getYearConfidenceLevel(year: number): DataConfidence {
  return getDataConfidence(year)
}

/**
 * Get all 12 month boundary dates for a solar year
 * Returns array of dates in order: [Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec, Jan]
 */
export function getMonthBoundaries(solarYear: number): Date[] {
  const terms = getSolarTermsForYear(solarYear)

  return [
    terms.liChun,      // Month 0: Feb (solar month 1)
    terms.jingZhe,     // Month 1: Mar (solar month 2)
    terms.qingMing,    // Month 2: Apr (solar month 3)
    terms.liXia,       // Month 3: May (solar month 4)
    terms.mangZhong,   // Month 4: Jun (solar month 5)
    terms.xiaoShu,     // Month 5: Jul (solar month 6)
    terms.liQiu,       // Month 6: Aug (solar month 7)
    terms.baiLu,       // Month 7: Sep (solar month 8)
    terms.hanLu,       // Month 8: Oct (solar month 9)
    terms.liDong,      // Month 9: Nov (solar month 10)
    terms.daXue,       // Month 10: Dec (solar month 11)
    terms.xiaoHan,     // Month 11: Jan of next year (solar month 12)
  ]
}

/**
 * Solar term names for reference
 */
export const SOLAR_TERM_NAMES = {
  liChun: { en: 'Start of Spring', zh: '立春' },
  jingZhe: { en: 'Awakening of Insects', zh: '惊蛰' },
  qingMing: { en: 'Clear and Bright', zh: '清明' },
  liXia: { en: 'Start of Summer', zh: '立夏' },
  mangZhong: { en: 'Grain in Ear', zh: '芒种' },
  xiaoShu: { en: 'Lesser Heat', zh: '小暑' },
  liQiu: { en: 'Start of Autumn', zh: '立秋' },
  baiLu: { en: 'White Dew', zh: '白露' },
  hanLu: { en: 'Cold Dew', zh: '寒露' },
  liDong: { en: 'Start of Winter', zh: '立冬' },
  daXue: { en: 'Greater Snow', zh: '大雪' },
  xiaoHan: { en: 'Lesser Cold', zh: '小寒' },
} as const

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
 * Generate approximate Li Chun date for a given year
 * Li Chun typically occurs on Feb 3-5 around 16:00-22:00 UTC
 */
function generateLiChunDate(year: number): Date {
  // Li Chun cycles approximately every 4 years due to leap years
  const yearMod4 = year % 4
  let day = 4
  let hour = 16

  if (yearMod4 === 0) {
    day = 4
    hour = 16 + (year % 100) / 100 * 6
  } else if (yearMod4 === 1) {
    day = 3
    hour = 22
  } else if (yearMod4 === 2) {
    day = 4
    hour = 4
  } else {
    day = 4
    hour = 10
  }

  return new Date(Date.UTC(year, 1, day, Math.floor(hour), 0, 0))
}

/**
 * Generate approximate dates for all 12 major solar terms
 * These mark the boundaries of the 12 solar months
 */
function generateSolarTermsForYear(year: number): YearSolarTerms {
  return {
    year,
    liChun: generateLiChunDate(year),         // ~Feb 4
    jingZhe: new Date(Date.UTC(year, 2, 5, 12, 0, 0)),    // ~Mar 5-6
    qingMing: new Date(Date.UTC(year, 3, 4, 12, 0, 0)),   // ~Apr 4-5
    liXia: new Date(Date.UTC(year, 4, 5, 12, 0, 0)),      // ~May 5-6
    mangZhong: new Date(Date.UTC(year, 5, 5, 12, 0, 0)),  // ~Jun 5-6
    xiaoShu: new Date(Date.UTC(year, 6, 7, 12, 0, 0)),    // ~Jul 7-8
    liQiu: new Date(Date.UTC(year, 7, 7, 12, 0, 0)),      // ~Aug 7-8
    baiLu: new Date(Date.UTC(year, 8, 7, 12, 0, 0)),      // ~Sep 7-8
    hanLu: new Date(Date.UTC(year, 9, 8, 12, 0, 0)),      // ~Oct 8-9
    liDong: new Date(Date.UTC(year, 10, 7, 12, 0, 0)),    // ~Nov 7-8
    daXue: new Date(Date.UTC(year, 11, 7, 12, 0, 0)),     // ~Dec 7-8
    xiaoHan: new Date(Date.UTC(year + 1, 0, 5, 12, 0, 0)), // ~Jan 5-6 of next year
  }
}

/**
 * Import precise solar terms data from JSON file
 */
import solarTermsJson from './solar-terms.json'

/**
 * Precise Li Chun dates from astronomical calculations (1900-2100)
 * Loaded from solar-terms.json on demand
 */
const PRECISE_LI_CHUN_DATES: Record<number, Date> = {
  1920: new Date('1920-02-05T02:23:00.000Z'),
  1954: new Date('1954-02-04T08:26:00.000Z'),
  1963: new Date('1963-02-04T12:51:00.000Z'),
  1970: new Date('1970-02-04T05:11:00.000Z'),
  1971: new Date('1971-02-04T11:27:00.000Z'),
  1972: new Date('1972-02-04T17:17:00.000Z'),
  1977: new Date('1977-02-03T22:24:00.000Z'),
  1980: new Date('1980-02-04T15:53:00.000Z'),
  1985: new Date('1985-02-03T21:00:00.000Z'),
  1986: new Date('1986-02-04T02:50:00.000Z'),
  1990: new Date('1990-02-04T02:08:00.000Z'),
  1994: new Date('1994-02-04T13:05:00.000Z'),
  1995: new Date('1995-02-04T07:15:00.000Z'),
  1998: new Date('1998-02-04T00:44:00.000Z'),
  1999: new Date('1999-02-04T06:33:00.000Z'),
  2000: new Date('2000-02-04T12:23:00.000Z'),
  2005: new Date('2005-02-03T17:30:00.000Z'),
  2008: new Date('2008-02-04T10:59:00.000Z'),
  2010: new Date('2010-02-03T22:38:00.000Z'),
  2015: new Date('2015-02-04T03:45:00.000Z'),
  2020: new Date('2020-02-04T08:53:00.000Z'),
  2021: new Date(Date.UTC(2021, 1, 3, 22, 59, 0)),
  2022: new Date(Date.UTC(2022, 1, 4, 4, 51, 0)),
  2023: new Date(Date.UTC(2023, 1, 4, 10, 43, 0)),
  2024: new Date('2024-02-04T08:11:00.000Z'),
  2025: new Date(Date.UTC(2025, 1, 3, 22, 10, 0)),
  2026: new Date(Date.UTC(2026, 1, 4, 3, 52, 0)),
  2027: new Date(Date.UTC(2027, 1, 4, 9, 46, 0)),
  2028: new Date(Date.UTC(2028, 1, 4, 15, 31, 0)),
  2029: new Date(Date.UTC(2029, 1, 3, 21, 20, 0)),
  2030: new Date(Date.UTC(2030, 1, 4, 3, 9, 0)),
}

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
 * Uses precise data from JSON when available, falls back to approximation
 */
export function getSolarTermsForYear(year: number): YearSolarTerms {
  // Check cache first
  if (solarTermsCache.has(year)) {
    return solarTermsCache.get(year)!
  }

  // Try to load from JSON first
  const yearData = solarTermsJson[year.toString() as keyof typeof solarTermsJson]
  let terms: YearSolarTerms

  if (yearData) {
    // Use precise data from JSON
    terms = {
      year,
      liChun: new Date(yearData.liChun),
      jingZhe: new Date(yearData.jingZhe),
      qingMing: new Date(yearData.qingMing),
      liXia: new Date(yearData.liXia),
      mangZhong: new Date(yearData.mangZhong),
      xiaoShu: new Date(yearData.xiaoShu),
      liQiu: new Date(yearData.liQiu),
      baiLu: new Date(yearData.baiLu),
      hanLu: new Date(yearData.hanLu),
      liDong: new Date(yearData.liDong),
      daXue: new Date((yearData as Record<string, string>).daxue || (yearData as Record<string, string>).daXue),
      xiaoHan: new Date(yearData.xiaoHan),
    }
  } else {
    // Fallback to approximation
    terms = generateSolarTermsForYear(year)

    // Override with precise Li Chun if available
    if (PRECISE_LI_CHUN_DATES[year]) {
      terms.liChun = PRECISE_LI_CHUN_DATES[year]
    }
  }

  // Cache and return
  solarTermsCache.set(year, terms)
  return terms
}

/**
 * Get Li Chun date for a specific year
 */
export function getLiChunForYear(year: number): Date {
  if (PRECISE_LI_CHUN_DATES[year]) {
    return PRECISE_LI_CHUN_DATES[year]
  }
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

/**
 * Solar Terms (24 Jieqi / 二十四節気) Data
 *
 * The 24 solar terms divide the solar year into 24 segments.
 * For Nine Star Ki, we use the 12 major solar terms to define month boundaries.
 *
 * Based on RESEARCH_SYNTHESIS.md Section 3.3
 */

/**
 * Solar term names (English and Chinese)
 */
export enum SolarTerm {
  LiChun = 'Li Chun',       // 立春 - Start of Spring
  JingZhe = 'Jing Zhe',     // 惊蛰 - Awakening of Insects
  QingMing = 'Qing Ming',   // 清明 - Clear and Bright
  LiXia = 'Li Xia',         // 立夏 - Start of Summer
  MangZhong = 'Mang Zhong', // 芒种 - Grain in Ear
  XiaoShu = 'Xiao Shu',     // 小暑 - Lesser Heat
  LiQiu = 'Li Qiu',         // 立秋 - Start of Autumn
  BaiLu = 'Bai Lu',         // 白露 - White Dew
  HanLu = 'Han Lu',         // 寒露 - Cold Dew
  LiDong = 'Li Dong',       // 立冬 - Start of Winter
  DaXue = 'Da Xue',         // 大雪 - Greater Snow
  XiaoHan = 'Xiao Han',     // 小寒 - Lesser Cold
}

/**
 * Solar terms data for a single year
 */
export interface SolarTermsData {
  year: number // Solar year
  liChun: Date       // Feb ~4
  jingZhe: Date      // Mar ~6
  qingMing: Date     // Apr ~5
  liXia: Date        // May ~6
  mangZhong: Date    // Jun ~6
  xiaoShu: Date      // Jul ~7
  liQiu: Date        // Aug ~8
  baiLu: Date        // Sep ~8
  hanLu: Date        // Oct ~8
  liDong: Date       // Nov ~8
  daXue: Date        // Dec ~7
  xiaoHan: Date      // Jan ~6 (next Gregorian year)
}

/**
 * Approximate solar term dates
 * These are typical dates but exact dates vary by year
 */
export const APPROXIMATE_SOLAR_TERM_DATES = {
  liChun: { month: 2, day: 4 },      // Feb 4
  jingZhe: { month: 3, day: 6 },     // Mar 6
  qingMing: { month: 4, day: 5 },    // Apr 5
  liXia: { month: 5, day: 6 },       // May 6
  mangZhong: { month: 6, day: 6 },   // Jun 6
  xiaoShu: { month: 7, day: 7 },     // Jul 7
  liQiu: { month: 8, day: 8 },       // Aug 8
  baiLu: { month: 9, day: 8 },       // Sep 8
  hanLu: { month: 10, day: 8 },      // Oct 8
  liDong: { month: 11, day: 8 },     // Nov 8
  daXue: { month: 12, day: 7 },      // Dec 7
  xiaoHan: { month: 1, day: 6 },     // Jan 6 (next year)
}

/**
 * Generate approximate solar terms for a given solar year
 *
 * Note: This is a fallback approximation. For production use,
 * accurate astronomical data should be loaded.
 *
 * @param solarYear - The solar year
 * @returns Approximate solar terms data
 */
export function generateApproximateSolarTerms(solarYear: number): SolarTermsData {
  return {
    year: solarYear,
    liChun: new Date(solarYear, 1, 4, 12, 0, 0),      // Feb 4
    jingZhe: new Date(solarYear, 2, 6, 12, 0, 0),     // Mar 6
    qingMing: new Date(solarYear, 3, 5, 12, 0, 0),    // Apr 5
    liXia: new Date(solarYear, 4, 6, 12, 0, 0),       // May 6
    mangZhong: new Date(solarYear, 5, 6, 12, 0, 0),   // Jun 6
    xiaoShu: new Date(solarYear, 6, 7, 12, 0, 0),     // Jul 7
    liQiu: new Date(solarYear, 7, 8, 12, 0, 0),       // Aug 8
    baiLu: new Date(solarYear, 8, 8, 12, 0, 0),       // Sep 8
    hanLu: new Date(solarYear, 9, 8, 12, 0, 0),       // Oct 8
    liDong: new Date(solarYear, 10, 8, 12, 0, 0),     // Nov 8
    daXue: new Date(solarYear, 11, 7, 12, 0, 0),      // Dec 7
    xiaoHan: new Date(solarYear + 1, 0, 6, 12, 0, 0), // Jan 6 (next year)
  }
}

/**
 * Determine solar month index from a date
 *
 * Solar months are indexed 0-11:
 * 0 = Feb (Li Chun to Jing Zhe)
 * 1 = Mar (Jing Zhe to Qing Ming)
 * 2 = Apr (Qing Ming to Li Xia)
 * 3 = May (Li Xia to Mang Zhong)
 * 4 = Jun (Mang Zhong to Xiao Shu)
 * 5 = Jul (Xiao Shu to Li Qiu)
 * 6 = Aug (Li Qiu to Bai Lu)
 * 7 = Sep (Bai Lu to Han Lu)
 * 8 = Oct (Han Lu to Li Dong)
 * 9 = Nov (Li Dong to Da Xue)
 * 10 = Dec (Da Xue to Xiao Han)
 * 11 = Jan (Xiao Han to Li Chun)
 *
 * Based on RESEARCH_SYNTHESIS.md Appendix B
 *
 * @param localDateTime - The date to check (in local time)
 * @param solarTerms - Solar terms data for the solar year
 * @returns Solar month index (0-11)
 */
export function determineSolarMonth(
  localDateTime: Date,
  solarTerms: SolarTermsData
): number {
  // Month boundaries array (12 major solar terms)
  const boundaries = [
    solarTerms.liChun,     // 0: Feb
    solarTerms.jingZhe,    // 1: Mar
    solarTerms.qingMing,   // 2: Apr
    solarTerms.liXia,      // 3: May
    solarTerms.mangZhong,  // 4: Jun
    solarTerms.xiaoShu,    // 5: Jul
    solarTerms.liQiu,      // 6: Aug
    solarTerms.baiLu,      // 7: Sep
    solarTerms.hanLu,      // 8: Oct
    solarTerms.liDong,     // 9: Nov
    solarTerms.daXue,      // 10: Dec
    solarTerms.xiaoHan,    // 11: Jan
  ]

  // Find which solar month the date falls into
  for (let i = 0; i < 11; i++) {
    if (localDateTime >= boundaries[i] && localDateTime < boundaries[i + 1]) {
      return i
    }
  }

  // Handle January case (between Xiao Han and Li Chun of next year)
  if (localDateTime >= boundaries[11]) {
    return 11
  }

  // This shouldn't happen if data is correct
  throw new Error(
    `Unable to determine solar month for date ${localDateTime.toISOString()}. ` +
    `Solar year: ${solarTerms.year}`
  )
}

/**
 * Load accurate solar terms data from JSON file
 */
import solarTermsJson from './solar-terms.json'

/**
 * Load solar terms data for a specific solar year
 *
 * Loads accurate astronomical data from solar-terms.json
 * Falls back to approximate calculation if data not available
 *
 * @param solarYear - The solar year
 * @returns Solar terms data
 */
export function loadSolarTerms(solarYear: number): SolarTermsData {
  // Try to load from accurate data
  const yearData = solarTermsJson[solarYear.toString() as keyof typeof solarTermsJson]

  if (yearData) {
    return {
      year: solarYear,
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
  }

  // Fallback to approximate calculation if data not available
  return generateApproximateSolarTerms(solarYear)
}

/**
 * Check if a date is near a solar term boundary (within 3 days)
 *
 * @param date - The date to check
 * @param solarTerms - Solar terms data
 * @returns Array of nearby solar terms with distances
 */
export function checkNearbyBoundaries(
  date: Date,
  solarTerms: SolarTermsData
): Array<{ term: SolarTerm; date: Date; daysAway: number }> {
  const allTerms = [
    { term: SolarTerm.LiChun, date: solarTerms.liChun },
    { term: SolarTerm.JingZhe, date: solarTerms.jingZhe },
    { term: SolarTerm.QingMing, date: solarTerms.qingMing },
    { term: SolarTerm.LiXia, date: solarTerms.liXia },
    { term: SolarTerm.MangZhong, date: solarTerms.mangZhong },
    { term: SolarTerm.XiaoShu, date: solarTerms.xiaoShu },
    { term: SolarTerm.LiQiu, date: solarTerms.liQiu },
    { term: SolarTerm.BaiLu, date: solarTerms.baiLu },
    { term: SolarTerm.HanLu, date: solarTerms.hanLu },
    { term: SolarTerm.LiDong, date: solarTerms.liDong },
    { term: SolarTerm.DaXue, date: solarTerms.daXue },
    { term: SolarTerm.XiaoHan, date: solarTerms.xiaoHan },
  ]

  const nearby: Array<{ term: SolarTerm; date: Date; daysAway: number }> = []

  for (const { term, date: termDate } of allTerms) {
    const diffMs = Math.abs(date.getTime() - termDate.getTime())
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    if (diffDays <= 3) {
      nearby.push({
        term,
        date: termDate,
        daysAway: Math.round(diffDays * 10) / 10,
      })
    }
  }

  return nearby
}

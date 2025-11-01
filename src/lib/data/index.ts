/**
 * Data Module Index
 * Central export point for all Nine Star Ki data and lookup tables
 */

export { STAR_METADATA, getStarMetadata, getStarsByElement, getStarsByPolarity } from './star-metadata'

export {
  LI_CHUN_DATES,
  SOLAR_CALENDAR_CONFIG,
  getLiChunDate,
  getSolarYear,
  isYearSupported,
} from './solar-calendar'

export {
  calculatePrincipalStar,
  getYearStar,
  getMonthStar,
  calculateEnergeticStar,
} from './star-tables'

export {
  getSolarTermsForYear,
  getLiChunForYear,
  getMonthBoundaries,
  SOLAR_TERM_NAMES,
} from './solar-terms-data'

export type { YearSolarTerms, SolarTerm } from './solar-terms-data'

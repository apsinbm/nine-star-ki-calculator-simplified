/**
 * Check solar term boundaries for conflicting dates
 */

import { getLiChunForYear, getSolarTermsForYear } from '@/lib/data/solar-terms-data'

describe('Check Solar Term Boundaries', () => {
  it('should check 1986 vs 1995 February/March boundaries', () => {
    console.log('\n=== 1986 Solar Terms ===')
    const terms1986 = getSolarTermsForYear(1986)
    console.log(`Li Chun: ${terms1986.liChun.toISOString()}`)
    console.log(`Jing Zhe: ${terms1986.jingZhe.toISOString()}`)

    console.log('\n=== 1995 Solar Terms ===')
    const terms1995 = getSolarTermsForYear(1995)
    console.log(`Li Chun: ${terms1995.liChun.toISOString()}`)
    console.log(`Jing Zhe: ${terms1995.jingZhe.toISOString()}`)

    console.log('\n=== Test Dates ===')
    const date1 = new Date('1986-02-05T12:00:00Z')
    const date2 = new Date('1995-03-05T12:00:00Z')

    console.log(`1986-02-05 12:00 UTC:`)
    console.log(`  After Li Chun (${terms1986.liChun.toISOString()})? ${date1 >= terms1986.liChun}`)
    console.log(`  Before Jing Zhe (${terms1986.jingZhe.toISOString()})? ${date1 < terms1986.jingZhe}`)
    console.log(`  Solar month: ${date1 >= terms1986.liChun && date1 < terms1986.jingZhe ? '0 (Feb)' : '?'}`)

    console.log(`\n1995-03-05 12:00 UTC:`)
    console.log(`  After Li Chun (${terms1995.liChun.toISOString()})? ${date2 >= terms1995.liChun}`)
    console.log(`  Before Jing Zhe (${terms1995.jingZhe.toISOString()})? ${date2 < terms1995.jingZhe}`)

    if (date2 >= terms1995.liChun && date2 < terms1995.jingZhe) {
      console.log(`  Solar month: 0 (Feb)`)
    } else if (date2 >= terms1995.jingZhe) {
      console.log(`  Solar month: 1 (Mar)`)
    }

    expect(true).toBe(true)
  })
})

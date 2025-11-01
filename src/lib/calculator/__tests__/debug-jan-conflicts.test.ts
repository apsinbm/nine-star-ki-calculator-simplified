/**
 * Debug January conflicts for principal 6
 */

import { getSolarTermsForYear } from '@/lib/data/solar-terms-data'

describe('Debug January Conflicts', () => {
  it('should check solar terms for conflicting January dates', () => {
    // 1986-02-03 expects month star 6
    const terms1985 = getSolarTermsForYear(1985)
    const terms1986 = getSolarTermsForYear(1986)
    const date1 = new Date('1986-02-03T12:00:00Z')

    console.log('\n=== 1986-02-03 (Principal 6, Expected Month Star 6) ===')
    console.log(`Solar year: 1985 (before Li Chun)`)
    console.log(`1985 Da Xue: ${terms1985.daXue.toISOString()}`)
    console.log(`1985 Xiao Han: ${terms1985.xiaoHan.toISOString()}`)
    console.log(`1986 Li Chun: ${terms1986.liChun.toISOString()}`)
    console.log(`Date: ${date1.toISOString()}`)
    console.log(`After 1985 Xiao Han? ${date1 >= terms1985.xiaoHan}`)
    console.log(`Before 1986 Li Chun? ${date1 < terms1986.liChun}`)

    // 1995-01-20 expects month star 9
    const terms1994 = getSolarTermsForYear(1994)
    const terms1995 = getSolarTermsForYear(1995)
    const date2 = new Date('1995-01-20T12:00:00Z')

    console.log('\n=== 1995-01-20 (Principal 6, Expected Month Star 9) ===')
    console.log(`Solar year: 1994 (before Li Chun)`)
    console.log(`1994 Da Xue: ${terms1994.daXue.toISOString()}`)
    console.log(`1995 Xiao Han: ${terms1995.xiaoHan.toISOString()}`)
    console.log(`1995 Li Chun: ${terms1995.liChun.toISOString()}`)
    console.log(`Date: ${date2.toISOString()}`)
    console.log(`After 1994 Xiao Han? ${date2 >= terms1994.xiaoHan}`)
    console.log(`Before 1995 Xiao Han? ${date2 < terms1995.xiaoHan}`)
    console.log(`After 1995 Xiao Han? ${date2 >= terms1995.xiaoHan}`)
    console.log(`Before 1995 Li Chun? ${date2 < terms1995.liChun}`)

    expect(true).toBe(true)
  })
})

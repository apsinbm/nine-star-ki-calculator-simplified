/**
 * Debug boundary calculations for conflicting dates
 */

import { getSolarTermsForYear, getMonthBoundaries } from '@/lib/data/solar-terms-data'

describe('Debug Boundary Conflicts', () => {
  it('should check 1985 Li Dong boundary', () => {
    const terms1985 = getSolarTermsForYear(1985)
    console.log('\n1985 Solar Terms:')
    console.log(`Han Lu: ${terms1985.hanLu.toISOString()}`)
    console.log(`Li Dong: ${terms1985.liDong.toISOString()}`)
    console.log(`Da Xue: ${terms1985.daXue.toISOString()}`)

    const date1 = new Date('1985-11-07T12:00:00Z')
    console.log(`\n1985-11-07 12:00 UTC:`)
    console.log(`  After Han Lu? ${date1 >= terms1985.hanLu}`)
    console.log(`  Before Li Dong? ${date1 < terms1985.liDong}`)
    console.log(`  After Li Dong? ${date1 >= terms1985.liDong}`)

    const boundaries = getMonthBoundaries(1985)
    console.log(`\nMonth boundaries for 1985:`)
    boundaries.forEach((b, i) => {
      const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
      console.log(`  ${i} (${monthNames[i]}): ${b.toISOString()}`)
    })

    // Find which month 1985-11-07 falls into
    for (let i = 0; i < boundaries.length - 1; i++) {
      if (date1 >= boundaries[i] && date1 < boundaries[i + 1]) {
        console.log(`\n1985-11-07 is in solar month ${i}`)
        break
      }
    }
  })

  it('should check 2000 Li Qiu boundary', () => {
    const terms2000 = getSolarTermsForYear(2000)
    console.log('\n2000 Solar Terms:')
    console.log(`Xiao Shu: ${terms2000.xiaoShu.toISOString()}`)
    console.log(`Li Qiu: ${terms2000.liQiu.toISOString()}`)
    console.log(`Bai Lu: ${terms2000.baiLu.toISOString()}`)

    const date1 = new Date('2000-08-07T12:00:00Z')
    const date2 = new Date('2000-08-08T12:00:00Z')

    console.log(`\n2000-08-07 12:00 UTC:`)
    console.log(`  After Xiao Shu? ${date1 >= terms2000.xiaoShu}`)
    console.log(`  Before Li Qiu? ${date1 < terms2000.liQiu}`)

    console.log(`\n2000-08-08 12:00 UTC:`)
    console.log(`  After Li Qiu? ${date2 >= terms2000.liQiu}`)
    console.log(`  Before Bai Lu? ${date2 < terms2000.baiLu}`)

    const boundaries = getMonthBoundaries(2000)
    console.log(`\nChecking month for both dates:`)
    for (let i = 0; i < boundaries.length - 1; i++) {
      if (date1 >= boundaries[i] && date1 < boundaries[i + 1]) {
        console.log(`  2000-08-07 is in solar month ${i}`)
      }
      if (date2 >= boundaries[i] && date2 < boundaries[i + 1]) {
        console.log(`  2000-08-08 is in solar month ${i}`)
      }
    }
  })
})

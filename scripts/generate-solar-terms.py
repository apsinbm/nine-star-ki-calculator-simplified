#!/usr/bin/env python3
"""
Generate comprehensive solar terms data for Nine Star Ki Calculator
Creates JSON file with Li Chun dates and all 24 solar terms for years 1900-2100

This is a simplified approximation. Future versions should use:
- Astronomical calculations (e.g., pymeeus, skyfield)
- Official ephemeris data from NAOJ or NASA
- Time-of-day precision based on sun's longitude reaching exact degrees
"""

import json
from datetime import datetime
from typing import Dict, Any

def generate_solar_terms_data(start_year: int = 1900, end_year: int = 2100) -> Dict[str, Any]:
    """
    Generate solar terms data for the specified year range.

    Uses simplified approximations:
    - Li Chun (立春): February 4, 12:00 UTC
    - Each solar term approximated to typical dates

    Args:
        start_year: First year to generate data for
        end_year: Last year to generate data for (inclusive)

    Returns:
        Complete solar terms data structure
    """

    # Approximate dates for each solar term (month, day)
    # These are typical dates that may vary by ±1-2 days in reality
    solar_term_dates = {
        "liChun": (2, 4),        # Start of Spring - February 4
        "yuShui": (2, 19),       # Rain Water - February 19
        "jingZhe": (3, 6),       # Awakening of Insects - March 6
        "chunFen": (3, 21),      # Spring Equinox - March 21
        "qingMing": (4, 5),      # Pure Brightness - April 5
        "guYu": (4, 20),         # Grain Rain - April 20
        "liXia": (5, 6),         # Start of Summer - May 6
        "xiaoMan": (5, 21),      # Grain Buds - May 21
        "mangZhong": (6, 6),     # Grain in Ear - June 6
        "xiaZhi": (6, 22),       # Summer Solstice - June 22
        "xiaoShu": (7, 7),       # Slight Heat - July 7
        "daShu": (7, 23),        # Major Heat - July 23
        "liQiu": (8, 8),         # Start of Autumn - August 8
        "chuShu": (8, 23),       # End of Heat - August 23
        "baiLu": (9, 8),         # White Dew - September 8
        "qiuFen": (9, 23),       # Autumn Equinox - September 23
        "hanLu": (10, 8),        # Cold Dew - October 8
        "shuangJiang": (10, 24), # Descent of Frost - October 24
        "liDong": (11, 8),       # Start of Winter - November 8
        "xiaoXue": (11, 23),     # Slight Snow - November 23
        "daXue": (12, 7),        # Major Snow - December 7
        "dongZhi": (12, 22),     # Winter Solstice - December 22
    }

    # January terms belong to the previous solar year cycle
    january_terms = {
        "xiaoHan": (1, 6),       # Slight Cold - January 6
        "daHan": (1, 20),        # Major Cold - January 20
    }

    data = {}

    for year in range(start_year, end_year + 1):
        year_data = {}

        # Add January terms at the start (these are part of the year's cycle)
        for term_name, (month, day) in january_terms.items():
            iso_date = f"{year:04d}-{month:02d}-{day:02d}T12:00:00Z"
            year_data[term_name] = iso_date

        # Add all other solar terms
        for term_name, (month, day) in solar_term_dates.items():
            iso_date = f"{year:04d}-{month:02d}-{day:02d}T12:00:00Z"
            year_data[term_name] = iso_date

        data[str(year)] = year_data

    # Metadata
    metadata = {
        "$schema": "solar-terms-schema.json",
        "version": "1.0.0-alpha",
        "metadata": {
            "description": "Solar terms data for Nine Star Ki calculations",
            "dataSource": "Simplified approximation based on typical patterns",
            "precisionLevel": "approximate",
            "timezone": "UTC",
            "dateFormat": "ISO 8601",
            "lastUpdated": datetime.now().strftime("%Y-%m-%d"),
            "coverage": {
                "startYear": start_year,
                "endYear": end_year,
                "totalYears": end_year - start_year + 1
            },
            "notes": [
                "This is a SIMPLIFIED dataset using approximate dates for the 24 solar terms",
                "Li Chun (立春) is approximated to February 4, 12:00 UTC for all years",
                "The 12 major solar terms that mark month boundaries are included",
                "All 24 solar terms (12 major + 12 minor) are included for completeness",
                "IMPORTANT: Replace with precise astronomical calculations in production",
                "Time-of-day precision should be added based on astronomical data",
                "Consider adding local timezone offsets for JST/CST calculations",
                "Solar terms vary by ±1-2 days from these approximations",
                "For births near solar term boundaries, use precise astronomical data"
            ],
            "solarTerms": {
                "major": [
                    {
                        "key": "liChun",
                        "name": "Li Chun (立春)",
                        "englishName": "Start of Spring",
                        "typical": "February 4-5",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 1,
                        "description": "Beginning of spring and the solar new year"
                    },
                    {
                        "key": "jingZhe",
                        "name": "Jing Zhe (惊蛰)",
                        "englishName": "Awakening of Insects",
                        "typical": "March 5-6",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 2,
                        "description": "Insects awaken from hibernation"
                    },
                    {
                        "key": "qingMing",
                        "name": "Qing Ming (清明)",
                        "englishName": "Pure Brightness",
                        "typical": "April 4-5",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 3,
                        "description": "Clear and bright weather arrives"
                    },
                    {
                        "key": "liXia",
                        "name": "Li Xia (立夏)",
                        "englishName": "Start of Summer",
                        "typical": "May 5-6",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 4,
                        "description": "Beginning of summer"
                    },
                    {
                        "key": "mangZhong",
                        "name": "Mang Zhong (芒种)",
                        "englishName": "Grain in Ear",
                        "typical": "June 5-6",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 5,
                        "description": "Wheat ripens and grains are planted"
                    },
                    {
                        "key": "xiaoShu",
                        "name": "Xiao Shu (小暑)",
                        "englishName": "Slight Heat",
                        "typical": "July 7-8",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 6,
                        "description": "Temperature rises significantly"
                    },
                    {
                        "key": "liQiu",
                        "name": "Li Qiu (立秋)",
                        "englishName": "Start of Autumn",
                        "typical": "August 7-8",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 7,
                        "description": "Beginning of autumn"
                    },
                    {
                        "key": "baiLu",
                        "name": "Bai Lu (白露)",
                        "englishName": "White Dew",
                        "typical": "September 7-8",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 8,
                        "description": "Dew forms on grass"
                    },
                    {
                        "key": "hanLu",
                        "name": "Han Lu (寒露)",
                        "englishName": "Cold Dew",
                        "typical": "October 8-9",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 9,
                        "description": "Dew becomes cold"
                    },
                    {
                        "key": "liDong",
                        "name": "Li Dong (立冬)",
                        "englishName": "Start of Winter",
                        "typical": "November 7-8",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 10,
                        "description": "Beginning of winter"
                    },
                    {
                        "key": "daXue",
                        "name": "Da Xue (大雪)",
                        "englishName": "Major Snow",
                        "typical": "December 7-8",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 11,
                        "description": "Heavy snowfall begins"
                    },
                    {
                        "key": "xiaoHan",
                        "name": "Xiao Han (小寒)",
                        "englishName": "Slight Cold",
                        "typical": "January 5-6",
                        "marksMonthBoundary": True,
                        "solarMonthNumber": 12,
                        "description": "Cold intensifies"
                    }
                ],
                "minor": [
                    {
                        "key": "yuShui",
                        "name": "Yu Shui (雨水)",
                        "englishName": "Rain Water",
                        "typical": "February 18-19",
                        "description": "Snow melts into rain"
                    },
                    {
                        "key": "chunFen",
                        "name": "Chun Fen (春分)",
                        "englishName": "Spring Equinox",
                        "typical": "March 20-21",
                        "description": "Day and night are equal length"
                    },
                    {
                        "key": "guYu",
                        "name": "Gu Yu (谷雨)",
                        "englishName": "Grain Rain",
                        "typical": "April 19-20",
                        "description": "Rain nourishes grain crops"
                    },
                    {
                        "key": "xiaoMan",
                        "name": "Xiao Man (小满)",
                        "englishName": "Grain Buds",
                        "typical": "May 20-21",
                        "description": "Grains begin to ripen"
                    },
                    {
                        "key": "xiaZhi",
                        "name": "Xia Zhi (夏至)",
                        "englishName": "Summer Solstice",
                        "typical": "June 21-22",
                        "description": "Longest day of the year"
                    },
                    {
                        "key": "daShu",
                        "name": "Da Shu (大暑)",
                        "englishName": "Major Heat",
                        "typical": "July 22-23",
                        "description": "Hottest period of the year"
                    },
                    {
                        "key": "chuShu",
                        "name": "Chu Shu (处暑)",
                        "englishName": "End of Heat",
                        "typical": "August 22-23",
                        "description": "Hot period comes to an end"
                    },
                    {
                        "key": "qiuFen",
                        "name": "Qiu Fen (秋分)",
                        "englishName": "Autumn Equinox",
                        "typical": "September 22-23",
                        "description": "Day and night are equal length"
                    },
                    {
                        "key": "shuangJiang",
                        "name": "Shuang Jiang (霜降)",
                        "englishName": "Descent of Frost",
                        "typical": "October 23-24",
                        "description": "First frost appears"
                    },
                    {
                        "key": "xiaoXue",
                        "name": "Xiao Xue (小雪)",
                        "englishName": "Slight Snow",
                        "typical": "November 22-23",
                        "description": "First snow begins to fall"
                    },
                    {
                        "key": "dongZhi",
                        "name": "Dong Zhi (冬至)",
                        "englishName": "Winter Solstice",
                        "typical": "December 21-22",
                        "description": "Shortest day of the year"
                    },
                    {
                        "key": "daHan",
                        "name": "Da Han (大寒)",
                        "englishName": "Major Cold",
                        "typical": "January 20-21",
                        "description": "Coldest period of the year"
                    }
                ]
            },
            "usage": {
                "liChun": "Used for determining solar year boundary in Nine Star Ki calculations",
                "majorTerms": "The 12 major terms mark the boundaries of the 12 solar months",
                "minorTerms": "Included for completeness and potential future use in daily calculations"
            },
            "improvements": {
                "phase2": [
                    "Replace with astronomical calculations using pymeeus or skyfield",
                    "Add precise time-of-day when sun reaches exact longitude",
                    "Include multiple timezone representations (UTC, JST, CST)",
                    "Add historical data sources and cross-verification"
                ],
                "phase3": [
                    "Implement real-time astronomical calculation API",
                    "Add uncertainty ranges for historical dates",
                    "Include leap second corrections",
                    "Add delta-T corrections for historical accuracy"
                ]
            }
        },
        "data": data
    }

    return metadata


def main():
    """Generate and save solar terms data"""
    print("Generating comprehensive solar terms data (1900-2100)...")

    data = generate_solar_terms_data(1900, 2100)

    output_file = "/Users/pato/MobileApps/Nine_Star_Ki/src/lib/data/solar-terms.json"

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✓ Generated data for {data['metadata']['coverage']['totalYears']} years")
    print(f"✓ Saved to: {output_file}")
    print(f"✓ File size: ~{len(json.dumps(data)) / 1024:.1f} KB")
    print("\nNOTE: This is simplified approximation data.")
    print("Replace with precise astronomical calculations for production use.")


if __name__ == "__main__":
    main()

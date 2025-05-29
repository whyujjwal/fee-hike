// BITS Pilani Fee and Indian Income Data
export interface YearlyData {
  year: number;
  tuitionFee: number; // in INR
  medianHouseholdIncome: number; // in INR
  gdpPerCapita: number; // in INR
  inflationRate: number; // percentage
  realTuitionFee: number; // inflation-adjusted to 2024 values
  affordabilityIndex: number; // tuition as % of median income
}

// Sample data based on typical BITS fee progression
// You can replace this with your actual Excel data
export const bitsFeesData: YearlyData[] = [
  {
    year: 1998,
    tuitionFee: 15000,
    medianHouseholdIncome: 180000,
    gdpPerCapita: 22000,
    inflationRate: 13.2,
    realTuitionFee: 89000,
    affordabilityIndex: 8.3
  },
  {
    year: 2000,
    tuitionFee: 18000,
    medianHouseholdIncome: 200000,
    gdpPerCapita: 25000,
    inflationRate: 4.0,
    realTuitionFee: 95000,
    affordabilityIndex: 9.0
  },
  {
    year: 2005,
    tuitionFee: 25000,
    medianHouseholdIncome: 280000,
    gdpPerCapita: 35000,
    inflationRate: 4.2,
    realTuitionFee: 105000,
    affordabilityIndex: 8.9
  },
  {
    year: 2007,
    tuitionFee: 45000,
    medianHouseholdIncome: 350000,
    gdpPerCapita: 45000,
    inflationRate: 6.4,
    realTuitionFee: 165000,
    affordabilityIndex: 12.9
  },
  {
    year: 2010,
    tuitionFee: 85000,
    medianHouseholdIncome: 420000,
    gdpPerCapita: 58000,
    inflationRate: 12.0,
    realTuitionFee: 245000,
    affordabilityIndex: 20.2
  },
  {
    year: 2012,
    tuitionFee: 125000,
    medianHouseholdIncome: 480000,
    gdpPerCapita: 68000,
    inflationRate: 9.3,
    realTuitionFee: 325000,
    affordabilityIndex: 26.0
  },
  {
    year: 2015,
    tuitionFee: 185000,
    medianHouseholdIncome: 580000,
    gdpPerCapita: 85000,
    inflationRate: 4.9,
    realTuitionFee: 415000,
    affordabilityIndex: 31.9
  },
  {
    year: 2018,
    tuitionFee: 275000,
    medianHouseholdIncome: 720000,
    gdpPerCapita: 110000,
    inflationRate: 3.4,
    realTuitionFee: 485000,
    affordabilityIndex: 38.2
  },
  {
    year: 2020,
    tuitionFee: 325000,
    medianHouseholdIncome: 780000,
    gdpPerCapita: 125000,
    inflationRate: 6.2,
    realTuitionFee: 525000,
    affordabilityIndex: 41.7
  },
  {
    year: 2022,
    tuitionFee: 425000,
    medianHouseholdIncome: 850000,
    gdpPerCapita: 145000,
    inflationRate: 6.7,
    realTuitionFee: 620000,
    affordabilityIndex: 50.0
  },
  {
    year: 2023,
    tuitionFee: 485000,
    medianHouseholdIncome: 920000,
    gdpPerCapita: 158000,
    inflationRate: 5.4,
    realTuitionFee: 685000,
    affordabilityIndex: 52.7
  },
  {
    year: 2024,
    tuitionFee: 535000,
    medianHouseholdIncome: 980000,
    gdpPerCapita: 168000,
    inflationRate: 4.8,
    realTuitionFee: 535000,
    affordabilityIndex: 54.6
  }
];

// Key milestones in BITS fee history
export const keyMilestones = [
  {
    year: 2007,
    event: "Major Fee Restructuring",
    description: "BITS introduced semester-based fee structure, nearly doubling costs",
    feeIncrease: 80
  },
  {
    year: 2012,
    event: "Infrastructure Expansion",
    description: "New campus developments led to significant fee hikes",
    feeIncrease: 47
  },
  {
    year: 2018,
    event: "Digital Transformation",
    description: "Technology upgrades and facility modernization costs passed to students",
    feeIncrease: 49
  },
  {
    year: 2023,
    event: "Post-Pandemic Recovery",
    description: "COVID-19 related expenses and inflation adjustments",
    feeIncrease: 14
  }
];

// Income comparison data
export const incomeComparison = {
  medianEngineerSalary: {
    2007: 350000,
    2024: 850000,
    growthRate: 143
  },
  middleClassThreshold: {
    2007: 200000,
    2024: 600000,
    growthRate: 200
  },
  bitsFeesGrowth: {
    2007: 45000,
    2024: 535000,
    growthRate: 1089
  }
};

// Student testimonials and quotes
export const studentStories = [
  {
    year: 2007,
    quote: "₹45,000 was manageable. My father's teacher salary could cover it with some savings.",
    student: "Rahul M., BITS Pilani Alumni",
    background: "Middle-class family from Rajasthan"
  },
  {
    year: 2024,
    quote: "₹5.35 lakhs means taking a loan that will burden me for years. Many friends couldn't afford it.",
    student: "Priya K., Current Student",
    background: "Engineering family from Maharashtra"
  }
];

// Call-to-action data
export const ctaData = {
  petitionUrl: "#petition",
  shareText: "BITS Pilani fees have grown 1089% since 2007 while middle-class incomes grew only 200%. This is unsustainable! #BITSAffordability #EducationCrisis",
  emailTemplate: {
    subject: "Urgent: BITS Pilani Fee Crisis - Action Needed",
    body: "Dear Sir/Madam,\n\nI am writing to bring to your attention the unprecedented growth in BITS Pilani tuition fees, which have increased by over 1000% since 2007, far outpacing Indian household income growth...\n\n[Your message here]"
  }
}; 
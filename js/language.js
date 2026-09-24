let currentLanguage = localStorage.getItem("language") || "en";

const translations = {
  en: {
    home: "Home",
    calculators: "Calculators",
    about: "About",

    heroBadge: "Free Online Tools for Everyone",
    heroTitleMain: "Calculate Anything,",
    heroTitleSimple: " Simply.",
    heroKhmer: "Fast • Easy • Free",

    heroDescription:
      "Khmer Calculator Hub provides simple and useful calculators for students, businesses and everyday life.",

    searchPlaceholder: "Search calculator...",
    search: "Search",

    free: "Free",
    fast: "Fast",
    mobileFriendly: "Mobile Friendly",

    gpaResult: "GPA RESULT",
    excellentResult: "Excellent Result",

    advertisement: "Advertisement",

    tools: "TOOLS",
    popularCalculators: "Popular Calculators",

    popularDescription: "Useful calculators for students and everyday life.",

    viewAll: "View All",

    gpa: "GPA Calculator",
    gpaDescription: "Calculate your GPA quickly and easily.",

    calculate: "Calculate",

    grade: "Grade Calculator",
    gradeDescription: "Calculate your score and grade.",

    discount: "Discount Calculator",
    discountDescription: "Quickly calculate discounts and final prices.",

    profit: "Profit Calculator",
    profitDescription: "Calculate profit and profit margin.",

    moreTools: "MORE TOOLS",

    everythingYouNeed: "Everything you need,",
    inOnePlace: " in one place.",

    moreToolsDescription:
      "From calculating your age to converting units, Khmer Calculator Hub gives you simple tools for everyday calculations.",

    age: "Age Calculator",
    bmi: "BMI Calculator",
    unit: "Unit Converter",
    currency: "Currency Converter",

    allTools: "All Tools",

    aboutUs: "ABOUT US",
    aboutTitle: "Simple tools. Better decisions.",

    aboutDescription:
      "Khmer Calculator Hub is a free online platform created to make everyday calculations simple, fast and accessible for everyone.",

    footerDescription:
      "Free online calculators and useful tools for students, businesses and everyday life.",

    company: "Company",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",

    followUs: "Follow Us",

    copyright: "© 2026 Khmer Calculator Hub",
    madeInCambodia: "Made with ❤️ in Cambodia",
    percentageCalculator: "Percentage Calculator",
    percentageDescription: "Calculate percentages quickly and easily.",
    calculationType: "Calculation Type",
    percentOf: "What is X% of Y?",
    whatPercent: "X is what % of Y?",
    percentageIncrease: "Percentage Increase",
    percentageDecrease: "Percentage Decrease",
    percentageExamples: "Percentage Examples",
    calculate: "Calculate",
    result: "Result",
    calculationHistory: "Calculation History",
    clearHistory: "Clear All",
    averageCalculator: "Average Calculator",
    averageDescription: "Calculate sum, average, minimum and maximum.",
    enterNumbers: "Enter Numbers",
    addNumber: "Add Number",
    calculate: "Calculate",
    result: "Result",
    sum: "Sum",
    average: "Average",
    minimum: "Minimum",
    maximum: "Maximum",
    exampleNumber: "Example: 100",
    enterAtLeastOneNumber: "Please enter at least one number.",
    averageOfNumbers: "Average of",
    numbers: "numbers",
    averageCalculator: "Average Calculator",
    averageDescription: "Calculate sum, average, minimum and maximum.",

    enterNumbers: "Enter Numbers",
    addNumber: "Add Number",

    calculate: "Calculate",
    result: "Result",

    sum: "Sum",
    average: "Average",
    minimum: "Minimum",
    maximum: "Maximum",

    example80: "Example: 80",
    example90: "Example: 90",
    exampleNumber: "Example: 100",

    enterAtLeastOneNumber: "Please enter at least one number.",

    averageOfNumbers: "Average of",

    numbers: "numbers",

    validNumbers: "Please enter valid numbers.",
    loanCalculator: "Loan Calculator",

    loanDescription:
      "Calculate monthly payment, total payment and total interest.",

    loanAmount: "Loan Amount",

    interestRate: "Annual Interest Rate (%)",

    loanTerm: "Loan Term (Years)",

    monthlyPayment: "Monthly Payment",

    totalPayment: "Total Payment",

    totalInterest: "Total Interest",

    loanExampleTitle: "Example",

    example10000: "Example: 10000",

    example5: "Example: 5",

    enterAllValues: "Please enter all values.",

    invalidLoanValues: "Please enter valid loan values.",

    loanResultSummary: "Monthly payment",
    interestCalculator: "Interest Calculator",

    interestDescription: "Calculate simple and compound interest.",

    interestType: "Interest Type",

    simpleInterest: "Simple Interest",

    compoundInterest: "Compound Interest",

    principal: "Principal Amount",

    annualInterestRate: "Annual Interest Rate (%)",

    time: "Time (Years)",

    compoundFrequency: "Compound Frequency",

    annually: "Annually",

    semiAnnually: "Semi-annually",

    quarterly: "Quarterly",

    monthly: "Monthly",

    daily: "Daily",

    interestEarned: "Interest",

    totalAmount: "Total Amount",

    interestExampleTitle: "Example",

    example10000: "Example: 10000",

    example5: "Example: 5",

    enterAllValues: "Please enter all values.",

    invalidInterestValues: "Please enter valid interest values.",
    savingsCalculator: "Savings Calculator",
    savingsDescription: "Calculate your future savings and interest earned.",
    initialDeposit: "Initial Deposit",
    monthlyContribution: "Monthly Contribution",
    savingPeriod: "Saving Period (Years)",
    futureValue: "Future Value",
    totalContributions: "Total Contributions",
    interestEarned: "Interest Earned",
    futureSavings: "Your estimated future savings",
    savingsExampleTitle: "Example",
    savingsExample:
      "If you start with $1,000, save $100 every month, earn 5% annual interest, and save for 5 years, this calculator estimates your future savings.",
    example1000: "Example: 1000",
    example100: "Example: 100",
    invalidSavingsValues: "Please enter valid savings values.",
    taxCalculator: "Tax Calculator",
    taxDescription:
      "Calculate taxable income, tax amount and after-tax income.",
    income: "Income",
    taxDeduction: "Tax Deduction",
    taxRate: "Tax Rate (%)",
    taxableIncome: "Taxable Income",
    taxAmount: "Tax Amount",
    afterTaxIncome: "After-Tax Income",
    taxAmountResult: "Tax Amount",
    taxExampleTitle: "Example",
    taxExample:
      "If your income is $2,000, your deduction is $200, and your tax rate is 10%, your taxable income is $1,800 and your tax is $180.",
    example2000: "Example: 2000",
    example200: "Example: 200",
    example10: "Example: 10",
    invalidTaxValues: "Please enter valid tax values.",
    deductionTooHigh: "Tax deduction cannot be greater than income.",
    salaryCalculator: "Salary Calculator",
    salaryDescription:
      "Calculate your gross salary, deductions and net salary.",
    basicSalary: "Basic Salary",
    allowances: "Allowances",
    deductions: "Deductions",
    grossSalary: "Gross Salary",
    totalDeductions: "Total Deductions",
    netSalary: "Net Salary",
    yourNetSalary: "Your estimated net salary",
    salaryExampleTitle: "Example",
    salaryExample:
      "If your basic salary is $1,000, allowances are $200, deductions are $50 and tax is 10%, your estimated net salary is $1,080.",
    example50: "Example: 50",
    invalidSalaryValues: "Please enter valid salary values.",
    deductionsTooHigh: "Total deductions cannot be greater than gross salary.",
    vatCalculator: "VAT Calculator",
    vatDescription: "Calculate VAT amount, total price and price before VAT.",
    vatCalculationType: "Calculation Type",
    addVat: "Add VAT",
    removeVat: "Remove VAT",
    price: "Price",
    vatRate: "VAT Rate (%)",
    priceBeforeVat: "Price Before VAT",
    vatAmount: "VAT Amount",
    totalPrice: "Total Price",
    vatExampleTitle: "Example",
    vatExample:
      "If the price is $100 and VAT is 10%, the VAT amount is $10 and the total price is $110.",
    example100: "Example: 100",
    example10: "Example: 10",
    invalidVatValues: "Please enter valid VAT information.",
    confirmClearHistory:
      "Are you sure you want to clear all calculation history?",
    breakEvenCalculator: "Break-Even Calculator",
    breakEvenDescription:
      "Calculate how many units you need to sell to break even.",
    fixedCosts: "Fixed Costs",
    sellingPrice: "Selling Price Per Unit",
    variableCost: "Variable Cost Per Unit",
    breakEvenUnits: "Break-Even Units",
    breakEvenRevenue: "Break-Even Revenue",
    units: "units",
    breakEvenExampleTitle: "Example",
    breakEvenExample:
      "If fixed costs are $1,000, selling price is $20 and variable cost is $10, you need to sell 100 units to break even.",
    example1000: "Example: 1000",
    example20: "Example: 20",
    example10: "Example: 10",
    invalidBreakEvenValues: "Please enter valid break-even information.",
    sellingPriceTooLow: "Selling price must be greater than variable cost.",
    confirmClearHistory:
      "Are you sure you want to clear all calculation history?",
    fuelCalculator: "Fuel Cost Calculator",
    fuelDescription: "Calculate fuel usage and travel cost.",
    distance: "Distance (km)",
    fuelConsumption: "Fuel Consumption (L/100 km)",
    fuelPrice: "Fuel Price ($/L)",
    fuelUsed: "Fuel Used",
    totalFuelCost: "Total Fuel Cost",
    costPerKm: "Cost Per KM",
    fuelExampleTitle: "Example",
    fuelExample:
      "If you travel 100 km, your vehicle uses 6 L/100 km, and fuel costs $1.20 per liter, you will use 6 liters and spend $7.20.",
    example100: "Example: 100",
    example6: "Example: 6",
    example1_2: "Example: 1.2",
    invalidFuelValues: "Please enter valid fuel information.",
    confirmClearHistory:
      "Are you sure you want to clear all calculation history?",
  },

  kh: {
    home: "ទំព័រដើម",
    calculators: "ម៉ាស៊ីនគណនា",
    about: "អំពីយើង",

    heroBadge: "ឧបករណ៍អនឡាញឥតគិតថ្លៃ សម្រាប់អ្នកគ្រប់គ្នា",

    heroTitleMain: "គណនាអ្វីៗបាន",
    heroTitleSimple: " យ៉ាងងាយស្រួល។",

    heroKhmer: "រហ័ស • ងាយស្រួល • ឥតគិតថ្លៃ",

    heroDescription:
      "Khmer Calculator Hub ផ្តល់ជូនម៉ាស៊ីនគណនាដែលងាយស្រួល និងមានប្រយោជន៍ សម្រាប់សិស្ស និស្សិត អាជីវកម្ម និងការប្រើប្រាស់ប្រចាំថ្ងៃ។",

    searchPlaceholder: "ស្វែងរកម៉ាស៊ីនគណនា...",
    search: "ស្វែងរក",

    free: "ឥតគិតថ្លៃ",
    fast: "រហ័ស",
    mobileFriendly: "ប្រើបានល្អលើទូរស័ព្ទ",

    gpaResult: "លទ្ធផល GPA",
    excellentResult: "លទ្ធផលល្អប្រសើរ",

    advertisement: "ការផ្សព្វផ្សាយ",

    tools: "ឧបករណ៍",
    popularCalculators: "ម៉ាស៊ីនគណនាពេញនិយម",

    popularDescription:
      "ម៉ាស៊ីនគណនាដែលមានប្រយោជន៍សម្រាប់សិស្ស និស្សិត និងការប្រើប្រាស់ប្រចាំថ្ងៃ។",

    viewAll: "មើលទាំងអស់",

    gpa: "ម៉ាស៊ីនគណនា GPA",
    gpaDescription: "គណនា GPA របស់អ្នកបានយ៉ាងរហ័ស និងងាយស្រួល។",

    calculate: "គណនា",

    grade: "ម៉ាស៊ីនគណនាពិន្ទុ",
    gradeDescription: "គណនាពិន្ទុ និងនិទ្ទេសរបស់អ្នក។",

    discount: "ម៉ាស៊ីនគណនាបញ្ចុះតម្លៃ",
    discountDescription: "គណនាបញ្ចុះតម្លៃ និងតម្លៃចុងក្រោយបានយ៉ាងរហ័ស។",

    profit: "ម៉ាស៊ីនគណនាចំណេញ",
    profitDescription: "គណនាចំណេញ និងភាគរយចំណេញ។",

    moreTools: "ឧបករណ៍បន្ថែម",

    everythingYouNeed: "អ្វីៗដែលអ្នកត្រូវការ",
    inOnePlace: " នៅកន្លែងតែមួយ។",

    moreToolsDescription:
      "ចាប់ពីការគណនាអាយុ រហូតដល់ការបម្លែងឯកតា Khmer Calculator Hub ផ្តល់ជូនឧបករណ៍ងាយស្រួលសម្រាប់ការគណនាប្រចាំថ្ងៃ។",

    age: "ម៉ាស៊ីនគណនាអាយុ",
    bmi: "ម៉ាស៊ីនគណនា BMI",
    unit: "កម្មវិធីបម្លែងឯកតា",
    currency: "កម្មវិធីបម្លែងរូបិយប័ណ្ណ",

    allTools: "ឧបករណ៍ទាំងអស់",

    aboutUs: "អំពីយើង",

    aboutTitle: "ឧបករណ៍សាមញ្ញ។ ការសម្រេចចិត្តកាន់តែប្រសើរ។",

    aboutDescription:
      "Khmer Calculator Hub គឺជាវេទិកាអនឡាញឥតគិតថ្លៃ ដែលបង្កើតឡើងដើម្បីធ្វើឱ្យការគណនាប្រចាំថ្ងៃកាន់តែងាយស្រួល រហ័ស និងអាចប្រើប្រាស់បានសម្រាប់អ្នកគ្រប់គ្នា។",

    footerDescription:
      "ម៉ាស៊ីនគណនាអនឡាញ និងឧបករណ៍មានប្រយោជន៍ឥតគិតថ្លៃ សម្រាប់សិស្ស និស្សិត អាជីវកម្ម និងការប្រើប្រាស់ប្រចាំថ្ងៃ។",

    company: "ក្រុមហ៊ុន",
    contact: "ទំនាក់ទំនង",
    privacy: "ឯកជនភាព",
    terms: "លក្ខខណ្ឌ",

    followUs: "តាមដានពួកយើង",

    copyright: "© 2026 Khmer Calculator Hub",
    madeInCambodia: "បង្កើតដោយ ❤️ នៅកម្ពុជា",
    percentageCalculator: "ម៉ាស៊ីនគណនាភាគរយ",
    percentageDescription: "គណនាភាគរយបានយ៉ាងរហ័ស និងងាយស្រួល។",
    calculationType: "ប្រភេទការគណនា",
    percentOf: "តើ X% នៃ Y ស្មើប៉ុន្មាន?",
    whatPercent: "តើ X ស្មើប៉ុន្មានភាគរយនៃ Y?",
    percentageIncrease: "ភាគរយកើនឡើង",
    percentageDecrease: "ភាគរយថយចុះ",
    percentageExamples: "ឧទាហរណ៍ការគណនាភាគរយ",
    calculate: "គណនា",
    result: "លទ្ធផល",
    calculationHistory: "ប្រវត្តិការគណនា",
    clearHistory: "លុបទាំងអស់",
    averageCalculator: "ម៉ាស៊ីនគណនាមធ្យមភាគ",
    averageDescription: "គណនាផលបូក មធ្យមភាគ តម្លៃតូចបំផុត និងតម្លៃធំបំផុត។",
    enterNumbers: "បញ្ចូលលេខ",
    addNumber: "បន្ថែមលេខ",
    calculate: "គណនា",
    result: "លទ្ធផល",
    sum: "ផលបូក",
    average: "មធ្យមភាគ",
    minimum: "តម្លៃតូចបំផុត",
    maximum: "តម្លៃធំបំផុត",
    exampleNumber: "ឧទាហរណ៍៖ 100",
    enterAtLeastOneNumber: "សូមបញ្ចូលលេខយ៉ាងហោចណាស់មួយ។",
    averageOfNumbers: "មធ្យមភាគនៃ",
    numbers: "លេខ",
    averageCalculator: "ម៉ាស៊ីនគណនាមធ្យមភាគ",
    averageDescription: "គណនាផលបូក មធ្យមភាគ តម្លៃតូចបំផុត និងតម្លៃធំបំផុត។",

    enterNumbers: "បញ្ចូលលេខ",
    addNumber: "បន្ថែមលេខ",

    calculate: "គណនា",
    result: "លទ្ធផល",

    sum: "ផលបូក",
    average: "មធ្យមភាគ",
    minimum: "តម្លៃតូចបំផុត",
    maximum: "តម្លៃធំបំផុត",

    example80: "ឧទាហរណ៍៖ 80",
    example90: "ឧទាហរណ៍៖ 90",
    exampleNumber: "ឧទាហរណ៍៖ 100",

    enterAtLeastOneNumber: "សូមបញ្ចូលលេខយ៉ាងហោចណាស់មួយ។",

    averageOfNumbers: "មធ្យមភាគនៃ",

    numbers: "លេខ",

    validNumbers: "សូមបញ្ចូលលេខដែលត្រឹមត្រូវ។",
    loanCalculator: "ម៉ាស៊ីនគណនាកម្ចី",

    loanDescription: "គណនាការបង់ប្រចាំខែ ប្រាក់ត្រូវបង់សរុប និងការប្រាក់សរុប។",

    loanAmount: "ចំនួនប្រាក់កម្ចី",

    interestRate: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",

    loanTerm: "រយៈពេលកម្ចី (ឆ្នាំ)",

    monthlyPayment: "ការបង់ប្រចាំខែ",

    totalPayment: "ប្រាក់ត្រូវបង់សរុប",

    totalInterest: "ការប្រាក់សរុប",

    loanExampleTitle: "ឧទាហរណ៍",

    example10000: "ឧទាហរណ៍៖ 10000",

    example5: "ឧទាហរណ៍៖ 5",

    enterAllValues: "សូមបញ្ចូលតម្លៃទាំងអស់។",

    invalidLoanValues: "សូមបញ្ចូលព័ត៌មានកម្ចីដែលត្រឹមត្រូវ។",

    loanResultSummary: "ការបង់ប្រចាំខែ",
    interestCalculator: "ម៉ាស៊ីនគណនាការប្រាក់",

    interestDescription: "គណនាការប្រាក់ធម្មតា និងការប្រាក់បូកបន្ត។",

    interestType: "ប្រភេទការប្រាក់",

    simpleInterest: "ការប្រាក់ធម្មតា",

    compoundInterest: "ការប្រាក់បូកបន្ត",

    principal: "ប្រាក់ដើម",

    annualInterestRate: "អត្រាការប្រាក់ប្រចាំឆ្នាំ (%)",

    time: "រយៈពេល (ឆ្នាំ)",

    compoundFrequency: "ចំនួនដងបូកការប្រាក់",

    annually: "ប្រចាំឆ្នាំ",

    semiAnnually: "រៀងរាល់ ៦ ខែ",

    quarterly: "រៀងរាល់ ៣ ខែ",

    monthly: "ប្រចាំខែ",

    daily: "ប្រចាំថ្ងៃ",

    interestEarned: "ការប្រាក់",

    totalAmount: "ប្រាក់សរុប",

    interestExampleTitle: "ឧទាហរណ៍",

    example10000: "ឧទាហរណ៍៖ 10000",

    example5: "ឧទាហរណ៍៖ 5",

    enterAllValues: "សូមបញ្ចូលតម្លៃទាំងអស់។",

    invalidInterestValues: "សូមបញ្ចូលព័ត៌មានការប្រាក់ដែលត្រឹមត្រូវ។",
    savingsCalculator: "ម៉ាស៊ីនគណនាការសន្សំ",
    savingsDescription: "គណនាប្រាក់សន្សំនាពេលអនាគត និងការប្រាក់ដែលទទួលបាន។",
    initialDeposit: "ប្រាក់ដាក់ដំបូង",
    monthlyContribution: "ប្រាក់បន្ថែមប្រចាំខែ",
    savingPeriod: "រយៈពេលសន្សំ (ឆ្នាំ)",
    futureValue: "ប្រាក់សរុបនាពេលអនាគត",
    totalContributions: "ប្រាក់ដែលបានដាក់សរុប",
    interestEarned: "ការប្រាក់ដែលទទួលបាន",
    futureSavings: "ប្រាក់សន្សំដែលរំពឹងទុកនាពេលអនាគត",
    savingsExampleTitle: "ឧទាហរណ៍",
    savingsExample:
      "ប្រសិនបើអ្នកចាប់ផ្តើមដាក់ប្រាក់ $1,000 បន្ថែម $100 រៀងរាល់ខែ ទទួលបានការប្រាក់ 5% ក្នុងមួយឆ្នាំ និងសន្សំរយៈពេល 5 ឆ្នាំ ម៉ាស៊ីនគណនានេះនឹងប៉ាន់ស្មានប្រាក់សន្សំនាពេលអនាគតរបស់អ្នក។",
    example1000: "ឧទាហរណ៍៖ 1000",
    example100: "ឧទាហរណ៍៖ 100",
    invalidSavingsValues: "សូមបញ្ចូលព័ត៌មានការសន្សំដែលត្រឹមត្រូវ។",
    taxCalculator: "ម៉ាស៊ីនគណនាពន្ធ",
    taxDescription:
      "គណនាប្រាក់ចំណូលជាប់ពន្ធ ចំនួនពន្ធ និងប្រាក់ចំណូលក្រោយបង់ពន្ធ។",
    income: "ប្រាក់ចំណូល",
    taxDeduction: "ការកាត់បន្ថយពន្ធ",
    taxRate: "អត្រាពន្ធ (%)",
    taxableIncome: "ប្រាក់ចំណូលជាប់ពន្ធ",
    taxAmount: "ចំនួនពន្ធ",
    afterTaxIncome: "ប្រាក់ចំណូលក្រោយបង់ពន្ធ",
    taxAmountResult: "ចំនួនពន្ធ",
    taxExampleTitle: "ឧទាហរណ៍",
    taxExample:
      "ប្រសិនបើប្រាក់ចំណូលរបស់អ្នកគឺ $2,000 ការកាត់បន្ថយគឺ $200 និងអត្រាពន្ធ 10% នោះប្រាក់ចំណូលជាប់ពន្ធគឺ $1,800 ហើយពន្ធគឺ $180។",
    example2000: "ឧទាហរណ៍៖ 2000",
    example200: "ឧទាហរណ៍៖ 200",
    example10: "ឧទាហរណ៍៖ 10",
    invalidTaxValues: "សូមបញ្ចូលព័ត៌មានពន្ធដែលត្រឹមត្រូវ។",
    deductionTooHigh: "ការកាត់បន្ថយពន្ធមិនអាចធំជាងប្រាក់ចំណូលបានទេ។",
    salaryCalculator: "ម៉ាស៊ីនគណនាប្រាក់ខែ",
    salaryDescription: "គណនាប្រាក់ខែសរុប ការកាត់ប្រាក់ និងប្រាក់ខែសុទ្ធ។",
    basicSalary: "ប្រាក់ខែគោល",
    allowances: "ប្រាក់ឧបត្ថម្ភ",
    deductions: "ការកាត់ប្រាក់",
    grossSalary: "ប្រាក់ខែសរុប",
    totalDeductions: "ការកាត់ប្រាក់សរុប",
    netSalary: "ប្រាក់ខែសុទ្ធ",
    yourNetSalary: "ប្រាក់ខែសុទ្ធដែលរំពឹងទុក",
    salaryExampleTitle: "ឧទាហរណ៍",
    salaryExample:
      "ប្រសិនបើប្រាក់ខែគោលរបស់អ្នកគឺ $1,000 ប្រាក់ឧបត្ថម្ភ $200 ការកាត់ប្រាក់ $50 និងពន្ធ 10% នោះប្រាក់ខែសុទ្ធដែលរំពឹងទុកគឺ $1,080។",
    example50: "ឧទាហរណ៍៖ 50",
    invalidSalaryValues: "សូមបញ្ចូលព័ត៌មានប្រាក់ខែដែលត្រឹមត្រូវ។",
    deductionsTooHigh: "ការកាត់ប្រាក់សរុបមិនអាចធំជាងប្រាក់ខែសរុបបានទេ។",
    vatCalculator: "ម៉ាស៊ីនគណនា VAT",
    vatDescription: "គណនាចំនួន VAT តម្លៃសរុប និងតម្លៃមុនបូក VAT។",
    vatCalculationType: "ប្រភេទការគណនា",
    addVat: "បន្ថែម VAT",
    removeVat: "ដក VAT",
    price: "តម្លៃ",
    vatRate: "អត្រា VAT (%)",
    priceBeforeVat: "តម្លៃមុន VAT",
    vatAmount: "ចំនួន VAT",
    totalPrice: "តម្លៃសរុប",
    vatExampleTitle: "ឧទាហរណ៍",
    vatExample:
      "ប្រសិនបើតម្លៃគឺ $100 និង VAT 10% នោះចំនួន VAT គឺ $10 ហើយតម្លៃសរុបគឺ $110។",
    example100: "ឧទាហរណ៍៖ 100",
    example10: "ឧទាហរណ៍៖ 10",
    invalidVatValues: "សូមបញ្ចូលព័ត៌មាន VAT ដែលត្រឹមត្រូវ។",
    confirmClearHistory: "តើអ្នកប្រាកដថាចង់លុបប្រវត្តិការគណនាទាំងអស់មែនទេ?",
    breakEvenCalculator: "ម៉ាស៊ីនគណនាចំណុចស្មើដើម",
    breakEvenDescription:
      "គណនាចំនួនទំនិញដែលត្រូវលក់ ដើម្បីឲ្យអាជីវកម្មស្មើដើម។",
    fixedCosts: "ចំណាយថេរ",
    sellingPrice: "តម្លៃលក់ក្នុងមួយឯកតា",
    variableCost: "ថ្លៃដើមក្នុងមួយឯកតា",
    breakEvenUnits: "ចំនួនឯកតាស្មើដើម",
    breakEvenRevenue: "ចំណូលនៅចំណុចស្មើដើម",
    units: "ឯកតា",
    breakEvenExampleTitle: "ឧទាហរណ៍",
    breakEvenExample:
      "ប្រសិនបើចំណាយថេរ $1,000 តម្លៃលក់ $20 និងថ្លៃដើម $10 ក្នុងមួយឯកតា អ្នកត្រូវលក់ 100 ឯកតា ដើម្បីស្មើដើម។",
    example1000: "ឧទាហរណ៍៖ 1000",
    example20: "ឧទាហរណ៍៖ 20",
    example10: "ឧទាហរណ៍៖ 10",
    invalidBreakEvenValues: "សូមបញ្ចូលព័ត៌មានចំណុចស្មើដើមដែលត្រឹមត្រូវ។",
    sellingPriceTooLow: "តម្លៃលក់ត្រូវតែធំជាងថ្លៃដើមក្នុងមួយឯកតា។",
    confirmClearHistory: "តើអ្នកប្រាកដថាចង់លុបប្រវត្តិការគណនាទាំងអស់មែនទេ?",
    fuelCalculator: "ម៉ាស៊ីនគណនាថ្លៃប្រេង",
    fuelDescription: "គណនាបរិមាណប្រេងដែលប្រើ និងថ្លៃធ្វើដំណើរ។",
    distance: "ចម្ងាយ (គីឡូម៉ែត្រ)",
    fuelConsumption: "ការប្រើប្រាស់ប្រេង (លីត្រ/100 គីឡូម៉ែត្រ)",
    fuelPrice: "តម្លៃប្រេង ($/លីត្រ)",
    fuelUsed: "បរិមាណប្រេងដែលប្រើ",
    totalFuelCost: "ថ្លៃប្រេងសរុប",
    costPerKm: "ថ្លៃក្នុងមួយគីឡូម៉ែត្រ",
    fuelExampleTitle: "ឧទាហរណ៍",
    fuelExample:
      "ប្រសិនបើអ្នកធ្វើដំណើរ 100 គីឡូម៉ែត្រ យានយន្តប្រើប្រេង 6 លីត្រ/100 គីឡូម៉ែត្រ ហើយប្រេងមានតម្លៃ $1.20 ក្នុងមួយលីត្រ នោះអ្នកនឹងប្រើប្រេង 6 លីត្រ និងចំណាយ $7.20។",
    example100: "ឧទាហរណ៍៖ 100",
    example6: "ឧទាហរណ៍៖ 6",
    example1_2: "ឧទាហរណ៍៖ 1.2",
    invalidFuelValues: "សូមបញ្ចូលព័ត៌មានប្រេងដែលត្រឹមត្រូវ។",
    confirmClearHistory: "តើអ្នកប្រាកដថាចង់លុបប្រវត្តិការគណនាទាំងអស់មែនទេ?",
  },
};

// ================================
// APPLY LANGUAGE
// ================================

function applyLanguage() {
  const language = translations[currentLanguage];

  if (!language) {
    console.error("Language not found:", currentLanguage);
    return;
  }

  // Text
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");

    if (language[key] !== undefined) {
      element.textContent = language[key];
    }
  });

  // Placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");

    if (language[key] !== undefined) {
      element.placeholder = language[key];
    }
  });

  // Language button text
  const languageText = document.getElementById("languageText");

  if (languageText) {
    languageText.textContent = currentLanguage === "en" ? "EN" : "KH";
  }

  // HTML language
  document.documentElement.lang = currentLanguage === "en" ? "en" : "km";
}

// ================================
// TOGGLE LANGUAGE
// ================================

function toggleLanguage() {
  if (currentLanguage === "en") {
    currentLanguage = "kh";
  } else {
    currentLanguage = "en";
  }

  localStorage.setItem("language", currentLanguage);

  applyLanguage();
}

// ================================
// START
// ================================

document.addEventListener("DOMContentLoaded", function () {
  const languageButton = document.getElementById("languageButton");

  if (languageButton) {
    languageButton.addEventListener("click", toggleLanguage);
  }

  applyLanguage();
});

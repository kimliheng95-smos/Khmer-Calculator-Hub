const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// ========================================
// CALCULATOR DATA
// ========================================

const calculators = [
  // ========================================
  // EDUCATION
  // ========================================

  {
    name: "GPA Calculator",
    category: "education",
    keywords: ["gpa", "grade point", "gpa calculator", "គណនា gpa", "គណនា GPA"],
    url: "calculators/gpa.html",
  },

  {
    name: "Grade Calculator",
    category: "education",
    keywords: [
      "grade",
      "score",
      "mark",
      "grade calculator",
      "ពិន្ទុ",
      "និទ្ទេស",
      "គណនាពិន្ទុ",
      "គណនានិទ្ទេស",
    ],
    url: "calculators/grade.html",
  },

  {
    name: "Average Calculator",
    category: "education",
    keywords: [
      "average",
      "mean",
      "average calculator",
      "មធ្យម",
      "មធ្យមភាគ",
      "គណនាមធ្យម",
    ],
    url: "calculators/average.html",
  },

  // ========================================
  // FINANCE
  // ========================================

  {
    name: "Discount Calculator",
    category: "finance",
    keywords: [
      "discount",
      "sale",
      "discount calculator",
      "discount price",
      "បញ្ចុះតម្លៃ",
      "គណនាបញ្ចុះតម្លៃ",
    ],
    url: "calculators/discount.html",
  },

  {
    name: "Profit Calculator",
    category: "finance",
    keywords: [
      "profit",
      "profit calculator",
      "profit margin",
      "ចំណេញ",
      "ប្រាក់ចំណេញ",
      "គណនាចំណេញ",
    ],
    url: "calculators/profit.html",
  },

  {
    name: "Loan Calculator",
    category: "finance",
    keywords: [
      "loan",
      "loan calculator",
      "payment",
      "monthly payment",
      "loan payment",
      "កម្ចី",
      "ប្រាក់កម្ចី",
      "គណនាកម្ចី",
    ],
    url: "calculators/loan.html",
  },

  {
    name: "Interest Calculator",
    category: "finance",
    keywords: [
      "interest",
      "interest calculator",
      "simple interest",
      "compound interest",
      "ការប្រាក់",
      "គណនាការប្រាក់",
      "ការប្រាក់បូកបន្ត",
    ],
    url: "calculators/interest.html",
  },

  {
    name: "Savings Calculator",
    category: "finance",
    keywords: [
      "savings",
      "saving",
      "savings calculator",
      "save money",
      "future savings",
      "ការសន្សំ",
      "ប្រាក់សន្សំ",
      "គណនាប្រាក់សន្សំ",
    ],
    url: "calculators/savings.html",
  },

  {
    name: "Tax Calculator",
    category: "finance",
    keywords: [
      "tax",
      "tax calculator",
      "income tax",
      "tax amount",
      "ពន្ធ",
      "ពន្ធលើប្រាក់ចំណូល",
      "គណនាពន្ធ",
    ],
    url: "calculators/tax.html",
  },

  {
    name: "Salary Calculator",
    category: "finance",
    keywords: [
      "salary",
      "salary calculator",
      "pay",
      "monthly salary",
      "net salary",
      "gross salary",
      "ប្រាក់ខែ",
      "ប្រាក់បៀវត្ស",
      "គណនាប្រាក់ខែ",
    ],
    url: "calculators/salary.html",
  },

  {
    name: "VAT Calculator",
    category: "finance",
    keywords: [
      "vat",
      "vat calculator",
      "value added tax",
      "tax vat",
      "add vat",
      "remove vat",
      "គណនា vat",
      "ពន្ធ vat",
      "ពន្ធលើតម្លៃបន្ថែម",
    ],
    url: "calculators/vat.html",
  },

  // ========================================
  // BUSINESS
  // ========================================

  {
    name: "Break-Even Calculator",
    category: "business",
    keywords: [
      "break even",
      "break-even",
      "break even calculator",
      "business break even",
      "profit break even",
      "break even point",
      "ចំណុចស្មើដើម",
      "គណនាស្មើដើម",
      "អាជីវកម្មស្មើដើម",
    ],
    url: "calculators/break-even.html",
  },

  // ========================================
  // HEALTH
  // ========================================

  {
    name: "Age Calculator",
    category: "health",
    keywords: [
      "age",
      "age calculator",
      "calculate age",
      "birthday",
      "អាយុ",
      "គណនាអាយុ",
      "ថ្ងៃកំណើត",
    ],
    url: "calculators/age.html",
  },

  {
    name: "BMI Calculator",
    category: "health",
    keywords: [
      "bmi",
      "bmi calculator",
      "body mass",
      "body mass index",
      "weight",
      "height",
      "ទម្ងន់",
      "កម្ពស់",
      "សន្ទស្សន៍ម៉ាសរាងកាយ",
    ],
    url: "calculators/bmi.html",
  },

  // ========================================
  // MATH
  // ========================================

  {
    name: "Percentage Calculator",
    category: "math",
    keywords: [
      "percentage",
      "percent",
      "percentage calculator",
      "percent calculator",
      "ភាគរយ",
      "គណនាភាគរយ",
    ],
    url: "calculators/percentage.html",
  },

  // ========================================
  // CONVERTER
  // ========================================

  {
    name: "Unit Converter",
    category: "converter",
    keywords: [
      "unit",
      "convert",
      "converter",
      "unit converter",
      "length",
      "weight",
      "temperature",
      "ឯកតា",
      "បម្លែងឯកតា",
    ],
    url: "calculators/unit.html",
  },

  {
    name: "Currency Converter",
    category: "converter",
    keywords: [
      "currency",
      "money",
      "exchange",
      "currency converter",
      "exchange rate",
      "convert money",
      "រូបិយប័ណ្ណ",
      "ប្តូរប្រាក់",
      "ប្តូរលុយ",
    ],
    url: "calculators/currency.html",
  },

  // ========================================
  // TRANSPORT
  // ========================================

  {
    name: "Fuel Cost Calculator",
    category: "transport",
    keywords: [
      "fuel",
      "fuel cost",
      "fuel calculator",
      "gas",
      "gas cost",
      "petrol",
      "petrol calculator",
      "fuel consumption",
      "ថ្លៃប្រេង",
      "ប្រេងសាំង",
      "គណនាថ្លៃប្រេង",
      "ការប្រើប្រាស់ប្រេង",
    ],
    url: "calculators/fuel.html",
  },
];

// ========================================
// SEARCH FUNCTION
// ========================================

function searchCalculator() {
  // Check input exists
  if (!searchInput) {
    return;
  }

  // Get search keyword
  const keyword = searchInput.value.trim().toLowerCase();

  // ========================================
  // EMPTY SEARCH
  // ========================================

  if (keyword === "") {
    alert(
      typeof currentLanguage !== "undefined" && currentLanguage === "kh"
        ? "សូមបញ្ចូលឈ្មោះម៉ាស៊ីនគណនា។"
        : "Please enter a calculator name.",
    );

    return;
  }

  // ========================================
  // 1. EXACT MATCH
  // ========================================

  let result = calculators.find(function (calculator) {
    // Exact calculator name
    const nameMatch = calculator.name.toLowerCase() === keyword;

    // Exact keyword
    const keywordMatch = calculator.keywords.some(function (word) {
      return word.toLowerCase() === keyword;
    });

    return nameMatch || keywordMatch;
  });

  // ========================================
  // 2. PARTIAL MATCH
  // ========================================

  if (!result) {
    result = calculators.find(function (calculator) {
      // Partial calculator name
      const nameMatch = calculator.name.toLowerCase().includes(keyword);

      // Partial keyword
      const keywordMatch = calculator.keywords.some(function (word) {
        return word.toLowerCase().includes(keyword);
      });

      return nameMatch || keywordMatch;
    });
  }

  // ========================================
  // 3. OPEN CALCULATOR
  // ========================================

  if (result) {
    window.location.href = result.url;

    return;
  }

  // ========================================
  // 4. NOT FOUND
  // ========================================

  alert(
    typeof currentLanguage !== "undefined" && currentLanguage === "kh"
      ? "រកមិនឃើញម៉ាស៊ីនគណនា។ សូមព្យាយាមម្ដងទៀត។"
      : "Calculator not found. Please try again.",
  );
}

// ========================================
// SEARCH BUTTON
// ========================================

if (searchButton) {
  searchButton.addEventListener("click", function () {
    searchCalculator();
  });
}

// ========================================
// ENTER KEY
// ========================================

if (searchInput) {
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchCalculator();
    }
  });
}

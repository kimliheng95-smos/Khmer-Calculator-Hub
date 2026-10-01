
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
    keywords: [
      "gpa",
      "grade point",
      "gpa calculator",
      "education",
      "student",

      // Khmer
      "ការសិក្សា",
      "សិស្ស",
      "និស្សិត",
      "ពិន្ទុ",
      "មធ្យមភាគ",
      "គណនា gpa",
      "គណនា GPA"
    ],
    url: "calculators/gpa.html"
  },

  {
    name: "Grade Calculator",
    category: "education",
    keywords: [
      "grade",
      "score",
      "mark",
      "grade calculator",
      "education",
      "student",

      // Khmer
      "ពិន្ទុ",
      "និទ្ទេស",
      "ការសិក្សា",
      "សិស្ស",
      "គណនាពិន្ទុ",
      "គណនានិទ្ទេស"
    ],
    url: "calculators/grade.html"
  },

  {
    name: "Average Calculator",
    category: "education",
    keywords: [
      "average",
      "mean",
      "average calculator",
      "education",
      "student",
      "math",

      // Khmer
      "មធ្យម",
      "មធ្យមភាគ",
      "ការសិក្សា",
      "សិស្ស",
      "គណនាមធ្យម",
      "គណនាមធ្យមភាគ"
    ],
    url: "calculators/average.html"
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
      "finance",
      "money",
      "price",

      // Khmer
      "បញ្ចុះតម្លៃ",
      "តម្លៃ",
      "ហិរញ្ញវត្ថុ",
      "លក់",
      "ការបញ្ចុះតម្លៃ",
      "គណនាបញ្ចុះតម្លៃ"
    ],
    url: "calculators/discount.html"
  },

  {
    name: "Profit Calculator",
    category: "finance",
    keywords: [
      "profit",
      "profit calculator",
      "profit margin",
      "business",
      "money",
      "finance",

      // Khmer
      "ចំណេញ",
      "ប្រាក់ចំណេញ",
      "អាជីវកម្ម",
      "ហិរញ្ញវត្ថុ",
      "ចំណេញលុយ",
      "គណនាចំណេញ",
      "ប្រាក់ចំណេញ"
    ],
    url: "calculators/profit.html"
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
      "finance",
      "money",

      // Khmer
      "កម្ចី",
      "ប្រាក់កម្ចី",
      "ឥណទាន",
      "បង់ប្រាក់",
      "បង់ប្រចាំខែ",
      "ហិរញ្ញវត្ថុ",
      "គណនាកម្ចី"
    ],
    url: "calculators/loan.html"
  },

  {
    name: "Interest Calculator",
    category: "finance",
    keywords: [
      "interest",
      "interest calculator",
      "simple interest",
      "compound interest",
      "finance",
      "bank",
      "money",

      // Khmer
      "ការប្រាក់",
      "ការប្រាក់សាមញ្ញ",
      "ការប្រាក់បូកបន្ត",
      "ធនាគារ",
      "ប្រាក់",
      "គណនាការប្រាក់"
    ],
    url: "calculators/interest.html"
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
      "finance",
      "money",

      // Khmer
      "ការសន្សំ",
      "ប្រាក់សន្សំ",
      "សន្សំប្រាក់",
      "ប្រាក់អនាគត",
      "ហិរញ្ញវត្ថុ",
      "គណនាប្រាក់សន្សំ"
    ],
    url: "calculators/savings.html"
  },

  {
    name: "Tax Calculator",
    category: "finance",
    keywords: [
      "tax",
      "tax calculator",
      "income tax",
      "tax amount",
      "finance",
      "money",

      // Khmer
      "ពន្ធ",
      "ពន្ធលើប្រាក់ចំណូល",
      "ប្រាក់ចំណូល",
      "ហិរញ្ញវត្ថុ",
      "គណនាពន្ធ",
      "ពន្ធប្រាក់ចំណូល"
    ],
    url: "calculators/tax.html"
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
      "finance",
      "work",
      "employee",

      // Khmer
      "ប្រាក់ខែ",
      "ប្រាក់បៀវត្ស",
      "ប្រាក់ខែប្រចាំខែ",
      "បុគ្គលិក",
      "ការងារ",
      "ប្រាក់ចំណូល",
      "គណនាប្រាក់ខែ"
    ],
    url: "calculators/salary.html"
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
      "finance",
      "tax",

      // Khmer
      "គណនា vat",
      "ពន្ធ vat",
      "ពន្ធលើតម្លៃបន្ថែម",
      "តម្លៃបន្ថែម",
      "ពន្ធ",
      "គណនាពន្ធ vat"
    ],
    url: "calculators/vat.html"
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
      "business",
      "profit",
      "cost",

      // Khmer
      "អាជីវកម្ម",
      "ចំណុចស្មើដើម",
      "ស្មើដើម",
      "គណនាស្មើដើម",
      "ចំណុចស្មើ",
      "ចំណាយ",
      "ចំណេញ"
    ],
    url: "calculators/break-even.html"
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
      "date of birth",
      "health",

      // Khmer
      "អាយុ",
      "គណនាអាយុ",
      "ថ្ងៃកំណើត",
      "ខួបកំណើត",
      "ឆ្នាំកំណើត",
      "សុខភាព"
    ],
    url: "calculators/age.html"
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
      "health",

      // Khmer
      "សុខភាព",
      "ទម្ងន់",
      "កម្ពស់",
      "ម៉ាសរាងកាយ",
      "សន្ទស្សន៍ម៉ាសរាងកាយ",
      "គណនា bmi"
    ],
    url: "calculators/bmi.html"
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
      "math",

      // Khmer
      "ភាគរយ",
      "គណនាភាគរយ",
      "គណិតវិទ្យា",
      "ភាគរយនៃ",
      "គណនាភាគ"
    ],
    url: "calculators/percentage.html"
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

      // Khmer
      "ឯកតា",
      "បម្លែង",
      "បម្លែងឯកតា",
      "ប្រវែង",
      "ទម្ងន់",
      "សីតុណ្ហភាព",
      "បម្លែងប្រវែង",
      "បម្លែងទម្ងន់"
    ],
    url: "calculators/unit.html"
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
      "converter",

      // Khmer
      "រូបិយប័ណ្ណ",
      "ប្តូរប្រាក់",
      "ប្តូរលុយ",
      "អត្រាប្តូរប្រាក់",
      "ប្តូររូបិយប័ណ្ណ",
      "លុយ",
      "ប្រាក់"
    ],
    url: "calculators/currency.html"
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
      "transport",
      "car",
      "vehicle",

      // Khmer
      "ថ្លៃប្រេង",
      "ប្រេងសាំង",
      "ប្រេង",
      "សាំង",
      "គណនាថ្លៃប្រេង",
      "ការប្រើប្រាស់ប្រេង",
      "យានយន្ត",
      "រថយន្ត",
      "ឡាន"
    ],
    url: "calculators/fuel.html"
  }

];


// ========================================
// GET CATEGORY NAME
// ========================================

function getCategoryName(category) {

  const names = {

    education: {
      en: "Education",
      kh: "ការសិក្សា"
    },

    finance: {
      en: "Finance",
      kh: "ហិរញ្ញវត្ថុ"
    },

    business: {
      en: "Business",
      kh: "អាជីវកម្ម"
    },

    health: {
      en: "Health",
      kh: "សុខភាព"
    },

    math: {
      en: "Math",
      kh: "គណិតវិទ្យា"
    },

    converter: {
      en: "Converter",
      kh: "បម្លែង"
    },

    transport: {
      en: "Transport",
      kh: "យានយន្ត"
    }

  };

  const language =
    typeof currentLanguage !== "undefined"
      ? currentLanguage
      : "en";

  return names[category]?.[language] || category;

}


// ========================================
// FIND SEARCH RESULTS
// ========================================

function findResults(keyword) {

  keyword = keyword.trim().toLowerCase();

  if (!keyword) {
    return [];
  }

  return calculators.filter(function (calculator) {

    const name =
      calculator.name.toLowerCase();

    const category =
      calculator.category.toLowerCase();

    const keywordMatch =
      calculator.keywords.some(function (word) {

        return word
          .trim()
          .toLowerCase()
          .includes(keyword);

      });

    return (
      name.includes(keyword) ||
      category.includes(keyword) ||
      keywordMatch
    );

  });

}


// ========================================
// CREATE SEARCH RESULTS BOX
// ========================================

function createSearchResultsBox() {

  let resultBox =
    document.getElementById("searchResults");

  if (!resultBox) {

    resultBox =
      document.createElement("div");

    resultBox.id =
      "searchResults";

    resultBox.className =
      "search-results";

    if (searchInput) {

      searchInput.parentElement.after(
        resultBox
      );

    }

  }

  return resultBox;

}


// ========================================
// SHOW AUTOCOMPLETE DROPDOWN
// ========================================

function showAutocomplete(results) {

  const resultBox =
    createSearchResultsBox();

  resultBox.innerHTML = "";


  // ========================================
  // NO RESULT
  // ========================================

  if (results.length === 0) {

    resultBox.innerHTML = `
      <div class="search-no-result">

        <i class="bi bi-search"></i>

        <span>
          ${
            typeof currentLanguage !== "undefined" &&
            currentLanguage === "kh"
              ? "រកមិនឃើញម៉ាស៊ីនគណនា"
              : "No calculator found"
          }
        </span>

      </div>
    `;

    return;

  }


  // ========================================
  // SHOW MAX 8 RESULTS
  // ========================================

  const visibleResults =
    results.slice(0, 8);


  // ========================================
  // CREATE RESULT ITEMS
  // ========================================

  visibleResults.forEach(function (calculator) {

    const item =
      document.createElement("a");

    item.href =
      calculator.url;

    item.className =
      "search-result-item";


    const categoryName =
      getCategoryName(
        calculator.category
      );


    item.innerHTML = `
      <div class="search-result-content">

        <strong>
          ${calculator.name}
        </strong>

        <small>
          ${categoryName}
        </small>

      </div>

      <i class="bi bi-arrow-right"></i>
    `;


    resultBox.appendChild(item);

  });

}


// ========================================
// HIDE SEARCH RESULTS
// ========================================

function hideSearchResults() {

  const resultBox =
    document.getElementById("searchResults");

  if (resultBox) {
    resultBox.remove();
  }

}


// ========================================
// SEARCH BUTTON
// ========================================

if (searchButton) {

  searchButton.addEventListener(
    "click",
    function () {

      const keyword =
        searchInput.value.trim();


      if (!keyword) {

        alert(
          typeof currentLanguage !== "undefined" &&
          currentLanguage === "kh"
            ? "សូមបញ្ចូលឈ្មោះ ឬប្រភេទម៉ាស៊ីនគណនា។"
            : "Please enter a calculator name or category."
        );

        return;

      }


      const results =
        findResults(keyword);


      if (results.length === 0) {

        alert(
          typeof currentLanguage !== "undefined" &&
          currentLanguage === "kh"
            ? "រកមិនឃើញម៉ាស៊ីនគណនា។"
            : "Calculator not found."
        );

        return;

      }


      if (results.length === 1) {

        window.location.href =
          results[0].url;

        return;

      }


      showAutocomplete(results);

    }
  );

}


// ========================================
// ENTER KEY
// ========================================

if (searchInput) {

  searchInput.addEventListener(
    "keydown",
    function (event) {

      if (event.key !== "Enter") {
        return;
      }

      event.preventDefault();


      const keyword =
        searchInput.value.trim();


      if (!keyword) {
        return;
      }


      const results =
        findResults(keyword);


      if (results.length === 1) {

        window.location.href =
          results[0].url;

      } else {

        showAutocomplete(results);

      }

    }
  );

}


// ========================================
// SEARCH WHILE TYPING
// ========================================

if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {

      const keyword =
        searchInput.value.trim();


      // ========================================
      // EMPTY SEARCH
      // ========================================

      if (keyword === "") {

        hideSearchResults();

        return;

      }


      // ========================================
      // LESS THAN 2 CHARACTERS
      // ========================================

      if (keyword.length < 2) {

        hideSearchResults();

        return;

      }


      // ========================================
      // 2+ CHARACTERS
      // ========================================

      const results =
        findResults(keyword);

      showAutocomplete(results);

    }
  );

}


// ========================================
// CLOSE DROPDOWN WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener(
  "click",
  function (event) {

    const resultBox =
      document.getElementById("searchResults");


    if (!resultBox || !searchInput) {
      return;
    }


    const searchBox =
      searchInput.parentElement;


    if (
      !searchBox.contains(event.target) &&
      !resultBox.contains(event.target)
    ) {

      hideSearchResults();

    }

  }
);
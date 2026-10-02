import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/Khmer-Calculator-Hub/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        dashboard: resolve(__dirname, "dashboard.html"),

        age: resolve(__dirname, "calculators/age.html"),
        average: resolve(__dirname, "calculators/average.html"),
        bmi: resolve(__dirname, "calculators/bmi.html"),
        breakEven: resolve(__dirname, "calculators/break-even.html"),
        currency: resolve(__dirname, "calculators/currency.html"),
        discount: resolve(__dirname, "calculators/discount.html"),
        fuel: resolve(__dirname, "calculators/fuel.html"),
        gpa: resolve(__dirname, "calculators/gpa.html"),
        grade: resolve(__dirname, "calculators/grade.html"),
        interest: resolve(__dirname, "calculators/interest.html"),
        loan: resolve(__dirname, "calculators/loan.html"),
        percentage: resolve(__dirname, "calculators/percentage.html"),
        profit: resolve(__dirname, "calculators/profit.html"),
        salary: resolve(__dirname, "calculators/salary.html"),
        savings: resolve(__dirname, "calculators/savings.html"),
        tax: resolve(__dirname, "calculators/tax.html"),
        unit: resolve(__dirname, "calculators/unit.html"),
        vat: resolve(__dirname, "calculators/vat.html"),
      },
    },
  },
});

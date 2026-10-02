import{a as e,i as t,l as n,n as r,r as i,t as a}from"./auth-CTlX_AaI.js";var o=`calculatorHistory`;function s(){return localStorage.getItem(`language`)||`en`}function c(){try{let e=localStorage.getItem(o);if(!e)return[];let t=JSON.parse(e);return Array.isArray(t)?t:[]}catch(e){return console.error(`GET LOCAL HISTORY ERROR:`,e),[]}}function l(e){localStorage.setItem(o,JSON.stringify(e))}async function u(){return await e(),t()?await i():c()}async function d(r,i){await e();let a;if(a=r&&typeof r==`object`&&r.calculatorType?{calculator_type:r.calculatorType,calculator_name:r.calculatorName||r.calculatorType,data:r.data||{},result_text:r.resultText||i||``}:{calculator_type:r,calculator_name:r,data:{},result_text:i||``},t())return await n(a);let o=c(),s={id:Date.now().toString(),...a,createdAt:new Date().toISOString()};return o.unshift(s),l(o.slice(0,20)),{success:!0,id:s.id}}async function f(n){return await e(),t()?await r(String(n)):(l(c().filter(e=>String(e.id)!==String(n))),{success:!0})}async function p(){return await e(),t()?await a():(localStorage.removeItem(o),{success:!0})}function m(e){let t=s(),n={age:{en:`Age Calculator`,km:`គណនាអាយុ`},average:{en:`Average Calculator`,km:`គណនាមធ្យមភាគ`},bmi:{en:`BMI Calculator`,km:`គណនា BMI`},"break-even":{en:`Break-Even Calculator`,km:`គណនាចំណុចស្មើ`},currency:{en:`Currency Converter`,km:`បម្លែងរូបិយប័ណ្ណ`},discount:{en:`Discount Calculator`,km:`គណនាបញ្ចុះតម្លៃ`},fuel:{en:`Fuel Cost Calculator`,km:`គណនាតម្លៃប្រេង`},gpa:{en:`GPA Calculator`,km:`គណនា GPA`},grade:{en:`Grade Calculator`,km:`គណនាពិន្ទុ`},interest:{en:`Interest Calculator`,km:`គណនាការប្រាក់`},loan:{en:`Loan Calculator`,km:`គណនាប្រាក់កម្ចី`},percentage:{en:`Percentage Calculator`,km:`គណនាភាគរយ`},profit:{en:`Profit Calculator`,km:`គណនាចំណេញ`},salary:{en:`Salary Calculator`,km:`គណនាប្រាក់ខែ`},savings:{en:`Savings Calculator`,km:`គណនាប្រាក់សន្សំ`},tax:{en:`Tax Calculator`,km:`គណនាពន្ធ`},unit:{en:`Unit Converter`,km:`បម្លែងឯកតា`},vat:{en:`VAT Calculator`,km:`គណនា VAT`}};return n[e]?n[e][t]||n[e].en:e}function h(e){if(!e)return``;if(e.result_text)return e.result_text;let t=e.data||{},n=e.calculator_type;return n===`gpa`&&t.gpa!==void 0?`GPA: ${t.gpa}`:n===`grade`&&t.score!==void 0?`Score: ${t.score} | Grade: ${t.grade||``}`:n===`bmi`&&t.bmi!==void 0?`BMI: ${t.bmi}`:n===`age`&&t.age!==void 0?`Age: ${t.age}`:n===`percentage`&&t.result!==void 0?`Result: ${t.result}`:n===`discount`&&t.finalPrice!==void 0?`Final Price: ${t.finalPrice}`:n===`profit`&&t.profit!==void 0?`Profit: ${t.profit}`:JSON.stringify(t)}async function g(e){let t=document.getElementById(e);if(!t)return;t.innerHTML=`
        <div class="text-center py-4">
            <div class="spinner-border"></div>
            <p class="mt-2">
                Loading history...
            </p>
        </div>
    `;let n=await u();if(!n||n.length===0){t.innerHTML=`
            <div class="text-center py-5">
                <i class="bi bi-clock-history fs-1 text-muted"></i>

                <h5 class="mt-3">
                    No History
                </h5>

                <p class="text-muted">
                    Your calculator history will appear here.
                </p>
            </div>
        `;return}t.innerHTML=``,n.forEach(e=>{let n=e.calculator_name||m(e.calculator_type),r=h(e),i=``;if(e.createdAt)try{i=e.createdAt.toDate?e.createdAt.toDate().toLocaleString():new Date(e.createdAt).toLocaleString()}catch{i=``}let a=document.createElement(`div`);a.className=`history-item border rounded p-3 mb-3`,a.innerHTML=`

            <div class="d-flex justify-content-between align-items-start">

                <div>

                    <h5 class="mb-1">
                        ${n}
                    </h5>

                    <div class="text-muted small">
                        ${i}
                    </div>

                </div>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger history-delete"
                    data-id="${e.id}"
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>

            <div class="mt-3">
                ${r}
            </div>

        `,t.appendChild(a)}),t.querySelectorAll(`.history-delete`).forEach(t=>{t.addEventListener(`click`,async function(){let t=this.dataset.id,n=await f(t);n.success?await g(e):console.error(n.message)})})}document.addEventListener(`DOMContentLoaded`,function(){document.querySelectorAll(`[id$="historyContainer"]`).forEach(function(e){g(e.id)})});export{d as a,m as i,g as n,h as r,p as t};
import"./ui-effects-FUMbQwWB.js";import"./history-Byon_6JU.js";var e={length:{meter:`Meter`,kilometer:`Kilometer`,centimeter:`Centimeter`,millimeter:`Millimeter`,inch:`Inch`,foot:`Foot`},weight:{kilogram:`Kilogram`,gram:`Gram`,milligram:`Milligram`,pound:`Pound`},temperature:{celsius:`Celsius`,fahrenheit:`Fahrenheit`,kelvin:`Kelvin`},area:{squareMeter:`Square Meter`,squareKilometer:`Square Kilometer`,squareCentimeter:`Square Centimeter`,squareFoot:`Square Foot`}},t={meter:`meter`,kilometer:`kilometer`,centimeter:`centimeter`,millimeter:`millimeter`,inch:`inch`,foot:`foot`,kilogram:`kilogram`,gram:`gram`,milligram:`milligram`,pound:`pound`,celsius:`celsius`,fahrenheit:`fahrenheit`,kelvin:`kelvin`,squareMeter:`squareMeter`,squareKilometer:`squareKilometer`,squareCentimeter:`squareCentimeter`,squareFoot:`squareFoot`};function n(){return localStorage.getItem(`language`)||`en`}function r(e,t){let r=n();return window.translations&&window.translations[r]&&window.translations[r][e]?window.translations[r][e]:t}function i(e){let n=t[e];return n?r(n,a(e)):e}function a(t){for(let n in e)if(e[n][t])return e[n][t];return t}function o(){let t=document.getElementById(`unitType`),n=document.getElementById(`fromUnit`),r=document.getElementById(`toUnit`);if(!t||!n||!r)return;let a=t.value;n.innerHTML=``,r.innerHTML=``;let o=Object.keys(e[a]);o.forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=i(e),n.appendChild(t);let a=document.createElement(`option`);a.value=e,a.textContent=i(e),r.appendChild(a)}),o.length>1&&(n.selectedIndex=0,r.selectedIndex=1)}function s(e,t,n){let r;return t===`celsius`?r=e:t===`fahrenheit`?r=(e-32)*5/9:t===`kelvin`&&(r=e-273.15),n===`celsius`?r:n===`fahrenheit`?r*9/5+32:n===`kelvin`?r+273.15:r}function c(e){let t=`unitHistory`,n=[];try{n=JSON.parse(localStorage.getItem(t))||[]}catch{n=[]}n.unshift(e),n.length>20&&(n=n.slice(0,20)),localStorage.setItem(t,JSON.stringify(n)),l()}function l(){let e=document.getElementById(`historyContainer`);if(!e)return;let t=[];try{t=JSON.parse(localStorage.getItem(`unitHistory`))||[]}catch{t=[]}if(t.length===0){e.innerHTML=`
      <div class="text-center text-muted py-4">
        <i class="bi bi-clock-history fs-3"></i>
        <p class="mb-0 mt-2">
          ${r(`noHistory`,`No calculation history yet.`)}
        </p>
      </div>
    `;return}e.innerHTML=``,t.forEach(t=>{let n=document.createElement(`div`);n.className=`history-item p-3 rounded-3 mb-2`,n.innerHTML=`
      <div class="d-flex justify-content-between align-items-start gap-3">

        <div>
          <div class="history-calculator">
            ${t.value} ${t.fromName}
            =
            ${t.result} ${t.toName}
          </div>

          <div class="history-date text-muted mt-1">
            ${t.date}
          </div>
        </div>

        <div class="history-result">
          ${t.result}
        </div>

      </div>
    `,e.appendChild(n)})}function u(){let e=document.getElementById(`unitType`),t=document.getElementById(`fromValue`),a=document.getElementById(`fromUnit`),o=document.getElementById(`toUnit`);if(!e||!t||!a||!o)return;let l=e.value,u=t.value.trim();if(u===``){alert(r(`enterValue`,`Please enter a value.`)),t.focus();return}let d=Number(u);if(!Number.isFinite(d)){alert(r(`validNumbers`,`Please enter a valid number.`));return}let f=a.value,p=o.value,m;if(l===`temperature`){if(f===`kelvin`&&d<0){alert(r(`invalidValues`,`Invalid temperature value.`));return}m=s(d,f,p)}else m=d*v[l][f]/v[l][p];if(!Number.isFinite(m)){alert(r(`invalidValues`,`Unable to convert this value.`));return}let h=document.getElementById(`unitResult`),g=document.getElementById(`resultValue`),_=document.getElementById(`resultText`);h.classList.remove(`d-none`),g.textContent=m.toFixed(4),_.textContent=`${d} ${i(f)} = ${m.toFixed(4)} ${i(p)}`;let v={value:d,from:f,to:p,fromName:i(f),toName:i(p),result:m.toFixed(4),date:new Date().toLocaleString(n()===`kh`?`km-KH`:`en-US`)};c(v),typeof window.saveHistory==`function`&&Promise.resolve(window.saveHistory({calculatorType:`unit`,calculatorName:`Unit Converter`,data:v,resultText:`${d} ${v.fromName} = ${v.result} ${v.toName}`})).catch(e=>console.error(e))}function d(){let e=document.getElementById(`fromUnit`),t=document.getElementById(`toUnit`);if(!e||!t)return;let n=e.value;e.value=t.value,t.value=n;let r=document.getElementById(`fromValue`);r&&r.value.trim()!==``&&u()}function f(){confirm(r(`confirmClearHistory`,`Are you sure you want to clear all calculation history?`))&&(localStorage.removeItem(`unitHistory`),l())}document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`unitType`),t=document.getElementById(`swapUnitButton`),n=document.getElementById(`convertUnitButton`),r=document.getElementById(`clearUnitHistoryButton`);e&&e.addEventListener(`change`,o),t&&t.addEventListener(`click`,d),n&&n.addEventListener(`click`,u),r&&r.addEventListener(`click`,f),o(),l()});
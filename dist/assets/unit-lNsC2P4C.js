import"./language-BCbXHEiN.js";var e={length:{meter:1,kilometer:1e3,centimeter:.01,millimeter:.001,inch:.0254,foot:.3048},weight:{kilogram:1,gram:.001,milligram:1e-6,pound:.45359237},area:{squareMeter:1,squareKilometer:1e6,squareCentimeter:1e-4,squareFoot:.09290304},temperature:{celsius:null,fahrenheit:null,kelvin:null}},t={length:{meter:`Meter`,kilometer:`Kilometer`,centimeter:`Centimeter`,millimeter:`Millimeter`,inch:`Inch`,foot:`Foot`},weight:{kilogram:`Kilogram`,gram:`Gram`,milligram:`Milligram`,pound:`Pound`},temperature:{celsius:`Celsius`,fahrenheit:`Fahrenheit`,kelvin:`Kelvin`},area:{squareMeter:`Square Meter`,squareKilometer:`Square Kilometer`,squareCentimeter:`Square Centimeter`,squareFoot:`Square Foot`}},n={meter:`meter`,kilometer:`kilometer`,centimeter:`centimeter`,millimeter:`millimeter`,inch:`inch`,foot:`foot`,kilogram:`kilogram`,gram:`gram`,milligram:`milligram`,pound:`pound`,celsius:`celsius`,fahrenheit:`fahrenheit`,kelvin:`kelvin`,squareMeter:`squareMeter`,squareKilometer:`squareKilometer`,squareCentimeter:`squareCentimeter`,squareFoot:`squareFoot`};function r(){return localStorage.getItem(`language`)||`en`}function i(e,t){let n=r();return window.translations&&window.translations[n]&&window.translations[n][e]?window.translations[n][e]:t}function a(e){let t=n[e];return t?i(t,o(e)):e}function o(e){for(let n in t)if(t[n][e])return t[n][e];return e}function s(){let e=document.getElementById(`unitType`),n=document.getElementById(`fromUnit`),r=document.getElementById(`toUnit`);if(!e||!n||!r)return;let i=e.value;n.innerHTML=``,r.innerHTML=``;let o=Object.keys(t[i]);o.forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=a(e),n.appendChild(t);let i=document.createElement(`option`);i.value=e,i.textContent=a(e),r.appendChild(i)}),o.length>1&&(n.selectedIndex=0,r.selectedIndex=1)}function c(e,t,n){let r;return t===`celsius`?r=e:t===`fahrenheit`?r=(e-32)*5/9:t===`kelvin`&&(r=e-273.15),n===`celsius`?r:n===`fahrenheit`?r*9/5+32:n===`kelvin`?r+273.15:r}function l(e){let t=`unitHistory`,n=[];try{n=JSON.parse(localStorage.getItem(t))||[]}catch{n=[]}n.unshift(e),n.length>20&&(n=n.slice(0,20)),localStorage.setItem(t,JSON.stringify(n)),u()}function u(){let e=document.getElementById(`historyContainer`);if(!e)return;let t=[];try{t=JSON.parse(localStorage.getItem(`unitHistory`))||[]}catch{t=[]}if(t.length===0){e.innerHTML=`
      <div class="text-center text-muted py-4">
        <i class="bi bi-clock-history fs-3"></i>
        <p class="mb-0 mt-2">
          ${i(`noHistory`,`No calculation history yet.`)}
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
    `,e.appendChild(n)})}function d(){let t=document.getElementById(`unitType`),n=document.getElementById(`fromValue`),o=document.getElementById(`fromUnit`),s=document.getElementById(`toUnit`);if(!t||!n||!o||!s)return;let u=t.value,d=n.value.trim();if(d===``){alert(i(`enterValue`,`Please enter a value.`)),n.focus();return}let f=Number(d);if(!Number.isFinite(f)){alert(i(`validNumbers`,`Please enter a valid number.`));return}let p=o.value,m=s.value,h;if(u===`temperature`){if(p===`kelvin`&&f<0){alert(i(`invalidValues`,`Invalid temperature value.`));return}h=c(f,p,m)}else h=f*e[u][p]/e[u][m];if(!Number.isFinite(h)){alert(i(`invalidValues`,`Unable to convert this value.`));return}let g=document.getElementById(`unitResult`),_=document.getElementById(`resultValue`),v=document.getElementById(`resultText`);g.classList.remove(`d-none`),_.textContent=h.toFixed(4),v.textContent=`${f} ${a(p)} = ${h.toFixed(4)} ${a(m)}`,l({value:f,from:p,to:m,fromName:a(p),toName:a(m),result:h.toFixed(4),date:new Date().toLocaleString(r()===`kh`?`km-KH`:`en-US`)})}function f(){let e=document.getElementById(`fromUnit`),t=document.getElementById(`toUnit`);if(!e||!t)return;let n=e.value;e.value=t.value,t.value=n;let r=document.getElementById(`fromValue`);r&&r.value.trim()!==``&&d()}function p(){confirm(i(`confirmClearHistory`,`Are you sure you want to clear all calculation history?`))&&(localStorage.removeItem(`unitHistory`),u())}document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`unitType`),t=document.getElementById(`swapUnitButton`),n=document.getElementById(`convertUnitButton`),r=document.getElementById(`clearUnitHistoryButton`);e&&e.addEventListener(`change`,s),t&&t.addEventListener(`click`,f),n&&n.addEventListener(`click`,d),r&&r.addEventListener(`click`,p),s(),u()});
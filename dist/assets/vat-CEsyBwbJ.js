import"./language-BCbXHEiN.js";function e(){return localStorage.getItem(`language`)||`en`}function t(t,n){let r=e();return window.translations&&window.translations[r]&&window.translations[r][t]?window.translations[r][t]:n}function n(e){return`$`+Number(e).toFixed(2)}function r(){try{return JSON.parse(localStorage.getItem(`vatHistory`))||[]}catch{return[]}}function i(e){let t=r();t.unshift(e),t.length>20&&(t=t.slice(0,20)),localStorage.setItem(`vatHistory`,JSON.stringify(t)),a()}function a(){let e=document.getElementById(`historyContainer`);if(!e)return;let i=r();if(i.length===0){e.innerHTML=`
      <div class="text-center text-muted py-4">
        <i class="bi bi-clock-history fs-3"></i>

        <p class="mb-0 mt-2">
          ${t(`noHistory`,`No calculation history yet.`)}
        </p>
      </div>
    `;return}e.innerHTML=``,i.forEach(t=>{let r=document.createElement(`div`);r.className=`history-item p-3 rounded-3 mb-2`,r.innerHTML=`
      <div class="d-flex justify-content-between align-items-start gap-3">

        <div>

          <div class="history-calculator">

            ${t.modeText}

          </div>

          <div class="mt-1">

            ${n(t.price)}
            ×
            ${t.rate}%
          </div>

          <div class="history-date text-muted mt-1">

            ${t.date}

          </div>

        </div>


        <div class="history-result">

          ${n(t.total)}

        </div>

      </div>
    `,e.appendChild(r)})}function o(){let r=document.getElementById(`vatType`),a=document.getElementById(`price`),o=document.getElementById(`vatRate`);if(!r||!a||!o)return;let s=r.value,c=a.value.trim(),l=o.value.trim();if(c===``||l===``){alert(t(`enterAllValues`,`Please enter all values.`));return}let u=Number(c),d=Number(l);if(!Number.isFinite(u)||!Number.isFinite(d)){alert(t(`invalidValues`,`Please enter valid numbers.`));return}if(u<0||d<0||d>100){alert(t(`invalidValues`,`Please enter valid values.`));return}let f=0,p=0,m=0;s===`add`?(f=u,p=d/100*u,m=u+p):s===`remove`&&(m=u,f=u/(1+d/100),p=u-f);let h=document.getElementById(`vatResult`),g=document.getElementById(`priceBeforeVat`),_=document.getElementById(`vatAmount`),v=document.getElementById(`totalPrice`);h&&h.classList.remove(`d-none`),g&&(g.textContent=n(f)),_&&(_.textContent=n(p)),v&&(v.textContent=n(m));let y=s===`add`?t(`addVat`,`Add VAT`):t(`removeVat`,`Remove VAT`);i({id:Date.now(),type:s,modeText:y,price:u,rate:d,priceBeforeVAT:f,vatAmount:p,total:m,date:new Date().toLocaleString(e()===`kh`?`km-KH`:`en-US`)})}function s(){confirm(t(`confirmClearHistory`,`Are you sure you want to clear all calculation history?`))&&(localStorage.removeItem(`vatHistory`),a())}document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`calculateVATButton`),t=document.getElementById(`clearVATHistoryButton`);e&&e.addEventListener(`click`,o),t&&t.addEventListener(`click`,s),a()});